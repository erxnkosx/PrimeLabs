"use client";

import { useEffect, useRef, useState } from "react";

type RailStap = { id: string; nummer: string; titel: string; mijlpaal: string };

/**
 * Stappenbalk die bovenaan blijft staan terwijl u door de vijf fasen scrolt. De stap die
 * het dichtst bij de leeslijn staat, licht op en de voortgangslijn loopt mee. Zonder
 * JavaScript is het gewoon een lijst met ankerlinks.
 */
export function ProcessRail({ stappen }: { stappen: RailStap[] }) {
  const [actief, setActief] = useState(0);
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    const doelen = stappen
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!doelen.length) return;

    const bijwerken = () => {
      const lijn = window.innerHeight * 0.42;
      let beste = 0;
      doelen.forEach((el, i) => {
        if (el.getBoundingClientRect().top - lijn <= 0) beste = i;
      });
      setActief(beste);
    };
    bijwerken();
    window.addEventListener("scroll", bijwerken, { passive: true });
    window.addEventListener("resize", bijwerken);
    return () => {
      window.removeEventListener("scroll", bijwerken);
      window.removeEventListener("resize", bijwerken);
    };
  }, [stappen]);

  // op smalle schermen scrolt de balk zelf mee naar de actieve stap
  useEffect(() => {
    const el = rail.current?.querySelector<HTMLElement>(`[data-i="${actief}"]`);
    const lijst = rail.current?.querySelector<HTMLElement>(".proc-rail__list");
    if (el && lijst && lijst.scrollWidth > lijst.clientWidth) {
      lijst.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
    }
  }, [actief]);

  return (
    <nav
      className="proc-rail"
      aria-label="De vijf stappen"
      ref={rail}
      style={{ "--p": stappen.length > 1 ? actief / (stappen.length - 1) : 0 }}
    >
      <ol className="proc-rail__list">
        {stappen.map((s, i) => (
          <li
            key={s.id}
            data-i={i}
            className={i === actief ? "is-actief" : i < actief ? "is-klaar" : undefined}
          >
            <a href={`#${s.id}`} aria-current={i === actief ? "step" : undefined}>
              <span className="proc-rail__n">{s.nummer}</span>
              <span className="proc-rail__txt">
                <b>{s.titel}</b>
                <span>{s.mijlpaal}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
