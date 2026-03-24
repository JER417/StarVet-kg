/* RUTA: components/contact-section.tsx */
"use client"

import { useState } from "react"

const WA_NUMBER = "528145977320"
const WA_MSG    = encodeURIComponent(
  "Hola StarVet, me interesa saber más sobre sus servicios para mi veterinaria."
)

export function ContactSection() {
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form     = e.currentTarget
    const nombre   = (form.elements.namedItem("nombre")   as HTMLInputElement).value.trim()
    const clinica  = (form.elements.namedItem("clinica")  as HTMLInputElement).value.trim()
    const email    = (form.elements.namedItem("email")    as HTMLInputElement).value.trim()
    const telefono = (form.elements.namedItem("telefono") as HTMLInputElement).value.trim()
    const servicio = (form.elements.namedItem("servicio") as HTMLSelectElement).value
    const mensaje  = (form.elements.namedItem("mensaje")  as HTMLTextAreaElement).value.trim()

    if (!nombre || !email) return

    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ nombre, clinica, email, telefono, servicio, mensaje }),
      })

      if (res.ok) {
        setStatus("sent")
      } else {
        const data = await res.json()
        setErrorMsg(data.error || "Error desconocido.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("No se pudo conectar. Intenta de nuevo.")
      setStatus("error")
    }
  }

  return (
    <section id="contacto" className="py-24" style={{ background: "#faf8ff" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left — info ── */}
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ background: "#f3eaff", color: "#7c35cc" }}
            >
              ✦ Contacto
            </span>

            <h2
              className="font-extrabold tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize:   "clamp(1.9rem, 4vw, 3rem)",
                color:      "#1a0a2e",
                lineHeight: 1.1,
              }}
            >
              Hablemos del futuro<br />
              de tu{" "}
              <span style={{ color: "#7c35cc" }}>veterinaria</span>
            </h2>

            <p style={{ color: "#6b5888", lineHeight: 1.76, marginBottom: "2rem" }}>
              Agenda una consulta gratuita y descubre cómo podemos ayudar a tu
              clínica a crecer con soluciones digitales a la medida.
            </p>

            {/* Contact cards */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                {
                  icon: <PhoneIcon />,
                  label: "WhatsApp",
                  value: "+52 814 597 7320",
                  href: `https://wa.me/${WA_NUMBER}`,
                },
                {
                  icon: <MailIcon />,
                  label: "Email",
                  value: "starvet.contacto@gmail.com",
                  href: "mailto:starvet.contacto@gmail.com",
                },
                {
                  icon: <InstaIcon />,
                  label: "Instagram",
                  value: "@starvet.consultora",
                  href: "https://instagram.com/starvet.consultora",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 hover:border-purple-400 hover:shadow-md"
                  style={{ background: "#fff", borderColor: "#e8d5ff", textDecoration: "none" }}
                >
                  <div
                    className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ background: "#f3eaff" }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#9f5fe0" }}>
                      {c.label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#1a0a2e" }}>
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "#25d166", boxShadow: "0 8px 24px rgba(37,209,102,0.30)" }}
            >
              <WaIcon />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* ── Right — form ── */}
          <div
            className="rounded-3xl p-8 border-2"
            style={{
              background:  "#fff",
              borderColor: "#e8d5ff",
              boxShadow:   "0 8px 40px rgba(124,53,204,0.08)",
            }}
          >
            <h3
              className="font-extrabold mb-1"
              style={{ fontFamily: "var(--font-outfit)", fontSize: "1.35rem", color: "#1a0a2e" }}
            >
              ¡Cuéntanos sobre tu clínica! 🐾
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#6b5888", marginBottom: "1.5rem" }}>
              Te respondemos en menos de 24 horas.
            </p>

            {/* SUCCESS */}
            {status === "sent" && (
              <div className="text-center py-12 rounded-2xl" style={{ background: "#f3eaff" }}>
                <div className="text-4xl mb-3">✅</div>
                <p className="font-bold" style={{ color: "#7c35cc", fontSize: "1.1rem" }}>
                  ¡Mensaje enviado!
                </p>
                <p style={{ color: "#6b5888", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  Revisa tu Gmail — te respondemos pronto.
                </p>
              </div>
            )}

            {/* FORM */}
            {status !== "sent" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="nombre"  label="Tu nombre"           type="text"  placeholder="Nombre completo"      required />
                  <Field id="clinica" label="Clínica veterinaria" type="text"  placeholder="Nombre de tu clínica" />
                </div>
                <Field id="email"    label="Correo electrónico"   type="email" placeholder="tu@email.com"         required />
                <Field id="telefono" label="WhatsApp / Teléfono"  type="tel"   placeholder="+52 ..." />

                {/* Select */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#6b5888" }}
                  >
                    ¿Qué servicio te interesa?
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    className="rounded-xl px-4 py-3 text-sm outline-none appearance-none"
                    style={{ background: "#faf8ff", border: "1.5px solid #e8d5ff", color: "#2d1a4a" }}
                  >
                    <option value="">Selecciona un servicio</option>
                    <option>Página Web</option>
                    <option>Software Dedicado</option>
                    <option>Automatización de Procesos</option>
                    <option>Marketing Digital</option>
                    <option>Redes Sociales</option>
                    <option>Diseño de Publicidad</option>
                    <option>Creación de Marca</option>
                    <option>Varios / No sé por dónde empezar</option>
                  </select>
                </div>

                {/* Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#6b5888" }}
                  >
                    ¿Cuál es tu mayor reto hoy?
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Cuéntanos sobre tu clínica y qué quieres mejorar..."
                    className="rounded-xl px-4 py-3 text-sm outline-none resize-y"
                    style={{
                      background: "#faf8ff",
                      border:     "1.5px solid #e8d5ff",
                      color:      "#2d1a4a",
                      minHeight:  "110px",
                    }}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-sm text-center" style={{ color: "#e53e3e" }}>{errorMsg}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "#7c35cc", boxShadow: "0 8px 24px rgba(124,53,204,0.30)" }}
                >
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Helpers ── */
function Field({ id, label, type, placeholder, required }: {
  id: string; label: string; type: string; placeholder: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b5888" }}>
        {label}{required && <span style={{ color: "#7c35cc" }}> *</span>}
      </label>
      <input
        id={id} name={id} type={type} placeholder={placeholder} required={required}
        className="rounded-xl px-4 py-3 text-sm outline-none"
        style={{ background: "#faf8ff", border: "1.5px solid #e8d5ff", color: "#2d1a4a" }}
      />
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="#7c35cc" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="#7c35cc" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function InstaIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="#7c35cc" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}