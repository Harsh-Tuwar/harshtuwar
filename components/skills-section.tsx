import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Sparkles } from "lucide-react"
import { getSkillCategories, getTechnologies } from "@/lib/notion/content"
import { iconMap } from "@/lib/skills/icon-map"
import { fallbackSkillCategories, fallbackTechnologies } from "@/lib/skills/fallback-data"

export async function SkillsSection() {
  // Fetch data from Notion, fallback to hardcoded data if not configured
  const skillCategories = await getSkillCategories().catch(() => fallbackSkillCategories)
  const technologies = await getTechnologies().catch(() => fallbackTechnologies)

  // Use fallback if Notion returns empty
  const finalSkillCategories = skillCategories.length > 0 ? skillCategories : fallbackSkillCategories
  const finalTechnologies = technologies.length > 0 ? technologies : fallbackTechnologies

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Expertise</span>
          </div>
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit combining core competencies with modern technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Core Skills */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
              <h3 className="font-montserrat font-bold text-xl text-foreground">Core Skills</h3>
            </div>

            <div className="space-y-4">
              {finalSkillCategories.map((category) => {
                const CategoryIcon = iconMap[category.icon] || Code2
                return (
                  <Card
                    key={category.id}
                    className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <CategoryIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-montserrat font-semibold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                            {category.name}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          {/* Right Side - Technologies */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
              <h3 className="font-montserrat font-bold text-xl text-foreground">Tech Stack</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {finalTechnologies.map((tech, index) => (
                <Badge
                  key={tech.id}
                  variant="outline"
                  className={`px-4 py-2.5 text-sm font-medium ${tech.color} hover:scale-105 hover:shadow-md transition-all duration-200 cursor-default animate-in fade-in slide-in-from-bottom-4`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Always learning.</span> I stay current with the latest technologies and best practices to deliver modern, scalable solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
