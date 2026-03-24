// RUTA: app/dashboard/layout.tsx  ← ARCHIVO NUEVO

import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { DashboardClient } from "../dashboard/dashboard-client"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#faf8ff" }}>
      <DashboardSidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

// Re-export del sidebar como server component wrapper
import type { User } from "@supabase/supabase-js"
import { DashboardClient as Sidebar } from "../dashboard/dashboard-client"

function DashboardSidebar({ user }: { user: User }) {
  return <Sidebar user={user} />
}