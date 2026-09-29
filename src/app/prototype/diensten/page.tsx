import type { Metadata } from "next";
import "@/styles/legacy/prototype-diensten.css";
import { PageScripts } from "@/components/scripts/PageScripts";
import { Lab } from "@/components/sections/prototype-diensten/Lab";

export const metadata: Metadata = {
  title: { absolute: "Dienstenscènes — losse panelen (testpagina)" },
};

/** Testpagina: elke dienstscène van /diensten in een eigen paneel. */
export default function PrototypeDienstenPage() {
  return (
    <>
      <Lab />
      <PageScripts bundle="prototype-diensten" />
    </>
  );
}
