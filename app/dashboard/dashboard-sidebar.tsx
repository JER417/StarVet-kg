// RUTA: components/dashboard/dashboard-sidebar.tsx  ← ARCHIVO NUEVO

"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { label: "Inicio",     icon: "🏠", href: "/dashboard"           },
  { label: "Pacientes",  icon: "🐾", href: "/dashboard/pacientes" },
  { label: "Citas",      icon: "📅", href: null                   },
  { label: "Reportes",   icon: "📊", href: null                   },
  { label: "Mi Plan",    icon: "💳", href: null                   },
]

export function DashboardSidebar({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const pathname        = usePathname()
  const router          = useRouter()
  const supabase        = createClient()

  const name   = user.user_metadata?.full_name?.split(" ")[0] || "Usuario"
  const avatar = user.user_metadata?.avatar_url

  async function logout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <aside
      className="flex flex-col flex-shrink-0 transition-all duration-300"
      style={{
        width:       open ? "220px" : "68px",
        background:  "#1a0a2e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)", minHeight: "68px" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-sm flex-shrink-0"
          style={{ background: "#7c35cc", fontFamily: "var(--font-outfit)" }}
        >
          S
        </div>
        {open && (
          <span className="font-extrabold text-white text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
            Star<span style={{ color: "#b06af5" }}>Vet</span>
          </span>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="mx-auto mt-3 mb-1 w-8 h-8 flex items-center justify-center rounded-lg"
        style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)" }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
        </svg>
      </button>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.href
            ? item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
            : false
          const disabled = !item.href

          if (disabled) {
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ color: "rgba(255,255,255,0.2)", cursor: "not-allowed" }}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {open && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)", fontSize: "0.6rem" }}>
                      Pronto
                    </span>
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: isActive ? "rgba(124,53,204,0.25)" : "transparent",
                color:      isActive ? "#e8d5ff" : "rgba(255,255,255,0.55)",
                borderLeft: isActive ? "3px solid #7c35cc" : "3px solid transparent",
              }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {open && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-2">
          {avatar ? (
            <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "#7c35cc" }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          {open && (
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">{name}</p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{user.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          {open && "Cerrar sesión"}
        </button>
      </div>
    </aside>
  )
}