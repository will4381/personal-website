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
    const swatch =
      palette.DarkMuted ??
      palette.Muted ??
      palette.DarkVibrant ??
      palette.Vibrant ??
      palette.LightMuted ??
      palette.LightVibrant;
    if (!swatch?.hex) return null;
    const hex = swatch.hex.replace("#", "");
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    if (![r, g, b].every(Number.isFinite)) return swatch.hex;
    const darken = (value: number, amount: number) =>
      Math.max(0, Math.min(255, Math.round(value * (1 - amount))));
    const dr = darken(r, 0.08);
    const dg = darken(g, 0.08);
    const db = darken(b, 0.08);
    return `rgb(${dr}, ${dg}, ${db})`;
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
