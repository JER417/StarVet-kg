import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const highlights = [
  "Especializados en el sector veterinario",
  "Equipo multidisciplinario de expertos",
  "Soluciones tecnologicas personalizadas",
  "Acompanamiento continuo y soporte dedicado",
  "Resultados medibles y transparentes",
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-team.jpg"
                alt="Equipo de StarVet trabajando en soluciones digitales"
                width={600}
                height={450}
                className="object-cover w-full h-[400px] lg:h-[450px]"
              />
            </div>
            {/* Accent element */}
            <div className="absolute -z-10 -top-4 -left-4 w-full h-full rounded-2xl bg-primary/10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Sobre Nosotros
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
              Gestionamos tu clinica, impulsamos tu exito
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              En StarVet entendemos los desafios unicos del sector veterinario. Nuestro equipo combina experiencia en tecnologia, marketing y conocimiento del sector para ofrecer soluciones que realmente funcionan.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Creemos que cada veterinaria merece las mejores herramientas digitales para crecer y brindar un mejor servicio a sus pacientes y clientes.
            </p>

            <div className="mt-8 space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
