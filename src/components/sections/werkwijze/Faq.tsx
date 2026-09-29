import { faq } from "@/content/faq";

// FAQ — de inhoud staat in src/content/faq.ts (ook gebruikt voor de FAQPage-structured data).
// Het openklappen regelt main.js (aria-expanded + .open op .faq__i).
export function Faq() {
  return (
    <section className="sec">
      <div className="wrap">
        <span className="eyebrow">Praktisch</span>
        <h2 data-split="" style={{ marginBottom: "38px" }}>
          Veelgestelde vragen
        </h2>
        <div className="faq">
          {faq.map((item) => (
            <div className="faq__i" key={item.id}>
              <button className="faq__q" type="button" aria-expanded="false" aria-controls={item.id}>
                {item.question}{" "}
                <span className="faq__ico" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div className="faq__a" id={item.id}>
                <div>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
