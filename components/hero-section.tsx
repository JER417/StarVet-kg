import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.50_0.20_280/0.4),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.35_0.15_290/0.5),_transparent_60%)]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-1.5 text-sm text-primary-foreground/90 mb-6 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>Consultora Digital para Veterinarias</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
              <span className="text-balance">{"Impulsa el crecimiento de tu veterinaria"}</span>
            </h1>

            <p className="mt-6 text-lg text-primary-foreground/75 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Somos una consultora digital especializada en automatizacion y marketing estrategico para veterinarias que buscan crecer y modernizarse.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8"
              >
                <Link href="#contacto">
                  Agenda tu consulta gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground px-8"
              >
                <Link href="#servicios">Conoce nuestros servicios</Link>
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/10">
              <Image
                src="/images/hero-vet.jpg"
                alt="Veterinaria sonriendo con un cachorro schnauzer en una clinica moderna"
                width={600}
                height={500}
                className="object-cover w-full h-[500px]"
                priority
              />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Gestionamos tu clinica</p>
                  <p className="text-xs text-muted-foreground">Impulsamos tu exito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
