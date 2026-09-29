/**
 * POST /api/offerte — Cloudflare Pages Function die een offerteaanvraag via Resend mailt.
 *
 * Draait naast de statische site op Cloudflare Pages (map `functions/` in de root van de
 * repo wordt automatisch opgepikt). Instellen in Cloudflare → project → Settings →
 * Variables and Secrets (Production én Preview):
 *
 *   RESEND_API_KEY       (Secret)  API-sleutel van resend.com
 *   RESEND_FROM                    afzender op een geverifieerd domein, bv. "Primelabs <offerte@primelabs.be>"
 *   OFFERTE_TO                     ontvanger(s), komma-gescheiden. Standaard info@primelabs.be
 *   OFFERTE_BEVESTIGING            "true" = de aanvrager krijgt ook een ontvangstbevestiging
 *
 * Beveiliging tegen spam zonder captcha: een onzichtbaar honeypotveld, een minimale
 * invultijd, lengtegrenzen en validatie. Er wordt niets opgeslagen; de aanvraag gaat
 * enkel per e-mail naar Primelabs.
 */

type Env = {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  OFFERTE_TO?: string;
  OFFERTE_BEVESTIGING?: string;
};

type Context = { request: Request; env: Env };

/* exact de opties van het keuzemenu in components/sections/offerte/RequestHero.tsx */
const TYPES = new Set([
  "Visuele dak- en gevelinspectie",
  "Periodieke werfopvolging (met nulmeting)",
  "Fotogrammetrie & 3D-modellering",
  "Nog te bepalen: we stemmen het samen af",
]);

const MAX = { naam: 120, bedrijf: 160, email: 200, telefoon: 40, type: 80, adres: 300, vraag: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/\r\n?/g, "\n").trim().slice(0, max) : "";
}

async function sendMail(env: Env, mail: Record<string, unknown>): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(mail),
  });
  if (!res.ok) console.error("Resend", res.status, await res.text());
  return res.ok;
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    console.error("Offerte: RESEND_API_KEY of RESEND_FROM ontbreekt");
    return json({ ok: false, error: "niet-geconfigureerd" }, 503);
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "ongeldig" }, 400);
  }

  // honeypot en invultijd: bots vullen het verborgen veld in of versturen meteen.
  // We antwoorden dan "ok", zodat een bot niet leert dat hij geweigerd werd.
  const started = Number(data.t);
  if (clean(data.website, 200) || !Number.isFinite(started) || Date.now() - started < 3000) {
    return json({ ok: true });
  }

  const f = {
    naam: clean(data.naam, MAX.naam),
    bedrijf: clean(data.bedrijf, MAX.bedrijf),
    email: clean(data.email, MAX.email),
    telefoon: clean(data.telefoon, MAX.telefoon),
    type: clean(data.type, MAX.type),
    adres: clean(data.adres, MAX.adres),
    vraag: clean(data.vraag, MAX.vraag),
  };
  const fouten: string[] = [];
  if (!f.naam) fouten.push("naam");
  if (!EMAIL.test(f.email)) fouten.push("email");
  if (!TYPES.has(f.type)) fouten.push("type");
  if (!f.adres) fouten.push("adres");
  if (!f.vraag) fouten.push("vraag");
  if (data.consent !== true) fouten.push("consent");
  if (fouten.length) return json({ ok: false, error: "velden", velden: fouten }, 422);

  const rijen: [string, string][] = [
    ["Naam", f.naam],
    ["Bedrijf", f.bedrijf || "—"],
    ["E-mail", f.email],
    ["Telefoon", f.telefoon || "—"],
    ["Type inspectie", f.type],
    ["Adres", f.adres],
  ];
  const tekst =
    rijen.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nInspectievraag:\n${f.vraag}\n\n— Verstuurd via het aanvraagformulier op primelabs.be`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#161517">
<h2 style="margin:0 0 16px;font-size:19px;color:#3a078a">Nieuwe inspectieaanvraag</h2>
<table cellpadding="6" style="border-collapse:collapse">${rijen
    .map(
      ([k, v]) =>
        `<tr><td style="color:#6e6c75;vertical-align:top;padding-right:18px">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<h3 style="margin:22px 0 8px;font-size:15px">Inspectievraag</h3>
<p style="white-space:pre-wrap;margin:0">${esc(f.vraag)}</p>
<p style="margin:26px 0 0;color:#6e6c75;font-size:13px">Verstuurd via het aanvraagformulier op primelabs.be. Beantwoorden gaat rechtstreeks naar de aanvrager.</p>
</div>`;

  const naar = (env.OFFERTE_TO || "info@primelabs.be")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const ok = await sendMail(env, {
    from: env.RESEND_FROM,
    to: naar,
    reply_to: f.email,
    subject: `Offerteaanvraag — ${f.type} — ${f.naam}`,
    text: tekst,
    html,
  });
  if (!ok) return json({ ok: false, error: "verzenden" }, 502);

  if (env.OFFERTE_BEVESTIGING === "true") {
    await sendMail(env, {
      from: env.RESEND_FROM,
      to: [f.email],
      reply_to: naar[0],
      subject: "We hebben uw aanvraag goed ontvangen — Primelabs",
      text:
        `Beste ${f.naam},\n\nBedankt voor uw aanvraag (${f.type}) voor ${f.adres}. ` +
        `We bekijken de haalbaarheid en nemen zo snel mogelijk contact met u op met een gerichte aanpak en een transparant voorstel.\n\n` +
        `Met vriendelijke groet,\nPrimelabs Drone Inspecties\ninfo@primelabs.be · +32 478 26 17 04`,
    });
  }

  return json({ ok: true });
}

export async function onRequest(): Promise<Response> {
  return json({ ok: false, error: "methode" }, 405);
}
