"use client";

import { useEffect } from "react";

const TARGETS = "main h1, main h2, main section > p";

// Wraps each word in a span so the scroll squeeze runs per line: words on the same
// line share a view() progress, and --ox points every word's scale origin at the
// column center so the whole line narrows toward the middle.
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
        // trailing space stays inside the word so text selection has no gaps
        for (const part of node.data.match(/^\s+|\S+\s*/g) ?? []) {
          if (!part.trim()) {
            frag.append(part);
            continue;
          }
          const span = document.createElement("span");
          span.className = "squeeze-word";
          span.textContent = part;
          frag.append(span);
        }
        // word boxes allow a line break between them, so keep punctuation like "Heiden,"
        // on the same line as the link before it by wrapping both in a nowrap span
        const prev = node.previousSibling;
        const first = frag.firstChild;
        if (prev instanceof HTMLElement && /^\S/.test(node.data) && first) {
          const glue = document.createElement("span");
          glue.className = "squeeze-glue";
          prev.before(glue);
          glue.append(prev, first);
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
