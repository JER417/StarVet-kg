// RUTA: app/dashboard/page.tsx  ← REEMPLAZA el existente

import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const name = user.user_metadata?.full_name?.split(" ")[0] || "Usuario"

  return (
    <div>
      {/* Banner */}
      <div
        className="rounded-2xl p-6 mb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #7c35cc 0%, #b06af5 100%)", boxShadow: "0 8px 32px rgba(124,53,204,0.25)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium mb-1">Panel de control</p>
          <h1
            className="text-white font-extrabold mb-2"
            style={{ fontFamily: "var(--font-outfit)", fontSize: "1.8rem" }}
          >
            ¡Hola, {name}! 🎉
          </h1>
          <p className="text-white/80 text-sm">
            Bienvenido a tu plataforma StarVet — gestiona tu clínica desde aquí.
          </p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <h2
        className="font-extrabold mb-4"
        style={{ fontFamily: "var(--font-outfit)", fontSize: "1.1rem", color: "#1a0a2e" }}
      >
        Acceso rápido
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/dashboard/pacientes"
          className="rounded-2xl p-5 border-2 transition-all duration-200 hover:border-purple-300 hover:shadow-md hover:-translate-y-1"
          style={{ background: "#fff", borderColor: "#e8d5ff", textDecoration: "none" }}
        >
          <div className="text-3xl mb-3">🐾</div>
          <p className="font-bold text-sm mb-0.5" style={{ color: "#1a0a2e", fontFamily: "var(--font-outfit)" }}>
            Pacientes
          </p>
          <p className="text-xs" style={{ color: "#6b5888" }}>
            Ver expedientes y registrar nuevos
          </p>
        </Link>

        {[
          { icon: "📅", label: "Citas",    desc: "Próximamente" },
          { icon: "📊", label: "Reportes", desc: "Próximamente" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl p-5 border-2"
            style={{ background: "#fff", borderColor: "#e8d5ff", opacity: 0.45 }}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="font-bold text-sm mb-0.5" style={{ color: "#1a0a2e", fontFamily: "var(--font-outfit)" }}>
              {item.label}
            </p>
            <p className="text-xs" style={{ color: "#6b5888" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}