import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "528114131469"

export function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-secondary">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          Contacto
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
          {"Hablemos del futuro de tu veterinaria"}
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Agenda una consulta gratuita y descubre como podemos ayudar a tu clinica a crecer con soluciones digitales a la medida.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola StarVet, me interesa saber mas sobre sus servicios para mi veterinaria.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8">
              <MessageCircle className="h-5 w-5" />
              Escribenos por WhatsApp
            </Button>
          </a>

          {/* Email */}
          <a href="mailto:contacto@starvet.com" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-8">
              <Mail className="h-5 w-5" />
              Envianos un correo
            </Button>
          </a>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              +52 811 413 1469
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <a href="mailto:contacto@starvet.com" className="hover:text-primary transition-colors">
              contacto@starvet.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
