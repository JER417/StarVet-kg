// RUTA: app/dashboard/layout.tsx  ← REEMPLAZA el existente (o créalo si no existe)

import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { DashboardSidebar } from "../dashboard/dashboard-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#faf8ff", fontFamily: "var(--font-jakarta)" }}>
      <DashboardSidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}