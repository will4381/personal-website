import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const getAccessToken = async () => {
  const clientId =
    process.env.SPOTIFY_CLIENT_ID ?? process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      error: "missing_env",
      missing: {
        clientId: !clientId,
        clientSecret: !clientSecret,
        refreshToken: !refreshToken,
      },
    } as const;
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    return { error: "token_request_failed", details } as const;
  }

  const payload = (await response.json()) as { access_token?: string };
  if (!payload.access_token) {
    return { error: "token_missing" } as const;
  }

  return { accessToken: payload.access_token } as const;
};

const getRecentTrackEmbedUrl = async (accessToken: string) => {
  const recentResponse = await fetch(RECENT_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!recentResponse.ok) {
    return { error: "recent_failed" } as const;
  }

  const payload = (await recentResponse.json()) as {
    items?: Array<{
      track?: { id?: string };
    }>;
  };

  const trackId = payload?.items?.[0]?.track?.id;
  if (!trackId) {
    return { trackEmbedUrl: null } as const;
  }

  return { trackEmbedUrl: `https://open.spotify.com/embed/track/${trackId}` } as const;
};

export async function GET() {
  const tokenResult = await getAccessToken();
  if ("error" in tokenResult) {
    return NextResponse.json(tokenResult, { status: 503 });
  }

  const currentResponse = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
    },
    cache: "no-store",
  });

  if (currentResponse.status === 204) {
    const recentResult = await getRecentTrackEmbedUrl(tokenResult.accessToken);
    return NextResponse.json(recentResult);
  }

  if (currentResponse.ok) {
    const responseText = await currentResponse.text();
    if (!responseText) {
      const recentResult = await getRecentTrackEmbedUrl(tokenResult.accessToken);
      return NextResponse.json(recentResult);
    }

    const payload = JSON.parse(responseText) as { item?: { id?: string } };
    const trackId = payload?.item?.id;
    if (trackId) {
      return NextResponse.json({
        trackEmbedUrl: `https://open.spotify.com/embed/track/${trackId}`,
      });
    }

    const recentResult = await getRecentTrackEmbedUrl(tokenResult.accessToken);
    return NextResponse.json(recentResult);
  }

  const recentResult = await getRecentTrackEmbedUrl(tokenResult.accessToken);
  if ("error" in recentResult) {
    return NextResponse.json(recentResult, { status: 502 });
  }

  return NextResponse.json(recentResult);
}
