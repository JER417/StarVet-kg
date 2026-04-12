// RUTA: app/login/page.tsx

"use client"

import { useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#faf8ff" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl p-10 border-2 text-center"
        style={{
          background:   "#fff",
          borderColor:  "#e8d5ff",
          boxShadow:    "0 20px 60px rgba(124,53,204,0.10)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image
            src="/images/starvet-logo.png"
            alt="StarVet"
            width={44}
            height={44}
            className="object-contain"
          />
          <span
            className="text-2xl font-extrabold"
            style={{ fontFamily: "var(--font-outfit)", color: "#1a0a2e" }}
          >
            Star<span style={{ color: "#7c35cc" }}>Vet</span>
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-extrabold mb-2"
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize:   "1.75rem",
            color:      "#1a0a2e",
            lineHeight: 1.2,
          }}
        >
          Bienvenido a tu plataforma
        </h1>
        <p style={{ color: "#6b5888", fontSize: "0.95rem", marginBottom: "2.5rem", lineHeight: 1.6 }}>
          Gestiona tu clínica, pacientes y citas desde un solo lugar.
        </p>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background:   "#fff",
            borderColor:  "#e8d5ff",
            color:        "#1a0a2e",
          }}
        >
          {loading ? (
            <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#7c35cc" strokeWidth="4" />
              <path className="opacity-75" fill="#7c35cc" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <GoogleIcon />
          )}
          {loading ? "Conectando..." : "Continuar con Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: "#e8d5ff" }} />
          <span style={{ color: "#9f5fe0", fontSize: "0.75rem", fontWeight: 600 }}>SEGURO Y ENCRIPTADO</span>
          <div className="flex-1 h-px" style={{ background: "#e8d5ff" }} />
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: "🐾", label: "Expedientes" },
            { icon: "📅", label: "Citas" },
            { icon: "📊", label: "Reportes" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-xl py-3 px-2 text-center"
              style={{ background: "#f3eaff" }}
            >
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-xs font-semibold" style={{ color: "#7c35cc" }}>{label}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.75rem", color: "#9f5fe0" }}>
          Al continuar aceptas nuestros{" "}
          <a href="#" style={{ color: "#7c35cc", textDecoration: "underline" }}>Términos de Servicio</a>
          {" "}y{" "}
          <a href="#" style={{ color: "#7c35cc", textDecoration: "underline" }}>Política de Privacidad</a>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}