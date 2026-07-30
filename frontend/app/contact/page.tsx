import type { Metadata } from "next";
import { fetchContact, fetchFAQs } from "@/lib/api";
import ContactForm from "@/components/ContactForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hubungi SISO Prasmul — email, Instagram, TikTok, YouTube, dan lokasi kami.",
  openGraph: {
    title: "Contact | SISO Prasmul",
    locale: "id_ID",
  },
};

export default async function ContactPage() {
  const [contact, faqs] = await Promise.all([
    fetchContact().catch(() => null),
    fetchFAQs().catch(() => []),
  ]);

  return (
    <>
      <section className="page-hero container">
        <h1>Contact</h1>
        <p>Temukan kami di media sosial atau kirim pesan langsung.</p>
      </section>

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-xl)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        {/* Contact info */}
        <section>
          <h2 className="section-title">Informasi Kontak</h2>
          {contact ? (
            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              {contact.email && (
                <li>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${contact.email}`} style={{ color: "var(--color-primary)" }}>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.instagram && (
                <li>
                  <strong>Instagram:</strong>{" "}
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-primary)" }}
                  >
                    @sisoprasmul
                  </a>
                </li>
              )}
              {contact.tiktok && (
                <li>
                  <strong>TikTok:</strong>{" "}
                  <a
                    href={contact.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-primary)" }}
                  >
                    @sisoprasmul
                  </a>
                </li>
              )}
              {contact.youtube && (
                <li>
                  <strong>YouTube:</strong>{" "}
                  <a
                    href={contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-primary)" }}
                  >
                    SISO Prasmul
                  </a>
                </li>
              )}
              {contact.spotify && (
                <li>
                  <strong>Spotify:</strong>{" "}
                  <a
                    href={contact.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-primary)" }}
                  >
                    SISO Prasmul Podcast
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Chat kami
                  </a>
                </li>
              )}
              {contact.location && (
                <li>
                  <strong>Lokasi:</strong> {contact.location}
                </li>
              )}
            </ul>
          ) : (
            <p className="card-meta">Informasi kontak belum tersedia.</p>
          )}

          {contact?.maps_embed && (
            <div
              style={{ marginTop: "var(--space-md)" }}
              /* maps_embed is an admin-controlled Google Maps iframe — safe to inject */
              dangerouslySetInnerHTML={{ __html: contact.maps_embed }}
            />
          )}
        </section>

        {/* Client-side form */}
        <section>
          <h2 className="section-title">Kirim Pesan</h2>
          <ContactForm />
        </section>
      </div>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="section-block container">
          <h2 className="section-title">FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="card"
                style={{ padding: "var(--space-md)" }}
              >
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                  {faq.question}
                </summary>
                <p style={{ marginTop: "var(--space-sm)", color: "var(--color-text-muted)" }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
