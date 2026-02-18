"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

const testimonials = [
  {
    name: "Dra. Maria Gonzalez",
    clinic: "Clinica Veterinaria PetCare",
    text: "Desde que StarVet gestiona nuestro marketing digital, hemos triplicado las citas online. Su conocimiento del sector veterinario hace toda la diferencia.",
    rating: 5,
  },
  {
    name: "Dr. Carlos Ramirez",
    clinic: "Hospital Veterinario VidAnimal",
    text: "El software a medida que nos desarrollaron transformo completamente nuestra gestion de pacientes. Ahorramos horas cada semana.",
    rating: 5,
  },
  {
    name: "Dra. Ana Lopez",
    clinic: "Veterinaria Huellitas",
    text: "La automatizacion de recordatorios y citas redujo nuestras ausencias en un 70%. Excelente servicio y soporte constante.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3">
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground text-balance">
            {"Lo que dicen nuestros clientes"}
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`bg-primary-foreground/10 border-primary-foreground/15 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-primary-foreground/15 ${
                activeIndex === index ? "bg-primary-foreground/15 ring-1 ring-primary-foreground/20" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary-foreground/30 mb-4" />
                <p className="text-primary-foreground/85 leading-relaxed text-sm">
                  {`"${testimonial.text}"`}
                </p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary-foreground/80 text-primary-foreground/80" />
                  ))}
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-primary-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-primary-foreground/60">{testimonial.clinic}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/30"
              }`}
              aria-label={`Ver testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
