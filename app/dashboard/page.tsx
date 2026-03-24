// RUTA: app/dashboard/page.tsx  ← ARCHIVO NUEVO
// Crea la carpeta: app/dashboard/

import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { DashboardClient } from "../dashboard/dashboard-client"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return <DashboardClient user={user} />
}