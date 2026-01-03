import { Navigation } from "@/components/navigation"
import { AboutHero } from "@/components/about-hero"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { createMetadata, siteConfig } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "About",
  description:
    `Learn more about ${siteConfig.author.name}, a ${siteConfig.role} with expertise in React, Next.js, TypeScript, and modern web technologies.`,
  url: "/about",
})

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AboutHero />
      <SkillsSection />
      <ExperienceTimeline />
    </main>
  )
}
