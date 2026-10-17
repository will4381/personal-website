import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Vibrant } from "node-vibrant/node";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FEED_URL = "https://letterboxd.com/willkusch/rss/";
const ALLOWED_ORIGINS = new Set([
  "https://willkusch.com",
  "https://www.willkusch.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const normalizeWhitespace = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();

const decodeHtmlEntities = (value: string) => {
  const named: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&#039;": "'",
    "&nbsp;": " ",
  };

  let output = value.replace(/&(amp|lt|gt|quot|nbsp);|&#039;/g, (match) => named[match] ?? match);

  output = output.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCodePoint(Number.parseInt(hex, 16))
  );
  output = output.replace(/&#([0-9]+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)));
  return output;
};

const extractTag = (xml: string, tagName: string) => {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<${escaped}>([\\s\\S]*?)</${escaped}>`, "i");
  const match = xml.match(pattern);
  return match ? match[1].trim() : null;
};

const extractFirstItem = (xml: string) => {
  const start = xml.indexOf("<item>");
  if (start === -1) return null;
  const end = xml.indexOf("</item>", start);
  if (end === -1) return null;
  return xml.slice(start, end + "</item>".length);
};

const extractDescription = (value: string) => {
  const withoutCdata = value
    .replace("<![CDATA[", "")
    .replace("]]>", "")
    .trim();
  return withoutCdata;
};

const extractImageUrl = (html: string) => {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match?.[1] ?? null;
};

const extractReviewText = (html: string) => {
  const withoutTags = html.replace(/<[^>]+>/g, " ");
  const decoded = decodeHtmlEntities(withoutTags);
  return normalizeWhitespace(decoded);
};

const getVibrantColor = async (imageUrl: string | null) => {
  if (!imageUrl) return null;
  try {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) return null;
    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    const palette = await Vibrant.from(buffer).getPalette();
    // Spotify-style: most common non-pale color, pushed to a rich mid-dark tone
    const swatch = [palette.Vibrant, palette.DarkVibrant, palette.Muted, palette.DarkMuted]
      .filter((candidate) => candidate != null)
      .sort((a, b) => b.population - a.population)[0];
    if (!swatch) return null;
    const [h, sat, light] = swatch.hsl;
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const saturation = sat < 0.08 ? sat : clamp(sat, 0.45, 0.7);
    const lightness = clamp(light, 0.3, 0.38);
    return `hsl(${Math.round(h * 360)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%)`;
  } catch {
    return null;
  }
};


const ratingToStars = (ratingValue: string | null) => {
  const rating = ratingValue ? Number.parseFloat(ratingValue) : NaN;
  if (!Number.isFinite(rating) || rating <= 0) return "";
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return `${"★".repeat(full)}${half ? "½" : ""}`;
};

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");
    const referer = requestHeaders.get("referer");
    const originAllowed = origin ? ALLOWED_ORIGINS.has(origin) : false;
    let refererAllowed = false;
    if (referer) {
      try {
        refererAllowed = ALLOWED_ORIGINS.has(new URL(referer).origin);
      } catch {
        refererAllowed = false;
      }
    }

    if (!originAllowed && !refererAllowed) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  const response = await fetch(FEED_URL, { cache: "no-store" });
  if (!response.ok) {
    return NextResponse.json({ error: "feed_failed" }, { status: 502 });
  }

  const xml = await response.text();
  const itemXml = extractFirstItem(xml);
  if (!itemXml) {
    return NextResponse.json({ error: "no_items" }, { status: 404 });
  }

  const title = decodeHtmlEntities(extractTag(itemXml, "title") ?? "");
  const link = extractTag(itemXml, "link");
  const filmTitle = decodeHtmlEntities(extractTag(itemXml, "letterboxd:filmTitle") ?? "");
  const filmYear = extractTag(itemXml, "letterboxd:filmYear");
  const rating = extractTag(itemXml, "letterboxd:memberRating");
  const descriptionRaw = extractTag(itemXml, "description") ?? "";
  const description = extractDescription(descriptionRaw);
  const imageUrl = extractImageUrl(description);
  const reviewText = extractReviewText(description);
  const watchedDate = extractTag(itemXml, "letterboxd:watchedDate");

  const backgroundColor = await getVibrantColor(imageUrl);

  return NextResponse.json({
    title,
    link,
    filmTitle,
    filmYear,
    rating: rating ? Number.parseFloat(rating) : null,
    ratingStars: ratingToStars(rating),
    imageUrl,
    backgroundColor,
    foregroundColor: "#ffffff",
    mutedColor: "#ffffff",
    reviewText,
    watchedDate,
  });
}
