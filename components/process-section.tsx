import { MessageSquare, Search, Lightbulb, Rocket } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Consulta Inicial",
    description:
      "Analizamos las necesidades de tu veterinaria y definimos objetivos claros para tu transformación digital.",
  },
  {
    icon: Search,
    step: "02",
    title: "Diagnostico Digital",
    description:
      "Evaluamos tu presencia digital actual e identificamos las areas de mayor oportunidad para tu clínica.",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Estrategia Personalizada",
    description:
      "Diseñamos un plan de acción a medida con soluciones especificas para tus metas de crecimiento.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Implementación y Resultados",
    description:
      "Ejecutamos la estrategia, medimos resultados y optimizamos continuamente para maximizar tu inversion.",
  },
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Nuestro Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            {"Como transformamos tu veterinaria"}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Un proceso claro y comprobado para llevar a tu clínica al siguiente nivel digital.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative text-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-6">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
