/* RUTA: components/footer.tsx */
"use client"

import Link from "next/link"
import Image from "next/image"

const footerLinks = [
  {
    title: "Servicios",
    links: [
      { label: "Páginas Web",       href: "#servicios" },
      { label: "Software Dedicado", href: "#servicios" },
      { label: "Marketing Digital", href: "#servicios" },
      { label: "Redes Sociales",    href: "#servicios" },
      { label: "Creación de Marca", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Proceso",  href: "#proceso"  },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "+52 814 597 7320",          href: "https://wa.me/528145977320" },
      { label: "starvet.contacto@gmail.com", href: "mailto:starvet.contacto@gmail.com" },
      { label: "@starvet.consultora",        href: "https://instagram.com/starvet.consultora" },
    ],
  },
]

export function Footer() {
  return (
    <footer style={{ background: "#120720" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="#inicio" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/starvet-logo.png"
                alt="StarVet Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span
                className="text-xl font-extrabold"
                style={{ fontFamily: "var(--font-outfit)", color: "#fff" }}
              >
                Star<span style={{ color: "#b06af5" }}>Vet</span>
              </span>
            </Link>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.72, maxWidth: "260px" }}>
              Consultora digital especializada en automatización y marketing
              estratégico para veterinarias que buscan crecer y modernizarse.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#b06af5")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.28)" }}>
            © 2026 StarVet. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Política de Privacidad", "Términos de Servicio"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.28)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}