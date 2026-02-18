"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Mail, Phone, MapPin } from "lucide-react"

const WHATSAPP_NUMBER = "528114131469"

export function ContactSection() {
  const [name, setName] = useState("")
  const [clinic, setClinic] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const text = [
      `*Nuevo mensaje desde StarVet Web*`,
      ``,
      `*Nombre:* ${name}`,
      `*Clinica:* ${clinic}`,
      `*Email:* ${email}`,
      phone ? `*Telefono:* ${phone}` : null,
      ``,
      `*Mensaje:*`,
      message,
    ]
      .filter(Boolean)
      .join("\n")

    const encodedText = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contacto" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left info */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Contacto
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
              {"Hablemos del futuro de tu veterinaria"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Agenda una consulta gratuita y descubre como podemos ayudar a tu clinica a crecer con soluciones digitales a la medida.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">contacto@starvet.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +52 811 413 1469
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Ubicacion</p>
                  <p className="text-sm text-muted-foreground">Monterrey, Nuevo Leon, Mexico</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic">Nombre de tu clinica</Label>
                  <Input
                    id="clinic"
                    placeholder="Tu veterinaria"
                    required
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+52 (811) 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{"Como podemos ayudarte?"}</Label>
                <Textarea
                  id="message"
                  placeholder="Cuentanos sobre tu veterinaria y tus objetivos..."
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Enviar por WhatsApp
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
