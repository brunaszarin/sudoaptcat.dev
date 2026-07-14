import { Navbar } from '@/components/layout/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { LogoMarquee } from '@/components/sections/logo-marquee'
import { AboutSection } from '@/components/sections/about-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LogoMarquee />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}