import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // De beelden zijn al per breedte geoptimaliseerd (webp + eigen srcset/sizes, bv. de
      // gekalibreerde hero). next/image zou die afstemming overschrijven, dus <img> blijft.
      "@next/next/no-img-element": "off",
      // Interne links zijn bewust gewone <a>'s: de interactiescripts (intro, reveals,
      // 3D-scènes) verwachten een volledige paginalading, zoals op de statische site.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // De oorspronkelijke interactiescripts (vanilla JS) worden ongewijzigd overgenomen.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "src/scripts/**", "tools/**"]),
]);

export default eslintConfig;
