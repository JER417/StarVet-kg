/* RUTA: components/process-section.tsx */
"use client"

const steps = [
  {
    num: "01",
    title: "Consulta Inicial",
    desc: "Analizamos las necesidades de tu veterinaria y definimos objetivos claros para tu transformación digital.",
  },
  {
    num: "02",
    title: "Diagnóstico Digital",
    desc: "Evaluamos tu presencia digital actual e identificamos las áreas de mayor oportunidad para tu clínica.",
  },
  {
    num: "03",
    title: "Estrategia Personalizada",
    desc: "Diseñamos un plan de acción a medida con soluciones específicas para tus metas de crecimiento.",
  },
  {
    num: "04",
    title: "Implementación y Resultados",
    desc: "Ejecutamos la estrategia, medimos resultados y optimizamos continuamente para maximizar tu inversión.",
  },
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-24" style={{ background: "#1a0a2e" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(255,255,255,0.1)", color: "#b06af5" }}
          >
            ✦ Nuestro Proceso
          </span>
          <h2
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize:   "clamp(1.9rem, 4vw, 3rem)",
              color:      "#fff",
              lineHeight: 1.1,
            }}
          >
            Cómo transformamos tu{" "}
            <span style={{ color: "#b06af5" }}>veterinaria</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.72 }}>
            Un proceso claro y comprobado para llevar a tu clínica al siguiente nivel digital.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl p-7 transition-all duration-300 group"
              style={{
                background:  "rgba(255,255,255,0.05)",
                border:      "1.5px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background   = "rgba(124,53,204,0.15)"
                el.style.borderColor  = "rgba(176,106,245,0.35)"
                el.style.transform    = "translateY(-4px)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background   = "rgba(255,255,255,0.05)"
                el.style.borderColor  = "rgba(255,255,255,0.08)"
                el.style.transform    = "translateY(0)"
              }}
            >
              <span
                className="block font-extrabold leading-none mb-5"
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize:   "3rem",
                  color:      "#b06af5",
                  opacity:    0.35,
                }}
              >
                {step.num}
              </span>
              <h3
                className="font-bold mb-3"
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize:   "1.1rem",
                  color:      "#fff",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.72 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}