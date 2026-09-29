import "@/styles/fonts-cases";
import "@/styles/legacy/speculoos-case.css";

/**
 * Gedeeld door de drie casepagina's: de sc-*-componenten uit speculoos-case.css en
 * de extra lettergewichten die enkel de cases gebruiken. De URL's blijven /portfolio/…
 * omdat (cases) een route group is.
 */
export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
