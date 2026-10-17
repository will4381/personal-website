"use client";

import * as React from "react";
import Image from "next/image";

import styles from "./LetterboxdRecent.module.css";

type LetterboxdReview = {
  title?: string;
  link?: string | null;
  filmTitle?: string;
  filmYear?: string | null;
  rating?: number | null;
  ratingStars?: string;
  imageUrl?: string | null;
  backgroundColor?: string | null;
  foregroundColor?: string | null;
  mutedColor?: string | null;
  reviewText?: string;
  watchedDate?: string | null;
};

const Star = () => (
  <svg className={styles.star} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"
      strokeLinejoin="round"
      strokeWidth="2.4"
    />
  </svg>
);

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className={styles.rating} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }, (_, i) => (
        <Star key={i} />
      ))}
      {half ? (
        <span className={styles.half}>
          <Star />
        </span>
      ) : null}
    </div>
  );
}

export default function LetterboxdRecent() {
  const [review, setReview] = React.useState<LetterboxdReview | null>(null);

  React.useEffect(() => {
    let isActive = true;
    fetch("/api/letterboxd/recent", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("letterboxd fetch failed");
        }
        return response.json() as Promise<LetterboxdReview>;
      })
      .then((payload) => {
        if (isActive) {
          setReview(payload);
        }
      })
      .catch(() => {
        if (isActive) {
          setReview(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  if (!review?.filmTitle || !review?.link) {
    return null;
  }

  const headline = review.filmYear ? `${review.filmTitle} (${review.filmYear})` : review.filmTitle;
  const cardStyle =
    review.backgroundColor || review.foregroundColor || review.mutedColor
      ? ({
          "--poster-bg": review.backgroundColor ?? undefined,
          "--poster-fg": review.foregroundColor ?? undefined,
          "--poster-muted": review.mutedColor ?? undefined,
        } as React.CSSProperties)
      : undefined;

  return (
    <article className={styles.card} style={cardStyle}>
      <a className={styles.corner} href={review.link} target="_blank" rel="noreferrer" aria-label="Read the full review on Letterboxd">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {review.imageUrl ? (
        <a className={styles.posterWrap} href={review.link} target="_blank" rel="noreferrer">
          <Image
            className={styles.poster}
            src={review.imageUrl}
            alt={`${review.filmTitle} poster`}
            width={220}
            height={330}
            sizes="(max-width: 720px) 88px, 110px"
            unoptimized
          />
        </a>
      ) : null}
      <div className={styles.content}>
        <a className={styles.title} href={review.link} target="_blank" rel="noreferrer">
          {headline}
        </a>
        {review.rating ? <Stars rating={review.rating} /> : null}
        {review.reviewText ? (
          <p className={styles.review}>
            <span className={styles.reviewClamp}>{review.reviewText}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
