"use client";

import type { ReactNode } from "react";

declare global {
  interface Window {
    snaptr?: (
      action: "track",
      eventName: "PURCHASE",
      properties: Record<string, string | number | string[]>,
    ) => void;
  }
}

type SnapPurchaseLinkProps = {
  children: ReactNode;
  href: string;
  itemCategory: string;
  itemId: string;
};

export default function SnapPurchaseLink({
  children,
  href,
  itemCategory,
  itemId,
}: SnapPurchaseLinkProps) {
  const trackPurchase = () => {
    window.snaptr?.("track", "PURCHASE", {
      item_ids: [itemId],
      item_category: itemCategory,
      number_items: 1,
    });
  };

  return (
    <a href={href} target="_blank" rel="noreferrer" onClick={trackPurchase}>
      {children}
    </a>
  );
}
