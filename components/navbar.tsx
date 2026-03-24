/* RUTA: components/navbar.tsx */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#inicio",    label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros",  label: "Nosotros" },
  { href: "#proceso",   label: "Proceso" },
  { href: "#contacto",  label: "Contacto" },
]

export function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(124,53,204,0.10)" : "none",
        borderBottom: scrolled ? "1px solid #e8d5ff" : "none",
        padding: scrolled ? "0.9rem 0" : "1.4rem 0",
      }}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="#inicio" className="flex items-center gap-2">
          <Image
            src="/images/starvet-logo.png"
            alt="StarVet Logo"
            width={38}
            height={38}
            className="object-contain"
          />
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-outfit)", color: "#1a0a2e" }}
          >
            Star<span style={{ color: "#7c35cc" }}>Vet</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "#6b5888" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#7c35cc")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6b5888")}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contacto"
              className="text-sm font-semibold text-white px-5 py-2.5 transition-all duration-200"
              style={{
                background: "#7c35cc",
                borderRadius: "50px",
                boxShadow: "0 4px 16px rgba(124,53,204,0.30)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#5a1fa0"
                ;(e.currentTarget as HTMLElement).style.transform  = "translateY(-1px)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#7c35cc"
                ;(e.currentTarget as HTMLElement).style.transform  = "translateY(0)"
              }}
            >
              Solicitar consulta
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#1a0a2e" }}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden mx-4 mt-2 rounded-2xl p-4 border"
          style={{
            background: "rgba(255,255,255,0.97)",
            borderColor: "#e8d5ff",
            boxShadow: "0 8px 32px rgba(124,53,204,0.12)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors"
              style={{ color: "#6b5888" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color      = "#7c35cc"
                ;(e.currentTarget as HTMLElement).style.background = "#f3eaff"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color      = "#6b5888"
                ;(e.currentTarget as HTMLElement).style.background = "transparent"
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-4 pt-3">
            <Link
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm font-semibold text-white py-3 rounded-full transition-all"
              style={{ background: "#7c35cc" }}
            >
              Solicitar consulta
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}