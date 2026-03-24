// RUTA: app/api/contact/route.ts  ← ARCHIVO NUEVO

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { nombre, clinica, email, telefono, servicio, mensaje } = await req.json()

    // Validación básica
    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Nombre y correo son requeridos." },
        { status: 400 }
      )
    }

    // Transporter con Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,  // tu correo
        pass: process.env.GMAIL_PASS,  // contraseña de aplicación
      },
    })

    await transporter.sendMail({
      from:    `"StarVet Web" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER, // llega a tu propio correo
      replyTo: email,                  // al responder va al cliente
      subject: `⭐ Nuevo contacto de ${nombre} — StarVet`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#faf8ff;border-radius:12px;overflow:hidden;">
          <!-- Header -->
          <div style="background:#7c35cc;padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:22px;">⭐ Nuevo mensaje en StarVet</h1>
            <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:14px;">Alguien llenó el formulario de contacto</p>
          </div>

          <!-- Body -->
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row("👤 Nombre",      nombre)}
              ${row("🏥 Clínica",     clinica  || "—")}
              ${row("📧 Email",       email)}
              ${row("📱 Teléfono",    telefono || "—")}
              ${row("🛠️ Servicio",    servicio || "—")}
            </table>

            ${mensaje ? `
              <div style="margin-top:24px;">
                <p style="font-size:13px;font-weight:700;color:#6b5888;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Mensaje</p>
                <div style="background:#fff;border:1.5px solid #e8d5ff;border-radius:10px;padding:16px;font-size:15px;color:#2d1a4a;line-height:1.65;">
                  ${mensaje}
                </div>
              </div>
            ` : ""}

            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e8d5ff;">
              <a href="mailto:${email}"
                style="display:inline-block;background:#7c35cc;color:#fff;padding:12px 28px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:700;">
                Responder a ${nombre}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f3eaff;padding:16px 32px;text-align:center;">
            <p style="color:#9f5fe0;font-size:12px;margin:0;">StarVet — Consultora Digital para Veterinarias</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error enviando email:", err)
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    )
  }
}

// Helper para filas de la tabla
function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;font-size:13px;font-weight:700;color:#6b5888;text-transform:uppercase;letter-spacing:0.06em;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;font-size:15px;color:#2d1a4a;">${value}</td>
    </tr>
    <tr><td colspan="2" style="border-bottom:1px solid #e8d5ff;"></td></tr>
  `
}