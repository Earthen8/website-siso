import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-hero container">
      <h1>404 — Halaman tidak ditemukan</h1>
      <p>Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
      <div style={{ marginTop: "var(--space-lg)" }}>
        <Link href="/" className="btn-primary">
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
}
