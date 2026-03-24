/* RUTA: components/cta-section.tsx */

import Link from "next/link"

export function CtaSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#7c35cc" }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize:  "32px 32px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <span
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
        >
          ✦ Consulta gratuita sin compromiso
        </span>

        <h2
          className="font-extrabold tracking-tight mb-4"
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize:   "clamp(1.9rem, 4.5vw, 3.2rem)",
            color:      "#fff",
            lineHeight: 1.1,
          }}
        >
          Tu veterinaria está lista para crecer
        </h2>

        <p
          className="mb-8 mx-auto"
          style={{
            color:     "rgba(255,255,255,0.75)",
            fontSize:  "1.05rem",
            lineHeight: 1.72,
            maxWidth:  "500px",
          }}
        >
          Da el primer paso hacia la transformación digital de tu clínica.
          Agenda una consulta gratuita hoy mismo.
        </p>

        <Link
          href="#contacto"
          className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200"
          style={{
            background:  "#fff",
            color:       "#7c35cc",
            boxShadow:   "0 8px 28px rgba(0,0,0,0.15)",
          }}
        >
          Agendar consulta gratis
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  )
}