export default function Loading() {
  return (
    <div className="container" style={{ paddingBlock: "var(--space-2xl)" }}>
      <div className="skeleton skeleton-text" style={{ width: "40%", height: "2rem", marginBottom: "var(--space-md)" }} />
      <div className="skeleton skeleton-text" style={{ width: "65%" }} />
      <div className="skeleton skeleton-text" style={{ width: "55%", marginBottom: "var(--space-xl)" }} />
      <div className="card-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    </div>
  );
}
