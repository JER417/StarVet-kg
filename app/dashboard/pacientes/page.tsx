// RUTA: app/dashboard/pacientes/page.tsx  ← ARCHIVO NUEVO
// Crea la carpeta: app/dashboard/pacientes/

import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { PacientesClient } from "../pacientes/pacientes-client"

export default async function PacientesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Busca o crea la clínica del usuario
  let { data: clinica } = await supabase
    .from("clinicas")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!clinica) {
    const { data: nueva } = await supabase
      .from("clinicas")
      .insert({ user_id: user.id, nombre: "Mi Clínica" })
      .select()
      .single()
    clinica = nueva
  }

  const { data: pacientes } = await supabase
    .from("pacientes")
    .select("*")
    .eq("clinica_id", clinica!.id)
    .order("created_at", { ascending: false })

  return <PacientesClient clinica={clinica!} pacientes={pacientes || []} userId={user.id} />
}