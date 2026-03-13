import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "armwrestling.rs — Obaranje ruku u Srbiji",
  description:
    "Pronađi klub, prati turnire i nauči osnove obaranja ruku u Srbiji.",
  openGraph: {
    title: "armwrestling.rs — Obaranje ruku u Srbiji",
    description:
      "Pronađi klub, prati turnire i nauči osnove obaranja ruku u Srbiji.",
    url: "https://armwrestling.rs",
    type: "website",
    locale: "sr_RS",
    siteName: "armwrestling.rs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
