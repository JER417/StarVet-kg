import Link from "next/link"
import { StarVetLogo } from "./starvet-logo"

const footerLinks = [
  {
    title: "Servicios",
    links: [
      { label: "Paginas Web", href: "#servicios" },
      { label: "Software Dedicado", href: "#servicios" },
      { label: "Marketing Digital", href: "#servicios" },
      { label: "Redes Sociales", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Proceso", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="#inicio" className="flex items-center gap-2 mb-4">
              <StarVetLogo className="h-9 w-9" />
              <span className="text-xl font-bold text-background">StarVet</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed max-w-sm">
              Consultora digital especializada en automatización y marketing estratégico para veterinarias que buscan crecer y modernizarse.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-background mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/50 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            {"2026 StarVet. Todos los derechos reservados."}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
