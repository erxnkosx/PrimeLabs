import type { Metadata, Viewport } from "next";
import { company, SITE_URL } from "@/config/site";
import "@/styles/fonts";
import "./globals.css";
import "@/styles/legacy/style.css";
import "@/styles/mobile.css";
import "@/styles/site-extra.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: company.name,
  title: { default: company.name, template: `%s — ${company.name}` },
  description: company.description,
  authors: [{ name: company.name, url: SITE_URL }],
  creator: company.name,
  publisher: company.name,
  category: "business",
  formatDetection: { telephone: false, address: false, email: false },
  // Search Console / Bing: vul de verificatiecodes in via .env zodra het domein live staat.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

/* Zonder JavaScript: geen laaddoek, alle inhoud en de fotoscène meteen zichtbaar. */
const noscriptStyle =
  "<style>.pre{display:none}.rv{opacity:1;transform:none}.hero--scene *{animation-play-state:running!important}.hs-scene .hs-stage{opacity:1!important}.eyebrow::before{animation-play-state:running!important}</style>";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE" suppressHydrationWarning>
      <head>
        <noscript dangerouslySetInnerHTML={{ __html: noscriptStyle }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
