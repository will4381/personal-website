"use client";

import { useEffect } from "react";

const TARGETS = "main h1, main h2, main section > p";

// Wraps each word in a span so the scroll squeeze runs per line: words on the same
// line share a view() progress, and --ox points every word's scale origin at the
// column center so the whole line narrows together.
export default function LineSqueeze() {
  useEffect(() => {
    if (!CSS.supports("animation-timeline: view()")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;

    main.querySelectorAll(TARGETS).forEach((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      for (const node of nodes) {
        if (node.parentElement?.classList.contains("squeeze-word")) continue;
        const frag = document.createDocumentFragment();
        for (const part of node.data.split(/(\s+)/)) {
          if (!part) continue;
          if (!part.trim()) {
            frag.append(part);
            continue;
          }
          const span = document.createElement("span");
          span.className = "squeeze-word";
          span.textContent = part;
          frag.append(span);
        }
        node.replaceWith(frag);
      }
    });

    const words = main.querySelectorAll<HTMLElement>(".squeeze-word");
    // offset* ignores transforms, so measuring mid-animation stays correct
    const place = () => {
      const center = main.offsetLeft + main.offsetWidth / 2;
      words.forEach((word) => word.style.setProperty("--ox", `${center - word.offsetLeft}px`));
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  return null;
}
