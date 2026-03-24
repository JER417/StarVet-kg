/* RUTA: app/page.tsx */

import { Navbar }         from "@/components/navbar"
import { HeroSection }    from "@/components/hero-section"
import { MarqueeSection } from "@/components/marquee-section"
import { ServicesSection} from "@/components/services-section"
import { AboutSection }   from "@/components/about-section"
import { ProcessSection } from "@/components/process-section"
import { CtaSection }     from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer }         from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </main>
  )
}