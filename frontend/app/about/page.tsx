import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchOrganization, fetchDivisions, fetchMembers } from "@/lib/api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About SISO",
  description:
    "Kenali visi, misi, nilai, dan struktur kepengurusan SISO Prasmul — Himpunan Mahasiswa Ilmu Sosial.",
  openGraph: {
    title: "About SISO | SISO Prasmul",
    description: "Visi, misi, nilai, dan struktur kepengurusan SISO Prasmul.",
    locale: "id_ID",
  },
};

export default async function AboutPage() {
  const [org, divisions, members] = await Promise.all([
    fetchOrganization().catch(() => null),
    fetchDivisions().catch(() => []),
    fetchMembers().catch(() => []),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="page-hero container">
        <h1>About SISO</h1>
        <p>Himpunan Mahasiswa Ilmu Sosial Prasetiya Mulya.</p>
      </section>

      {/* Visi & Misi */}
      {org && (
        <section className="section-block container">
          {org.logo && (
            <Image
              src={org.logo}
              alt="Logo SISO Prasmul"
              width={120}
              height={120}
              style={{ marginBottom: "var(--space-md)" }}
            />
          )}

          {org.visi && (
            <div style={{ marginBottom: "var(--space-md)" }}>
              <h2 className="section-title">Visi</h2>
              <p>{org.visi}</p>
            </div>
          )}

          {org.misi && (
            <div style={{ marginBottom: "var(--space-md)" }}>
              <h2 className="section-title">Misi</h2>
              <p>{org.misi}</p>
            </div>
          )}

          {org.nilai.length > 0 && (
            <div style={{ marginBottom: "var(--space-md)" }}>
              <h2 className="section-title">Nilai-Nilai</h2>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
                {org.nilai.map((nilai) => (
                  <li key={nilai} className="card-tag">{nilai}</li>
                ))}
              </ul>
            </div>
          )}

          {org.filosofi_logo && (
            <div>
              <h2 className="section-title">Filosofi Logo</h2>
              <p>{org.filosofi_logo}</p>
            </div>
          )}
        </section>
      )}

      {/* Struktur Divisi */}
      <section className="section-block container">
        <h2 className="section-title">Divisi</h2>
        <div className="card-grid">
          {divisions.map((division) => (
            <Link key={division.id} href={`/about/divisi/${division.slug}`} className="card">
              {division.group_photo && (
                <Image
                  src={division.group_photo}
                  alt={`Foto divisi ${division.name}`}
                  width={400}
                  height={200}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h3 className="card-title">{division.name}</h3>
                {division.jobdesc && (
                  <p className="card-meta">
                    {division.jobdesc.slice(0, 100)}
                    {division.jobdesc.length > 100 ? "…" : ""}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Anggota BPH */}
      {members.length > 0 && (
        <section className="section-block container">
          <h2 className="section-title">Kepengurusan</h2>
          <div className="card-grid">
            {members.map((member) => (
              <div key={member.id} className="card">
                {member.photo && (
                  <Image
                    src={member.photo}
                    alt={`Foto ${member.name}`}
                    width={300}
                    height={200}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h3 className="card-title">{member.name}</h3>
                  <p className="card-meta">{member.role}</p>
                  <p className="card-meta">Generasi {member.generation_year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
