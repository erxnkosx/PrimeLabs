import type { Metadata } from "next";
import "@/styles/legacy/prototype.css";
import { PageScripts } from "@/components/scripts/PageScripts";
import { Lab } from "@/components/sections/prototype/Lab";

export const metadata: Metadata = {
  title: { absolute: "3D-prototypes — Primelabs (niet op de site)" },
};

/** Testpagina: vier richtingen voor de 3D-gebouwen naast het huidige model. */
export default function PrototypePage() {
  return (
    <>
      <Lab />
      <PageScripts bundle="prototype" />
    </>
  );
}
