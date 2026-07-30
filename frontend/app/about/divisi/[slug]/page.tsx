import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchDivision, fetchMembers } from "@/lib/api";

export const revalidate = 300;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const division = await fetchDivision(params.slug).catch(() => null);
  if (!division) {
    return { title: "Divisi tidak ditemukan" };
  }
  return {
    title: division.name,
    description: division.jobdesc
      ? division.jobdesc.slice(0, 160)
      : `Profil divisi ${division.name} SISO Prasmul.`,
    openGraph: {
      title: `${division.name} | SISO Prasmul`,
      locale: "id_ID",
    },
  };
}

export default async function DivisiDetailPage({ params }: Props) {
  const [division, allMembers] = await Promise.all([
    fetchDivision(params.slug).catch(() => null),
    fetchMembers().catch(() => []),
  ]);

  if (!division) {
    notFound();
  }

  const divisionMembers = allMembers.filter(
    (m) => m.division === division.id
  );

  return (
    <>
      <section className="page-hero container">
        <h1>{division.name}</h1>
        {division.jobdesc && (
          <p>{division.jobdesc.slice(0, 200)}</p>
        )}
      </section>

      {division.group_photo && (
        <div className="container" style={{ marginBottom: "var(--space-xl)" }}>
          <Image
            src={division.group_photo}
            alt={`Foto grup divisi ${division.name}`}
            width={1200}
            height={500}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg)" }}
            priority
          />
        </div>
      )}

      {division.jobdesc && (
        <section className="section-block container">
          <h2 className="section-title">Job Description</h2>
          <p style={{ whiteSpace: "pre-line" }}>{division.jobdesc}</p>
        </section>
      )}

      {divisionMembers.length > 0 && (
        <section className="section-block container">
          <h2 className="section-title">Anggota</h2>
          <div className="card-grid">
            {divisionMembers.map((member) => (
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
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
