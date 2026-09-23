import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PrimeLabs",
  description: "Drone-inspecties en technische rapportering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}