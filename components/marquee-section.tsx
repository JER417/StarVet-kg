/* RUTA: components/marquee-section.tsx  ← ARCHIVO NUEVO */

const items = [
    "Páginas Web",
    "Software a Medida",
    "Automatización",
    "Marketing Digital",
    "Diseño de Publicidad",
    "Redes Sociales",
    "Identidad de Marca",
    "Consultoría Gratis ✦",
  ]
  
  // Duplicamos para el loop infinito
  const all = [...items, ...items]
  
  export function MarqueeSection() {
    return (
      <div
        className="overflow-hidden py-3.5"
        style={{ background: "#7c35cc" }}
      >
        <div className="animate-marquee flex w-max">
          {all.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-8 text-xs font-bold uppercase tracking-widest whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.55)" }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    )
  }