"use client";

import { useState } from "react";
import { submitForm } from "@/lib/api";

export default function ContactForm() {
  const [formType, setFormType] = useState<"kritik_saran" | "request_seminar">(
    "kritik_saran"
  );
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await submitForm({ type: formType, payload: { message } });
      setStatus("success");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal mengirim pesan. Coba lagi."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
    >
      <label htmlFor="form-type" style={{ fontWeight: 500 }}>
        Jenis Pesan
      </label>
      <select
        id="form-type"
        value={formType}
        onChange={(e) =>
          setFormType(e.target.value as "kritik_saran" | "request_seminar")
        }
        style={{
          padding: "var(--space-xs) var(--space-sm)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--color-border)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <option value="kritik_saran">Kritik &amp; Saran</option>
        <option value="request_seminar">Request Seminar</option>
      </select>

      <label htmlFor="form-message" style={{ fontWeight: 500 }}>
        Pesan
      </label>
      <textarea
        id="form-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        placeholder="Tulis pesan kamu di sini…"
        style={{
          padding: "var(--space-sm)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--color-border)",
          fontFamily: "var(--font-sans)",
          resize: "vertical",
        }}
      />

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: "var(--space-sm) var(--space-md)",
          background:
            status === "loading" ? "var(--color-border)" : "var(--color-primary)",
          color: status === "loading" ? "var(--color-text-muted)" : "#fff",
          border: "none",
          borderRadius: "var(--radius)",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "background 0.15s ease",
        }}
      >
        {status === "loading" ? "Mengirim…" : "Kirim Pesan"}
      </button>

      {status === "success" && (
        <p style={{ color: "green", fontWeight: 500 }}>
          ✓ Pesan berhasil dikirim. Terima kasih!
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }} role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
