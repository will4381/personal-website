"use client";

import * as React from "react";

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
      {review.imageUrl ? (
        <a className={styles.posterWrap} href={review.link} target="_blank" rel="noreferrer">
          <img className={styles.poster} src={review.imageUrl} alt={`${review.filmTitle} poster`} loading="lazy" />
        </a>
      ) : null}
      <div className={styles.content}>
        <a className={styles.title} href={review.link} target="_blank" rel="noreferrer">
          {headline}
        </a>
        {review.ratingStars ? <div className={styles.rating}>{review.ratingStars}</div> : null}
        {review.reviewText ? (
          <p className={styles.review}>
            <span className={styles.reviewClamp}>{review.reviewText}</span>
          </p>
        ) : null}
        <a className={styles.cta} href={review.link} target="_blank" rel="noreferrer">
          Read the full review
        </a>
      </div>
    </article>
  );
}
