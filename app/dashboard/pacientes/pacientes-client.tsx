// RUTA: components/dashboard/pacientes-client.tsx  ← ARCHIVO NUEVO

"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type Paciente = {
  id: string
  nombre: string
  especie: string
  raza?: string
  edad_anios?: number
  edad_meses?: number
  sexo?: string
  color?: string
  peso_kg?: number
  nombre_dueno: string
  telefono_dueno?: string
  email_dueno?: string
  notas?: string
  foto_url?: string
  created_at: string
}

type Clinica = { id: string; nombre: string }

const ESPECIES = ["Perro", "Gato", "Ave", "Conejo", "Reptil", "Otro"]

export function PacientesClient({
  clinica, pacientes: inicial, userId,
}: {
  clinica: Clinica
  pacientes: Paciente[]
  userId: string
}) {
  const [pacientes, setPacientes]   = useState<Paciente[]>(inicial)
  const [showForm, setShowForm]     = useState(false)
  const [selected, setSelected]     = useState<Paciente | null>(null)
  const [search, setSearch]         = useState("")
  const [saving, setSaving]         = useState(false)
  const [fotoFile, setFotoFile]     = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const filtered = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.nombre_dueno.toLowerCase().includes(search.toLowerCase()) ||
    p.especie.toLowerCase().includes(search.toLowerCase())
  )

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const form = e.currentTarget
    const get  = (id: string) => (form.elements.namedItem(id) as HTMLInputElement)?.value?.trim() || null

    let foto_url = null
    if (fotoFile) {
      const ext  = fotoFile.name.split(".").pop()
      const path = `${userId}/${Date.now()}.${ext}`
      const { data: up } = await supabase.storage
        .from("expedientes")
        .upload(path, fotoFile, { upsert: true })
      if (up) {
        const { data: url } = supabase.storage.from("expedientes").getPublicUrl(up.path)
        foto_url = url.publicUrl
      }
    }

    const payload = {
      clinica_id:      clinica.id,
      nombre:          get("nombre")!,
      especie:         get("especie")!,
      raza:            get("raza"),
      edad_anios:      parseInt(get("edad_anios") || "0") || null,
      edad_meses:      parseInt(get("edad_meses") || "0") || null,
      sexo:            get("sexo"),
      color:           get("color"),
      peso_kg:         parseFloat(get("peso_kg") || "0") || null,
      nombre_dueno:    get("nombre_dueno")!,
      telefono_dueno:  get("telefono_dueno"),
      email_dueno:     get("email_dueno"),
      notas:           get("notas"),
      ...(foto_url ? { foto_url } : {}),
    }

    const { data, error } = await supabase
      .from("pacientes")
      .insert(payload)
      .select()
      .single()

    if (!error && data) {
      setPacientes(prev => [data, ...prev])
      setShowForm(false)
      setFotoFile(null)
      setFotoPreview(null)
    }
    setSaving(false)
  }

  return (
    <div style={{ fontFamily: "var(--font-jakarta)" }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="font-extrabold"
            style={{ fontFamily: "var(--font-outfit)", fontSize: "1.5rem", color: "#1a0a2e" }}
          >
            🐾 Pacientes
          </h1>
          <p style={{ color: "#6b5888", fontSize: "0.85rem" }}>
            {pacientes.length} paciente{pacientes.length !== 1 ? "s" : ""} registrado{pacientes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: "#7c35cc", boxShadow: "0 4px 16px rgba(124,53,204,0.3)" }}
        >
          + Nuevo paciente
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" fill="none" stroke="#9f5fe0" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar por nombre, dueño o especie..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "#fff", border: "1.5px solid #e8d5ff", color: "#1a0a2e" }}
        />
      </div>

      {/* Grid de pacientes */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border-2 border-dashed" style={{ borderColor: "#e8d5ff" }}>
          <div className="text-5xl mb-3">🐾</div>
          <p className="font-bold mb-1" style={{ color: "#1a0a2e" }}>Sin pacientes aún</p>
          <p style={{ color: "#6b5888", fontSize: "0.875rem" }}>Agrega tu primer paciente con el botón de arriba</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => router.push(`/dashboard/pacientes/${p.id}`)}
              className="rounded-2xl border-2 p-5 cursor-pointer transition-all hover:border-purple-300 hover:shadow-lg hover:-translate-y-1"
              style={{ background: "#fff", borderColor: "#e8d5ff" }}
            >
              <div className="flex items-center gap-3 mb-3">
                {p.foto_url ? (
                  <img src={p.foto_url} alt={p.nombre} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "#f3eaff" }}
                  >
                    {p.especie === "Perro" ? "🐕" : p.especie === "Gato" ? "🐈" : p.especie === "Ave" ? "🐦" : "🐾"}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="font-bold truncate" style={{ color: "#1a0a2e" }}>{p.nombre}</p>
                  <p className="text-xs" style={{ color: "#9f5fe0" }}>{p.especie}{p.raza ? ` · ${p.raza}` : ""}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs" style={{ color: "#6b5888" }}>
                  👤 {p.nombre_dueno}
                </p>
                {p.peso_kg && (
                  <p className="text-xs" style={{ color: "#6b5888" }}>⚖️ {p.peso_kg} kg</p>
                )}
                {(p.edad_anios || p.edad_meses) && (
                  <p className="text-xs" style={{ color: "#6b5888" }}>
                    🎂 {p.edad_anios ? `${p.edad_anios} año${p.edad_anios !== 1 ? "s" : ""}` : ""}
                    {p.edad_anios && p.edad_meses ? " y " : ""}
                    {p.edad_meses ? `${p.edad_meses} mes${p.edad_meses !== 1 ? "es" : ""}` : ""}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal nuevo paciente */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,10,46,0.6)", backdropFilter: "blur(4px)" }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-8 overflow-y-auto"
            style={{ background: "#fff", maxHeight: "90vh" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="font-extrabold"
                style={{ fontFamily: "var(--font-outfit)", fontSize: "1.3rem", color: "#1a0a2e" }}
              >
                Nuevo paciente
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors hover:bg-purple-50"
                style={{ color: "#6b5888" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Foto */}
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ background: "#f3eaff", border: "2px dashed #e8d5ff" }}
                >
                  {fotoPreview
                    ? <img src={fotoPreview} alt="preview" className="w-full h-full object-cover" />
                    : <span className="text-3xl">🐾</span>
                  }
                </div>
                <div>
                  <label
                    className="cursor-pointer text-sm font-bold px-4 py-2 rounded-full transition-colors hover:bg-purple-100"
                    style={{ color: "#7c35cc", background: "#f3eaff" }}
                  >
                    Subir foto
                    <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                  </label>
                  <p className="text-xs mt-1" style={{ color: "#9f5fe0" }}>JPG, PNG — máx 5MB</p>
                </div>
              </div>

              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7c35cc" }}>Datos del animal</p>
              <div className="grid grid-cols-2 gap-3">
                <Field id="nombre"      label="Nombre *"   placeholder="Rex"        required />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b5888" }}>Especie *</label>
                  <select name="especie" id="especie" required className="rounded-xl px-3 py-2.5 text-sm outline-none appearance-none" style={{ background: "#faf8ff", border: "1.5px solid #e8d5ff", color: "#1a0a2e" }}>
                    <option value="">Selecciona</option>
                    {ESPECIES.map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field id="raza"  label="Raza"   placeholder="Labrador" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b5888" }}>Sexo</label>
                  <select name="sexo" id="sexo" className="rounded-xl px-3 py-2.5 text-sm outline-none appearance-none" style={{ background: "#faf8ff", border: "1.5px solid #e8d5ff", color: "#1a0a2e" }}>
                    <option value="">No especificado</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field id="edad_anios" label="Años"    placeholder="2" type="number" />
                <Field id="edad_meses" label="Meses"   placeholder="6" type="number" />
                <Field id="peso_kg"    label="Peso (kg)" placeholder="8.5" type="number" />
              </div>
              <Field id="color" label="Color / pelaje" placeholder="Café con manchas blancas" />

              <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: "#7c35cc" }}>Datos del dueño</p>
              <Field id="nombre_dueno"   label="Nombre del dueño *" placeholder="Juan Pérez" required />
              <div className="grid grid-cols-2 gap-3">
                <Field id="telefono_dueno" label="Teléfono"  placeholder="+52 ..." type="tel" />
                <Field id="email_dueno"    label="Email"     placeholder="juan@email.com" type="email" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b5888" }}>Notas adicionales</label>
                <textarea
                  id="notas" name="notas" rows={3}
                  placeholder="Alergias, condiciones previas, notas importantes..."
                  className="rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                  style={{ background: "#faf8ff", border: "1.5px solid #e8d5ff", color: "#1a0a2e" }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-full text-sm font-bold border-2 transition-colors hover:bg-purple-50"
                  style={{ borderColor: "#e8d5ff", color: "#6b5888" }}
                >
                  Cancelar
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#7c35cc" }}
                >
                  {saving ? "Guardando..." : "Guardar paciente"}
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