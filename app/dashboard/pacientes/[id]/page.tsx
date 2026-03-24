// RUTA: app/dashboard/pacientes/[id]/page.tsx  ← ARCHIVO NUEVO
// Crea las carpetas: app/dashboard/pacientes/[id]/

import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { ExpedienteClient } from "../../expediente-client"

export default async function ExpedientePage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: paciente } = await supabase
    .from("pacientes")
    .select("*, clinicas!inner(user_id)")
    .eq("id", params.id)
    .single()

  if (!paciente || (paciente.clinicas as any).user_id !== user.id) notFound()

  const { data: consultas } = await supabase
    .from("consultas")
    .select("*, archivos(*)")
    .eq("paciente_id", params.id)
    .order("fecha", { ascending: false })

  return (
    <ExpedienteClient
      paciente={paciente}
      consultas={consultas || []}
      userId={user.id}
    />
  )
}