import { HeroSection } from '@/components/sections/hero-section'
import { LogoMarquee } from '@/components/sections/logo-marquee'
import { AboutSection } from '@/components/sections/about-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { BlogSection } from '@/components/sections/blog-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LogoMarquee />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </main>
  )
}
