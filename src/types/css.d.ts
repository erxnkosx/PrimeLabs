import "react";

// Laat CSS custom properties toe in style={{ "--tx": "…" }} (veel gebruikt in de hero-scène).
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
