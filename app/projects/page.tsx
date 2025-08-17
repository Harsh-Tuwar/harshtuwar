import { Navigation } from "@/components/navigation"
import { ProjectsHero } from "@/components/projects-hero"
import { ProjectsGrid } from "@/components/projects-grid"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Explore my portfolio of web development projects including full-stack applications, React components, and modern web solutions.",
  url: "/projects",
})

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ProjectsHero />
      <ProjectsGrid />
    </main>
  )
}
