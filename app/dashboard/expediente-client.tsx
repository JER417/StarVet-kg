// RUTA: components/dashboard/expediente-client.tsx  ← ARCHIVO NUEVO

"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type Archivo  = { id: string; nombre: string; url: string; tipo?: string }
type Consulta = {
  id: string; fecha: string; motivo: string; diagnostico?: string
  tratamiento?: string; medicamentos?: string; peso_kg?: number
  temperatura?: number; notas?: string; archivos: Archivo[]
}
type Paciente = {
  id: string; nombre: string; especie: string; raza?: string
  edad_anios?: number; edad_meses?: number; sexo?: string
  peso_kg?: number; color?: string; nombre_dueno: string
  telefono_dueno?: string; foto_url?: string
}

export function ExpedienteClient({
  paciente, consultas: inicial, userId,
}: {
  paciente: Paciente; consultas: Consulta[]; userId: string
}) {
  const [consultas, setConsultas]   = useState<Consulta[]>(inicial)
  const [showForm, setShowForm]     = useState(false)
  const [saving, setSaving]         = useState(false)
  const [archivos, setArchivos]     = useState<File[]>([])
  const [lightbox, setLightbox]     = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  function handleArchivos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setArchivos(prev => [...prev, ...files])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const form = e.currentTarget
    const get  = (id: string) => (form.elements.namedItem(id) as HTMLInputElement)?.value?.trim() || null

    // 1. Crea la consulta
    const { data: consulta, error } = await supabase
      .from("consultas")
      .insert({
        paciente_id:   paciente.id,
        motivo:        get("motivo")!,
        diagnostico:   get("diagnostico"),
        tratamiento:   get("tratamiento"),
        medicamentos:  get("medicamentos"),
        peso_kg:       parseFloat(get("peso_kg") || "0") || null,
        temperatura:   parseFloat(get("temperatura") || "0") || null,
        notas:         get("notas"),
      })
      .select()
      .single()

    if (error || !consulta) { setSaving(false); return }

    // 2. Sube archivos
    const archivosGuardados: Archivo[] = []
    for (const file of archivos) {
      const ext  = file.name.split(".").pop()
      const path = `${userId}/${paciente.id}/${consulta.id}/${Date.now()}-${file.name}`
      const { data: up } = await supabase.storage
        .from("expedientes")
        .upload(path, file, { upsert: true })

      if (up) {
        const { data: urlData } = supabase.storage.from("expedientes").getPublicUrl(up.path)
        const { data: arch } = await supabase
          .from("archivos")
          .insert({
            consulta_id: consulta.id,
            paciente_id: paciente.id,
            nombre:      file.name,
            url:         urlData.publicUrl,
            tipo:        file.type,
          })
          .select()
          .single()
        if (arch) archivosGuardados.push(arch)
      }
    }

    setConsultas(prev => [{ ...consulta, archivos: archivosGuardados }, ...prev])
    setShowForm(false)
    setArchivos([])
    setSaving(false)
  }

  const especieEmoji = paciente.especie === "Perro" ? "🐕"
    : paciente.especie === "Gato" ? "🐈"
    : paciente.especie === "Ave" ? "🐦" : "🐾"

  return (
    <div style={{ fontFamily: "var(--font-jakarta)" }}>

      {/* Back */}
      <button
        onClick={() => router.push("/dashboard/pacientes")}
        className="flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:text-purple-600"
        style={{ color: "#6b5888" }}
      >
        ← Volver a pacientes
      </button>

      {/* Perfil del paciente */}
      <div
        className="rounded-2xl p-6 border-2 mb-6 flex flex-wrap gap-6 items-start"
        style={{ background: "#fff", borderColor: "#e8d5ff" }}
      >
        <div className="flex items-center gap-4">
          {paciente.foto_url ? (
            <img src={paciente.foto_url} alt={paciente.nombre}
              className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 cursor-pointer"
              onClick={() => setLightbox(paciente.foto_url!)}
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ background: "#f3eaff" }}>
              {especieEmoji}
            </div>
          )}
          <div>
            <h1
              className="font-extrabold"
              style={{ fontFamily: "var(--font-outfit)", fontSize: "1.5rem", color: "#1a0a2e" }}
            >
              {paciente.nombre}
            </h1>
            <p style={{ color: "#9f5fe0", fontSize: "0.9rem" }}>
              {paciente.especie}{paciente.raza ? ` · ${paciente.raza}` : ""}
              {paciente.sexo ? ` · ${paciente.sexo}` : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 flex-1">
          {[
            { label: "Dueño",  value: paciente.nombre_dueno },
            { label: "Teléfono", value: paciente.telefono_dueno },
            { label: "Peso",   value: paciente.peso_kg ? `${paciente.peso_kg} kg` : null },
            { label: "Edad",   value: paciente.edad_anios ? `${paciente.edad_anios} año(s)` : null },
            { label: "Color",  value: paciente.color },
          ].filter(i => i.value).map(item => (
            <div key={item.label} className="rounded-xl px-3 py-2" style={{ background: "#f3eaff" }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#9f5fe0" }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: "#1a0a2e" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultas header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="font-extrabold"
          style={{ fontFamily: "var(--font-outfit)", fontSize: "1.2rem", color: "#1a0a2e" }}
        >
          📋 Historial de consultas ({consultas.length})
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: "#7c35cc", boxShadow: "0 4px 14px rgba(124,53,204,0.3)" }}
        >
          + Nueva consulta
        </button>
      </div>

      {/* Lista de consultas */}
      {consultas.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border-2 border-dashed" style={{ borderColor: "#e8d5ff" }}>
          <div className="text-4xl mb-3">📋</div>
          <p className="font-bold mb-1" style={{ color: "#1a0a2e" }}>Sin consultas aún</p>
          <p style={{ color: "#6b5888", fontSize: "0.875rem" }}>Registra la primera consulta de {paciente.nombre}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {consultas.map(c => (
            <div key={c.id} className="rounded-2xl border-2 p-5" style={{ background: "#fff", borderColor: "#e8d5ff" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold" style={{ color: "#1a0a2e" }}>{c.motivo}</p>
                  <p className="text-xs" style={{ color: "#9f5fe0" }}>
                    {new Date(c.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex gap-2">
                  {c.peso_kg && (
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#f3eaff", color: "#7c35cc" }}>
                      ⚖️ {c.peso_kg} kg
                    </span>
                  )}
                  {c.temperatura && (
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>
                      🌡️ {c.temperatura}°C
                    </span>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                {c.diagnostico && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#6b5888" }}>Diagnóstico</p>
                    <p className="text-sm" style={{ color: "#1a0a2e" }}>{c.diagnostico}</p>
                  </div>
                )}
                {c.tratamiento && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#6b5888" }}>Tratamiento</p>
                    <p className="text-sm" style={{ color: "#1a0a2e" }}>{c.tratamiento}</p>
                  </div>
                )}
                {c.medicamentos && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#6b5888" }}>Medicamentos</p>
                    <p className="text-sm" style={{ color: "#1a0a2e" }}>{c.medicamentos}</p>
                  </div>
                )}
              </div>

              {c.notas && (
                <p className="text-sm p-3 rounded-xl mb-3" style={{ background: "#faf8ff", color: "#6b5888" }}>
                  📝 {c.notas}
                </p>
              )}

              {/* Imágenes / archivos */}
              {c.archivos?.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6b5888" }}>
                    Archivos ({c.archivos.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {c.archivos.map(a => (
                      a.tipo?.startsWith("image/") ? (
                        <img
                          key={a.id}
                          src={a.url}
                          alt={a.nombre}
                          onClick={() => setLightbox(a.url)}
                          className="w-20 h-20 rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity border-2"
                          style={{ borderColor: "#e8d5ff" }}
                        />
                      ) : (
                        <a
                          key={a.id}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-purple-50"
                          style={{ background: "#f3eaff", color: "#7c35cc" }}
                        >
                          📄 {a.nombre}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Vista completa" className="max-w-full max-h-full rounded-2xl object-contain" />
        </div>
      )}

      {/* Modal nueva consulta */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,10,46,0.6)", backdropFilter: "blur(4px)" }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div className="w-full max-w-2xl rounded-3xl p-8 overflow-y-auto" style={{ background: "#fff", maxHeight: "90vh" }}>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="font-extrabold"
                style={{ fontFamily: "var(--font-outfit)", fontSize: "1.3rem", color: "#1a0a2e" }}
              >
                Nueva consulta — {paciente.nombre}
              </h2>
              <button onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-purple-50"
                style={{ color: "#6b5888" }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field id="motivo" label="Motivo de consulta *" placeholder="Revisión general, vacuna, herida..." required />
              <Field id="diagnostico"  label="Diagnóstico"   placeholder="Otitis media, fractura..." />
              <Field id="tratamiento"  label="Tratamiento"   placeholder="Antibióticos por 7 días..." />
              <Field id="medicamentos" label="Medicamentos"  placeholder="Amoxicilina 250mg, Ibuprofeno..." />
              <div className="grid grid-cols-2 gap-3">
                <Field id="peso_kg"     label="Peso (kg)"    placeholder="8.5"  type="number" />
                <Field id="temperatura" label="Temperatura °C" placeholder="38.5" type="number" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b5888" }}>Notas</label>
                <textarea id="notas" name="notas" rows={3}
                  placeholder="Observaciones adicionales..."
                  className="rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                  style={{ background: "#faf8ff", border: "1.5px solid #e8d5ff", color: "#1a0a2e" }}
                />
              </div>

              {/* Upload archivos */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b5888" }}>
                  Imágenes / Rayos X / Documentos
                </label>
                <label
                  className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border-2 border-dashed cursor-pointer transition-colors hover:bg-purple-50"
                  style={{ borderColor: "#e8d5ff" }}
                >
                  <span className="text-2xl">📎</span>
                  <p className="text-sm font-medium" style={{ color: "#7c35cc" }}>Haz clic o arrastra archivos</p>
                  <p className="text-xs" style={{ color: "#9f5fe0" }}>Imágenes, PDFs, DICOM — máx 20MB c/u</p>
                  <input type="file" multiple accept="image/*,.pdf,.dcm" onChange={handleArchivos} className="hidden" />
                </label>
                {archivos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {archivos.map((f, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        style={{ background: "#f3eaff", color: "#7c35cc" }}>
                        📄 {f.name}
                        <button type="button" onClick={() => setArchivos(prev => prev.filter((_, j) => j !== i))}
                          className="ml-1 opacity-60 hover:opacity-100">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-full text-sm font-bold border-2 transition-colors hover:bg-purple-50"
                  style={{ borderColor: "#e8d5ff", color: "#6b5888" }}>
                  Cancelar
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#7c35cc" }}>
                  {saving ? "Guardando..." : "Guardar consulta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ id, label, placeholder, type = "text", required }: {
  id: string; label: string; placeholder: string; type?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b5888" }}>
        {label}
      </label>
      <input
        id={id} name={id} type={type} placeholder={placeholder} required={required}
        className="rounded-xl px-3 py-2.5 text-sm outline-none"
        style={{ background: "#faf8ff", border: "1.5px solid #e8d5ff", color: "#1a0a2e" }}
      />
    </div>
  )
}