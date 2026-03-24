/* RUTA: components/about-section.tsx */

import Image from "next/image"

const highlights = [
  "Especializados en el sector veterinario",
  "Equipo multidisciplinario de expertos",
  "Soluciones tecnológicas personalizadas",
  "Acompañamiento continuo y soporte dedicado",
  "Resultados medibles y transparentes",
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-24" style={{ background: "#faf8ff" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image column */}
          <div className="relative">
            {/* Corner accents */}
            <div
              className="absolute -top-5 -left-5 w-24 h-24 pointer-events-none z-10"
              style={{
                borderTop:  "2px solid #7c35cc",
                borderLeft: "2px solid #7c35cc",
              }}
            />
            <div
              className="absolute -bottom-5 -right-5 w-24 h-24 pointer-events-none z-10"
              style={{
                borderBottom: "2px solid #c084fc",
                borderRight:  "2px solid #c084fc",
              }}
            />

            {/* Photo */}
            <div className="rounded-2xl overflow-hidden" style={{ height: "520px", boxShadow: "0 30px 80px rgba(124,53,204,0.18)" }}>
              <Image
                src="/images/about-team.jpg"
                alt="Equipo de StarVet trabajando en soluciones digitales"
                width={600}
                height={520}
                className="object-cover w-full h-full"
              />
            </div>

            

            {/* Tag */}
            <div
              className="absolute -top-3 -right-3 rounded-full px-4 py-2 z-20 border-2 text-sm font-bold"
              style={{
                background:   "#fff",
                borderColor:  "#e8d5ff",
                color:        "#7c35cc",
                boxShadow:    "0 8px 24px rgba(124,53,204,0.12)",
              }}
            >
              ⭐ Especialistas en veterinarias
            </div>
          </div>

          {/* Text column */}
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ background: "#f3eaff", color: "#7c35cc" }}
            >
              ✦ Sobre Nosotros
            </span>

            <h2
              className="font-extrabold tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize:   "clamp(1.9rem, 4vw, 3rem)",
                color:      "#1a0a2e",
                lineHeight: 1.1,
              }}
            >
              Gestionamos tu clínica,{" "}
              <span style={{ color: "#7c35cc" }}>impulsamos tu éxito</span>
            </h2>

            <p style={{ color: "#6b5888", lineHeight: 1.76, marginBottom: "1rem" }}>
              En StarVet entendemos los desafíos únicos del sector veterinario.
              Nuestro equipo combina experiencia en tecnología, marketing y
              conocimiento del sector para ofrecer soluciones que realmente funcionan.
            </p>
            <p style={{ color: "#6b5888", lineHeight: 1.76, marginBottom: "2rem" }}>
              Creemos que cada veterinaria merece las mejores herramientas digitales
              para crecer y brindar un mejor servicio a sus pacientes y clientes.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "#f3eaff" }}
                  >
                    <svg width="12" height="12" fill="none" stroke="#7c35cc" strokeWidth="2.5">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </span>
                  <span style={{ fontSize: "0.95rem", color: "#2d1a4a" }}>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-200"
              style={{
                background:  "#7c35cc",
                boxShadow:   "0 8px 28px rgba(124,53,204,0.30)",
              }}
            >
              Hablemos de tu clínica
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}