"use client";

import { useCallback, useEffect, useState } from "react";
import { GA_ID, routes } from "@/config/site";

/**
 * Cookiebanner + Google Analytics 4 met voorafgaande toestemming.
 *
 * - Zonder NEXT_PUBLIC_GA_ID doet dit component niets (geen analytics, dus geen banner nodig).
 * - Vóór toestemming wordt er niets van Google geladen en geen cookie gezet.
 * - Weigeren is even makkelijk als accepteren (twee gelijkwaardige knoppen), zoals de
 *   Gegevensbeschermingsautoriteit verwacht. De keuze wordt 6 maanden onthouden.
 * - "Cookie-instellingen" in de footer (data-consent-open) opent de voorkeuren opnieuw.
 * - Intrekken wist de _ga-cookies en schakelt GA meteen uit.
 */
const OPSLAG = "pl-consent";
const VERSIE = 1;
const GELDIG_MS = 1000 * 60 * 60 * 24 * 182;

type Keuze = { v: number; analytics: boolean; ts: number };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function leesKeuze(): Keuze | null {
  try {
    const k = JSON.parse(localStorage.getItem(OPSLAG) || "null") as Keuze | null;
    if (!k || k.v !== VERSIE || Date.now() - k.ts > GELDIG_MS) return null;
    return k;
  } catch {
    return null;
  }
}

function bewaarKeuze(analytics: boolean) {
  try {
    localStorage.setItem(OPSLAG, JSON.stringify({ v: VERSIE, analytics, ts: Date.now() }));
  } catch {
    /* privémodus zonder opslag: de keuze geldt dan enkel voor deze pagina */
  }
}

let gaGeladen = false;
function laadGA() {
  if (!GA_ID || gaGeladen) return;
  gaGeladen = true;
  window[`ga-disable-${GA_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  // gtag moet `arguments` doorgeven, zo verwacht gtag.js het
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 60 * 60 * 24 * 390,
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

function stopGA() {
  if (!GA_ID) return;
  window[`ga-disable-${GA_ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  // _ga en _ga_<ID> wissen op het huidige domein en het hoofddomein
  const host = location.hostname;
  const delen = host.split(".");
  const domeinen = ["", host, `.${host}`, delen.length > 2 ? `.${delen.slice(-2).join(".")}` : ""].filter(
    (d, i, a) => a.indexOf(d) === i,
  );
  document.cookie.split(";").forEach((c) => {
    const naam = c.split("=")[0].trim();
    if (naam === "_ga" || naam.startsWith("_ga_")) {
      domeinen.forEach((d) => {
        document.cookie = `${naam}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      });
    }
  });
}

export function CookieConsent() {
  const [zichtbaar, setZichtbaar] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    // opgeslagen keuze pas na de hydratatie lezen (de server kent localStorage niet)
    const raf = requestAnimationFrame(() => {
      const k = leesKeuze();
      if (k) {
        setAnalytics(k.analytics);
        if (k.analytics) laadGA();
      } else {
        setZichtbaar(true);
      }
    });
    const open = (e: Event) => {
      const doel = (e.target as HTMLElement | null)?.closest?.("[data-consent-open]");
      if (!doel) return;
      e.preventDefault();
      setAnalytics(leesKeuze()?.analytics ?? false);
      setDetails(true);
      setZichtbaar(true);
    };
    document.addEventListener("click", open);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", open);
    };
  }, []);

  const kies = useCallback((ja: boolean) => {
    bewaarKeuze(ja);
    setAnalytics(ja);
    if (ja) laadGA();
    else stopGA();
    setZichtbaar(false);
    setDetails(false);
  }, []);

  if (!GA_ID || !zichtbaar) return null;

  return (
    <section className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-t">
      <p className="consent__t" id="consent-t">
        Cookies op deze website
      </p>
      <p className="consent__p">
        We gebruiken alleen met uw toestemming analytische cookies (Google Analytics) om te zien hoe de site
        gebruikt wordt, zodat we ze kunnen verbeteren. Geen advertenties, geen profilering.{" "}
        <a href={`${routes.privacybeleid}#cookies`}>Meer in ons privacybeleid</a>.
      </p>

      {details && (
        <div className="consent__opts">
          <label className="consent__opt">
            <input type="checkbox" checked disabled />
            <span>
              <b>Noodzakelijk</b>
              <span>Onthoudt uw keuze op dit toestel. Altijd aan, geen cookie.</span>
            </span>
          </label>
          <label className="consent__opt">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>
              <b>Analytisch</b>
              <span>Google Analytics 4: anonieme bezoekstatistieken, bewaard tot 13 maanden.</span>
            </span>
          </label>
        </div>
      )}

      <div className="consent__acts">
        {details ? (
          <>
            <button type="button" className="consent__btn" onClick={() => kies(false)}>
              Alles weigeren
            </button>
            <button type="button" className="consent__btn consent__btn--p" onClick={() => kies(analytics)}>
              Keuze opslaan
            </button>
          </>
        ) : (
          <>
            <button type="button" className="consent__btn" onClick={() => kies(false)}>
              Weigeren
            </button>
            <button type="button" className="consent__btn consent__btn--p" onClick={() => kies(true)}>
              Accepteren
            </button>
          </>
        )}
      </div>
      {!details && (
        <button type="button" className="consent__more" onClick={() => setDetails(true)}>
          Instellingen aanpassen
        </button>
      )}
    </section>
  );
}
