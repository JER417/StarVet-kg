/* RUTA: app/layout.tsx */

import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'StarVet | Consultora Digital para Veterinarias',
  description:
    'Somos una consultora digital especializada en automatización y marketing estratégico para veterinarias que buscan crecer y modernizarse.',
}

export const viewport = {
  themeColor: '#7c35cc',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${jakarta.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}