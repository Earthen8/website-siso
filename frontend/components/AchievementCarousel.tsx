"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Achievement } from "@/lib/types";
import styles from "./AchievementCarousel.module.css";

interface Props {
  achievements: Achievement[];
}

export default function AchievementCarousel({ achievements }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScrollNext = () => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-card]");
    const scrollStep = firstCard
      ? firstCard.offsetWidth + 24
      : track.clientWidth * 0.8;

    track.scrollBy({ left: scrollStep, behavior: "smooth" });
  };

  if (achievements.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef}>
        {achievements.map((item) => (
          <article className={styles.card} data-card key={item.id}>
            <div className={styles.photo}>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`${item.student_name} — ${item.title}`}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className={styles.placeholderPhoto} />
              )}
              <span className={styles.badge}>Congratulations</span>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{item.student_name}</p>
              <p className={styles.title}>{item.title}</p>
              {item.description && (
                <p className={styles.meta}>{item.description}</p>
              )}
            </div>
          </article>
        ))}
      </div>
      <button
        type="button"
        className={styles.next}
        onClick={handleScrollNext}
        aria-label="Lihat prestasi berikutnya"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
