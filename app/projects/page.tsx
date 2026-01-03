import { redirect } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ProjectsHero } from "@/components/projects-hero"
import { ProjectsGrid } from "@/components/projects-grid"
import { createMetadata, siteConfig } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Explore my portfolio of web development projects including full-stack applications, React components, and modern web solutions.",
  url: "/projects",
})

export default function ProjectsPage() {
  // Redirect to home if projects are hidden
  if (!siteConfig.showProjects) {
    redirect("/")
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <ProjectsHero />
      <ProjectsGrid />
    </main>
  )
}
