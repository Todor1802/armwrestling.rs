import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "armwrestling.rs — Obaranje ruku u Srbiji",
  description:
    "Pronađi klub, prati turnire i nauči osnove obaranja ruku u Srbiji.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
