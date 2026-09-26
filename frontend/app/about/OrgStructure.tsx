"use client";

import { useState, useEffect } from "react";
import type { BPHMember, Division } from "@/lib/types";
import styles from "./OrgStructure.module.css";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * PhotoCell: renders a photo if `src` is provided, otherwise falls back to
 * coloured initials. Uses a plain <img> so the parent grid cell fully controls
 * dimensions — no Next/Image fill-parent constraints.
 */
function PhotoCell({
  src,
  name,
  className = "",
}: {
  src: string | null;
  name: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={`${styles.photoImg} ${className}`} />;
  }
  return (
    <div className={`${styles.initialsCell} ${className}`} aria-label={name}>
      {getInitials(name)}
    </div>
  );
}

// ── BPH Group Card — one wide rectangular card for all BPH members ────────────

function BphGroupCard({
  members,
  onClick,
}: {
  members: BPHMember[];
  onClick: () => void;
}) {
  const preview = members.slice(0, 4);

  return (
    <button
      className={styles.bphCard}
      onClick={onClick}
      aria-label="Lihat detail Badan Pengurus Harian"
    >
      {/* 2×2 photo collage as background */}
      <div className={styles.bphCollage}>
        {preview.map((m) => (
          <PhotoCell key={m.id} src={m.photo} name={m.name} className={styles.bphCollageCell} />
        ))}
        {Array.from({ length: Math.max(0, 4 - preview.length) }).map((_, i) => (
          <div key={`fill-${i}`} className={`${styles.bphCollageCell} ${styles.collageFill}`} />
        ))}
      </div>

      <div className={styles.cardGradient} />

      <div className={styles.bphContent}>
        <span className={styles.groupBadge}>{members.length} Anggota</span>
        <p className={styles.bphTitle}>Badan Pengurus Harian</p>
        <p className={styles.bphSubtitle}>Ketua · Wakil · Sekretaris · Bendahara</p>
        <span className={styles.clickHint}>Klik untuk detail →</span>
      </div>
    </button>
  );
}

// ── Division Card — square, one per division from API ─────────────────────────

function DivisionCard({
  division,
  members,
  onClick,
}: {
  division: Division;
  members: BPHMember[];
  onClick: () => void;
}) {
  const preview = members.slice(0, 4);
  const count = preview.length;
  const cols = count <= 1 ? 1 : 2;

  return (
    <button
      className={styles.divisionCard}
      onClick={onClick}
      aria-label={`Lihat anggota ${division.name}`}
    >
      {/* Background priority: group_photo → member collage → gradient fallback */}
      {division.group_photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={division.group_photo} alt={division.name} className={styles.divGroupPhoto} />
      ) : count > 0 ? (
        <div
          className={styles.divCollage}
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {preview.map((m) => (
            <PhotoCell key={m.id} src={m.photo} name={m.name} className={styles.divCollageCell} />
          ))}
          {count === 1 && <div className={`${styles.divCollageCell} ${styles.collageFill}`} />}
        </div>
      ) : (
        <div className={styles.divFallbackBg} />
      )}

      <div className={styles.cardGradient} />

      <div className={styles.divContent}>
        <span className={styles.memberBadge}>
          {members.length} Member{members.length !== 1 ? "s" : ""}
        </span>
        <p className={styles.divName}>{division.name}</p>
        <p className={styles.divDesc}>{division.jobdesc}</p>
      </div>
    </button>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────

type ModalData =
  | { kind: "bph"; members: BPHMember[] }
  | { kind: "division"; division: Division; members: BPHMember[] };

function MemberCard({ member }: { member: BPHMember }) {
  return (
    <div className={styles.memberCard}>
      <div className={styles.memberPortrait}>
        <PhotoCell src={member.photo} name={member.name} className={styles.memberPortraitPhoto} />
      </div>
      <div className={styles.memberInfo}>
        <span className={styles.memberRole}>{member.role}</span>
        <h4 className={styles.memberName}>{member.name}</h4>
        <span className={styles.memberGen}>Gen {member.generation_year}</span>
      </div>
    </div>
  );
}

function getGridClass(count: number): string {
  if (count <= 1) return styles.gridSingle;
  if (count === 2) return styles.gridDouble;
  if (count === 3) return styles.gridTriple;
  if (count === 4) return styles.gridQuad;
  return styles.gridMulti;
}

function Modal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  const members = data.members;
  const count = members.length;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.panelHeader}>
          <div className={styles.headerInfo}>
            <span className={styles.panelBadge}>
              {data.kind === "bph" ? "Badan Pengurus Harian" : "Divisi"}
            </span>
            <h3 className={styles.panelTitle}>
              {data.kind === "bph" ? "Badan Pengurus Harian" : data.division.name}
            </h3>
            {data.kind === "division" && data.division.jobdesc && (
              <p className={styles.panelSubtitle}>{data.division.jobdesc}</p>
            )}
            <span className={styles.memberCount}>
              {count} Anggota
            </span>
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Tutup modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {members.length > 0 ? (
          <div className={`${styles.membersGrid} ${getGridClass(count)}`}>
            {members.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Belum ada data anggota untuk divisi ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────

interface Props {
  members: BPHMember[];
  divisions: Division[];
}

export default function OrgStructure({ members, divisions }: Props) {
  const [modal, setModal] = useState<ModalData | null>(null);

  const bphMembers = members.filter((m) => m.division === null);

  const divisionMembersMap = new Map<number, BPHMember[]>();
  for (const m of members) {
    if (m.division !== null) {
      const bucket = divisionMembersMap.get(m.division) ?? [];
      divisionMembersMap.set(m.division, [...bucket, m]);
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Single combined BPH card — groups all division-null members */}
      {bphMembers.length > 0 && (
        <BphGroupCard
          members={bphMembers}
          onClick={() => setModal({ kind: "bph", members: bphMembers })}
        />
      )}

      {/* One square card per division — scales with however many divisions are in API */}
      {divisions.length > 0 && (
        <div className={styles.divisionsGrid}>
          {divisions.map((div) => {
            const divMembers = divisionMembersMap.get(div.id) ?? [];
            return (
              <DivisionCard
                key={div.id}
                division={div}
                members={divMembers}
                onClick={() => setModal({ kind: "division", division: div, members: divMembers })}
              />
            );
          })}
        </div>
      )}

      {modal && <Modal data={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
