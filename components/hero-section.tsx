/* RUTA: components/hero-section.tsx */

import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#faf8ff" }}
    >
      {/* Animated blob — fixed on the right half only */}
      <div
        className="animate-blob pointer-events-none absolute hidden lg:block"
        style={{
          right: "-80px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "600px",
          height: "600px",
          background: "linear-gradient(140deg, #7c35cc 0%, #b06af5 100%)",
          zIndex: 0,
        }}
      />

      {/* Soft purple tint on far right for mobile (no blob) */}
      <div
        className="lg:hidden pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(124,53,204,0.10) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Hero photo clipped — sits on top of blob */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 right-0 overflow-hidden"
        style={{
          width: "52%",
          clipPath: "ellipse(78% 100% at 82% 50%)",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/hero-vet.jpg"
          alt="Veterinaria con cachorro"
          fill
          className="object-cover object-top"
          style={{ mixBlendMode: "luminosity", opacity: 0.6 }}
          priority
        />
        {/* left-side fade so photo blends into background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #faf8ff 0%, rgba(250,248,255,0.4) 25%, transparent 55%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-16 w-full" style={{ zIndex: 2 }}>
        <div className="max-w-[620px]">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
            style={{ background: "#e8d5ff", color: "#5a1fa0" }}
          >
            <span>✦</span>
            <span>Consultora Digital para Veterinarias</span>
          </div>

          {/* Headline */}
          <h1
            className="font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
              color: "#1a0a2e",
            }}
          >
            Impulsa el crecimiento<br />
            de tu{" "}
            <span className="relative inline-block" style={{ color: "#7c35cc" }}>
              veterinaria
              <span
                className="absolute left-0 right-0"
                style={{
                  bottom: "-4px",
                  height: "5px",
                  background: "linear-gradient(to right, #7c35cc, #c084fc)",
                  borderRadius: "4px",
                }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg leading-relaxed mb-10"
            style={{
              color: "#6b5888",
              fontFamily: "var(--font-jakarta)",
              fontWeight: 300,
              maxWidth: "500px",
            }}
          >
            Somos una consultora digital especializada en automatización y
            marketing estratégico para veterinarias que buscan crecer y
            modernizarse.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-200"
              style={{
                background: "#7c35cc",
                boxShadow: "0 8px 28px rgba(124,53,204,0.35)",
              }}
            >
              Agenda tu consulta gratis
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="#servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full border-2 transition-all duration-200"
              style={{ color: "#7c35cc", borderColor: "#e8d5ff" }}
            >
              Ver servicios
            </Link>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {[
              { num: "50+", label: "Clientes" },
              { num: "8",   label: "Servicios" },
              { num: "100%",label: "Satisfacción" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full border"
                style={{
                  background: "#fff",
                  borderColor: "#e8d5ff",
                  boxShadow: "0 2px 12px rgba(124,53,204,0.08)",
                }}
              >
                <span
                  className="font-extrabold leading-none"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "1.4rem",
                    color: "#7c35cc",
                  }}
                >
                  {num}
                </span>
                <span className="text-sm font-medium" style={{ color: "#6b5888" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}