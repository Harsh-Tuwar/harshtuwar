"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Filter } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with modern technologies for scalability and performance.",
    image: "/ecommerce-dashboard.png",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    category: "Full Stack",
    demoUrl: "https://demo-ecommerce.vercel.app",
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, team workspaces, and project tracking. Features drag-and-drop functionality and comprehensive reporting.",
    image: "/task-management-app.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    category: "Full Stack",
    demoUrl: "https://taskflow-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/task-management",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts. Integrates with multiple weather APIs for accurate data.",
    image: "/weather-dashboard.png",
    technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
    category: "Frontend",
    demoUrl: "https://weather-dash.vercel.app",
    githubUrl: "https://github.com/johndoe/weather-dashboard",
    featured: false,
  },
  {
    id: 4,
    title: "API Gateway Service",
    description:
      "A microservices API gateway with rate limiting, authentication, load balancing, and monitoring. Built for high-performance enterprise applications.",
    image: "/api-gateway-architecture.png",
    technologies: ["Node.js", "Express", "Redis", "Docker", "AWS"],
    category: "Backend",
    demoUrl: null,
    githubUrl: "https://github.com/johndoe/api-gateway",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description:
      "A comprehensive analytics platform for social media metrics with data visualization, trend analysis, and automated reporting features.",
    image: "/social-analytics-dashboard.png",
    technologies: ["Python", "Django", "PostgreSQL", "D3.js", "Celery"],
    category: "Data Science",
    demoUrl: "https://social-analytics.vercel.app",
    githubUrl: "https://github.com/johndoe/social-analytics",
    featured: false,
  },
  {
    id: 6,
    title: "Mobile Banking App",
    description:
      "A secure mobile banking application with biometric authentication, transaction history, bill payments, and budget tracking features.",
    image: "/mobile-banking-app.png",
    technologies: ["React Native", "TypeScript", "Firebase", "Plaid API"],
    category: "Mobile",
    demoUrl: null,
    githubUrl: "https://github.com/johndoe/mobile-banking",
    featured: true,
  },
]

const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile", "Data Science"]

export function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const otherProjects = filteredProjects.filter((project) => !project.featured)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="font-montserrat font-bold text-2xl text-foreground">
              {selectedCategory === "All" ? "All Projects" : selectedCategory} ({filteredProjects.length})
            </h2>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filter Projects
            </Button>
          </div>

          <div className={`flex flex-wrap gap-2 ${showFilters ? "block" : "hidden sm:flex"}`}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && selectedCategory === "All" && (
          <div className="mb-16">
            <h3 className="font-montserrat font-semibold text-xl text-foreground mb-8">Featured Projects</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === "All" ? otherProjects : filteredProjects).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  featured?: boolean
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 ${
        featured ? "md:col-span-1" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {project.category}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
        <CardDescription className="leading-relaxed">{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            {project.demoUrl && (
              <Button asChild size="sm" className="flex-1">
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
