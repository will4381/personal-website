"use client";

import * as React from "react";

type RecentResponse = {
  trackEmbedUrl?: string | null;
  error?: string;
};

const REFRESH_INTERVAL_MS = 60000;

export default function SpotifyRecentEmbed() {
  const [embedUrl, setEmbedUrl] = React.useState<string | null>(null);
  const [hasError, setHasError] = React.useState(false);
  const [isIdle, setIsIdle] = React.useState(false);

  const loadRecent = React.useCallback(async () => {
    try {
      const response = await fetch("/api/spotify/recent", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("recent fetch failed");
      }

      const payload = (await response.json()) as RecentResponse;
      if (payload.error) {
        setHasError(true);
        setIsIdle(false);
        return;
      }

      if (payload.trackEmbedUrl) {
        setEmbedUrl(payload.trackEmbedUrl);
        setHasError(false);
        setIsIdle(false);
      } else {
        setEmbedUrl(null);
        setIsIdle(true);
      }
    } catch (error) {
      setHasError(true);
      setIsIdle(false);
    }
  }, []);

  React.useEffect(() => {
    loadRecent();
    const interval = window.setInterval(loadRecent, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [loadRecent]);

  if ((hasError || isIdle) && !embedUrl) {
    return null;
  }

  return (
    <iframe
      title="Spotify recent track"
      src={embedUrl ?? undefined}
      width="100%"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
