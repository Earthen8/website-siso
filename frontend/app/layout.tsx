import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SISO Prasmul",
    template: "%s | SISO Prasmul",
  },
  description:
    "Website resmi SISO Prasmul — Himpunan Mahasiswa Ilmu Sosial Prasetiya Mulya.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sisoprasmul.com"
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
