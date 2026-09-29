import type { Metadata } from "next";

/** Interne testpagina's: nooit indexeren (staan ook onder Disallow in robots.txt). */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
