"use client"

import { useState } from "react"
import {
  Globe,
  Code,
  Cog,
  BarChart3,
  Palette,
  Share2,
  Sparkles,
  Monitor,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Globe,
    title: "Creacion de Paginas Web",
    description:
      "Disenamos y desarrollamos sitios web modernos, responsivos y optimizados para que tu veterinaria destaque en linea.",
  },
  {
    icon: Code,
    title: "Creacion de Software Dedicado",
    description:
      "Desarrollamos soluciones de software a la medida para gestionar citas, historiales clinicos y mas.",
  },
  {
    icon: Cog,
    title: "Automatizacion de Procesos",
    description:
      "Optimiza tu operacion diaria con automatizaciones inteligentes que ahorran tiempo y reducen errores.",
  },
  {
    icon: Monitor,
    title: "Software a Medida",
    description:
      "Creamos herramientas personalizadas que se adaptan perfectamente a las necesidades de tu clinica.",
  },
  {
    icon: BarChart3,
    title: "Marketing Digital",
    description:
      "Estrategias de marketing digital enfocadas en atraer y retener clientes para tu veterinaria.",
  },
  {
    icon: Palette,
    title: "Diseno de Publicidad",
    description:
      "Creamos piezas publicitarias impactantes que comunican el valor de tus servicios veterinarios.",
  },
  {
    icon: Share2,
    title: "Manejo de Redes Sociales",
    description:
      "Gestionamos tus redes sociales para construir una comunidad fiel alrededor de tu marca.",
  },
  {
    icon: Sparkles,
    title: "Creacion de Marca",
    description:
      "Desarrollamos tu identidad de marca completa: logo, paleta de colores, tipografia y guia de estilo.",
  },
]

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Nuestros Servicios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Todo lo que tu veterinaria necesita para crecer
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Ofrecemos soluciones integrales de tecnologia y marketing disenadas exclusivamente para clinicas veterinarias.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            const isHovered = hoveredIndex === index
            return (
              <Card
                key={service.title}
                className={`group relative cursor-pointer transition-all duration-300 border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
                  isHovered ? "border-primary/30 shadow-lg shadow-primary/5" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardContent className="p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isHovered ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div
                    className={`mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Saber mas <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
