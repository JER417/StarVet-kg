/* RUTA: components/services-section.tsx */
"use client"

import { useState } from "react"
import {
  Globe, Code, Cog, Monitor,
  BarChart3, Palette, Share2, Sparkles,
} from "lucide-react"

const services = [
  {
    icon: Globe,
    num: "01",
    title: "Creación de Páginas Web",
    desc: "Diseñamos y desarrollamos sitios web modernos, responsivos y optimizados para que tu veterinaria destaque en línea.",
  },
  {
    icon: Code,
    num: "02",
    title: "Creación de Software Dedicado",
    desc: "Desarrollamos soluciones de software a la medida para gestionar citas, historiales clínicos y más.",
  },
  {
    icon: Cog,
    num: "03",
    title: "Automatización de Procesos",
    desc: "Optimiza tu operación diaria con automatizaciones inteligentes que ahorran tiempo y reducen errores.",
  },
  {
    icon: Monitor,
    num: "04",
    title: "Software a Medida",
    desc: "Creamos herramientas personalizadas que se adaptan perfectamente a las necesidades de tu clínica.",
  },
  {
    icon: BarChart3,
    num: "05",
    title: "Marketing Digital",
    desc: "Estrategias de marketing digital enfocadas en atraer y retener clientes para tu veterinaria.",
  },
  {
    icon: Palette,
    num: "06",
    title: "Diseño de Publicidad",
    desc: "Creamos piezas publicitarias impactantes que comunican el valor de tus servicios veterinarios.",
  },
  {
    icon: Share2,
    num: "07",
    title: "Manejo de Redes Sociales",
    desc: "Gestionamos tus redes sociales para construir una comunidad fiel alrededor de tu marca.",
  },
  {
    icon: Sparkles,
    num: "08",
    title: "Creación de Marca",
    desc: "Desarrollamos tu identidad de marca completa: logo, paleta de colores, tipografía y guía de estilo.",
  },
]

export function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="servicios" className="py-24" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: "#f3eaff", color: "#7c35cc" }}
          >
            ✦ Nuestros Servicios
          </span>
          <h2
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              color: "#1a0a2e",
              lineHeight: 1.1,
            }}
          >
            Todo lo que tu{" "}
            <span style={{ color: "#7c35cc" }}>veterinaria necesita</span>
          </h2>
          <p style={{ color: "#6b5888", lineHeight: 1.75, fontSize: "1rem" }}>
            Ofrecemos soluciones integrales de tecnología y marketing diseñadas
            exclusivamente para clínicas veterinarias.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon
            const isHov = hovered === i
            return (
              <div
                key={svc.num}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-2xl p-6 transition-all duration-300 cursor-default overflow-hidden"
                style={{
                  background:   isHov ? "#fff"     : "#faf8ff",
                  border:       isHov ? "2px solid #e8d5ff" : "2px solid transparent",
                  boxShadow:    isHov ? "0 20px 50px rgba(124,53,204,0.12)" : "none",
                  transform:    isHov ? "translateY(-6px)" : "translateY(0)",
                }}
              >
                {/* top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-transform duration-400 origin-left"
                  style={{
                    background: "linear-gradient(to right, #7c35cc, #c084fc)",
                    transform: isHov ? "scaleX(1)" : "scaleX(0)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: isHov ? "#7c35cc"  : "#f3eaff",
                    color:      isHov ? "#ffffff"  : "#7c35cc",
                    boxShadow:  isHov ? "0 8px 20px rgba(124,53,204,0.3)" : "none",
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#9f5fe0" }}
                >
                  {svc.num}
                </p>
                <h3
                  className="font-bold mb-2 leading-snug"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "1rem",
                    color: "#1a0a2e",
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.845rem",
                    color: "#6b5888",
                    lineHeight: 1.65,
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}