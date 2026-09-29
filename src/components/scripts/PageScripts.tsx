"use client";

import { useEffect } from "react";

/**
 * Laadt de oorspronkelijke interactiescripts (src/scripts/*.js) per pagina, in exact
 * dezelfde volgorde als de <script defer>-tags van de statische site:
 *
 *   three.js → scene.js → scene-services.js → main.js → paginascript
 *
 * Ze draaien na de hydratatie, dus React raakt de DOM die ze aanpassen niet meer aan.
 * Ze worden gebundeld door Next.js (gehashte, cachebare chunks); three.js komt uit npm
 * (zelfde versie 0.150.1 als voorheen via cdnjs) in plaats van een externe cdn.
 */
export type ScriptBundle =
  | "home"
  | "diensten"
  | "scene"
  | "case-inspectie"
  | "case-woning"
  | "basic"
  | "prototype"
  | "prototype-diensten";

declare global {
  interface Window {
    THREE?: unknown;
  }
}

async function loadThree() {
  try {
    const mod = await import("three");
    // scene.js leest window.THREE op het moment dat het laadt; een gewoon object
    // (i.p.v. de bevroren module-namespace) gedraagt zich als de UMD-build.
    window.THREE = { ...mod };
  } catch (err) {
    // Zonder three.js vallen de viewports terug op hun statische raster (.no3d),
    // zoals op de oorspronkelijke site wanneer beide cdn's faalden.
    console.error("three.js kon niet laden", err);
    document.body.classList.add("no3d");
  }
}

const bundles: Record<ScriptBundle, () => Promise<unknown>> = {
  home: async () => {
    await import("@/scripts/main.js");
    await import("@/scripts/hero-scene.js");
  },
  diensten: async () => {
    await loadThree();
    await import("@/scripts/scene.js");
    await import("@/scripts/scene-services.js");
    await import("@/scripts/main.js");
  },
  scene: async () => {
    await loadThree();
    await import("@/scripts/scene.js");
    await import("@/scripts/main.js");
  },
  "case-inspectie": async () => {
    await import("@/scripts/main.js");
    await import("@/scripts/case-inspectie.js");
  },
  "case-woning": async () => {
    await import("@/scripts/main.js");
    await import("@/scripts/case-woning.js");
  },
  basic: async () => {
    await import("@/scripts/main.js");
  },
  prototype: async () => {
    await loadThree();
    await import("@/scripts/proto.js");
    await import("@/scripts/prototype-start.js");
  },
  "prototype-diensten": async () => {
    await loadThree();
    await import("@/scripts/scene.js");
    await import("@/scripts/scene-services.js");
    await import("@/scripts/prototype-diensten-start.js");
  },
};

export function PageScripts({ bundle }: { bundle: ScriptBundle }) {
  useEffect(() => {
    // Modules worden maar één keer uitgevoerd (ook in de dubbele effect-run van
    // React Strict Mode), dus dit is veilig.
    bundles[bundle]().catch((err) => console.error("Paginascripts konden niet laden", err));
  }, [bundle]);
  return null;
}
