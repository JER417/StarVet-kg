// RUTA: components/dashboard/dashboard-client.tsx  ← ARCHIVO NUEVO
// Crea la carpeta: components/dashboard/

"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type Section = "inicio" | "citas" | "expedientes" | "reportes" | "plan"

const navItems = [
  { id: "inicio",       icon: "🏠", label: "Inicio"      },
  { id: "citas",        icon: "📅", label: "Citas"       },
  { id: "expedientes",  icon: "🐾", label: "Expedientes" },
  { id: "reportes",     icon: "📊", label: "Reportes"    },
  { id: "plan",         icon: "💳", label: "Mi Plan"     },
] as const

export function DashboardClient({ user }: { user: User }) {
  const [active, setActive] = useState<Section>("inicio")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const name     = user.user_metadata?.full_name?.split(" ")[0] || "Usuario"
  const avatar   = user.user_metadata?.avatar_url
  const initials = name.charAt(0).toUpperCase()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#faf8ff", fontFamily: "var(--font-jakarta)" }}>

      {/* ── SIDEBAR ── */}
      <aside
        className="flex flex-col transition-all duration-300 flex-shrink-0"
        style={{
          width:       sidebarOpen ? "240px" : "72px",
          background:  "#1a0a2e",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)", minHeight: "72px" }}
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-sm"
            style={{ background: "#7c35cc", fontFamily: "var(--font-outfit)" }}
          >
            S
          </div>
          {sidebarOpen && (
            <span
              className="font-extrabold text-white text-lg whitespace-nowrap"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Star<span style={{ color: "#b06af5" }}>Vet</span>
            </span>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mx-auto mt-3 mb-1 flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
          style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)" }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen
              ? <path d="M15 18l-6-6 6-6"/>
              : <path d="M9 18l6-6-6-6"/>
            }
          </svg>
        </button>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id as Section)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left w-full"
                style={{
                  background: isActive ? "rgba(124,53,204,0.25)" : "transparent",
                  color:      isActive ? "#e8d5ff" : "rgba(255,255,255,0.45)",
                  borderLeft: isActive ? "3px solid #7c35cc" : "3px solid transparent",
                }}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User + logout */}
        <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 mb-2">
            {avatar ? (
              <img src={avatar} alt={name} className="w-9 h-9 rounded-full flex-shrink-0 object-cover" />
            ) : (
              <div
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "#7c35cc" }}
              >
                {initials}
              </div>
            )}
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-white text-sm font-semibold truncate">{name}</p>
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{user.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)" }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            {sidebarOpen && "Cerrar sesión"}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b"
          style={{
            background:   "rgba(250,248,255,0.95)",
            backdropFilter: "blur(10px)",
            borderColor:  "#e8d5ff",
          }}
        >
          <div>
            <h1
              className="font-extrabold"
              style={{ fontFamily: "var(--font-outfit)", fontSize: "1.3rem", color: "#1a0a2e" }}
            >
              {navItems.find(n => n.id === active)?.icon}{" "}
              {navItems.find(n => n.id === active)?.label}
            </h1>
            <p style={{ fontSize: "0.8rem", color: "#9f5fe0" }}>
              Bienvenido, {name} 👋
            </p>
          </div>
        </div>

        {/* Section content */}
        <div className="p-8">
          {active === "inicio"      && <InicioSection name={name} />}
          {active === "citas"       && <ComingSoon icon="📅" title="Agenda de Citas"       desc="Pronto podrás gestionar todas las citas de tu clínica aquí." />}
          {active === "expedientes" && <ComingSoon icon="🐾" title="Expedientes Clínicos"  desc="Historial completo de cada paciente, incluyendo imágenes y estudios." />}
          {active === "reportes"    && <ComingSoon icon="📊" title="Reportes y Métricas"   desc="Estadísticas de tu clínica, ingresos, pacientes y más." />}
          {active === "plan"        && <ComingSoon icon="💳" title="Mi Plan StarVet"       desc="Gestiona tu suscripción y accede a funciones premium." />}
        </div>
      </main>
    </div>
  )
}

/* ── Inicio Section ── */
function InicioSection({ name }: { name: string }) {
  const stats = [
    { icon: "📅", label: "Citas hoy",        value: "—", color: "#7c35cc" },
    { icon: "🐾", label: "Pacientes totales", value: "—", color: "#9f5fe0" },
    { icon: "📋", label: "Expedientes",       value: "—", color: "#b06af5" },
    { icon: "⭐", label: "Plan actual",        value: "Free", color: "#f59e0b" },
  ]

  return (
    <div>
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 mb-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7c35cc 0%, #b06af5 100%)",
          boxShadow:  "0 8px 32px rgba(124,53,204,0.30)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize:  "24px 24px",
          }}
        />
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium mb-1">Panel de control</p>
          <h2
            className="text-white font-extrabold mb-2"
            style={{ fontFamily: "var(--font-outfit)", fontSize: "1.6rem" }}
          >
            ¡Hola, {name}! 🎉
          </h2>
          <p className="text-white/80 text-sm">
            Tu plataforma StarVet está lista. Pronto podrás gestionar citas, expedientes y más.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5 border-2"
            style={{ background: "#fff", borderColor: "#e8d5ff" }}
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <p
              className="font-extrabold text-2xl mb-0.5"
              style={{ color: s.color, fontFamily: "var(--font-outfit)" }}
            >
              {s.value}
            </p>
            <p className="text-xs font-medium" style={{ color: "#6b5888" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h3
        className="font-extrabold mb-4"
        style={{ fontFamily: "var(--font-outfit)", color: "#1a0a2e", fontSize: "1.1rem" }}
      >
        Acciones rápidas
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: "📅", label: "Nueva cita",        desc: "Agenda una cita rápido" },
          { icon: "🐾", label: "Nuevo paciente",    desc: "Registra un animal" },
          { icon: "📋", label: "Ver expedientes",   desc: "Historial clínico" },
        ].map((a) => (
          <div
            key={a.label}
            className="rounded-2xl p-5 border-2 cursor-pointer transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            style={{ background: "#fff", borderColor: "#e8d5ff" }}
          >
            <div className="text-2xl mb-2">{a.icon}</div>
            <p className="font-bold text-sm mb-0.5" style={{ color: "#1a0a2e" }}>{a.label}</p>
            <p className="text-xs" style={{ color: "#6b5888" }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Coming Soon placeholder ── */
function ComingSoon({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="rounded-2xl p-12 text-center border-2"
      style={{ background: "#fff", borderColor: "#e8d5ff" }}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h2
        className="font-extrabold mb-2"
        style={{ fontFamily: "var(--font-outfit)", fontSize: "1.4rem", color: "#1a0a2e" }}
      >
        {title}
      </h2>
      <p style={{ color: "#6b5888", maxWidth: "360px", margin: "0 auto", lineHeight: 1.7 }}>
        {desc}
      </p>
      <div
        className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full text-sm font-bold"
        style={{ background: "#f3eaff", color: "#7c35cc" }}
      >
        🚧 Próximamente
      </div>
    </div>
  )
}