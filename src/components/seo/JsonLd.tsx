/**
 * Rendert structured data als <script type="application/ld+json"> (aanbevolen aanpak
 * van Next.js). `<` wordt ge-escaped zodat de inhoud de script-tag nooit kan sluiten.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
