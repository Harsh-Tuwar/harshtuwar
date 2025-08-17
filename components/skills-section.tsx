import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skills = [
  { name: "JavaScript/TypeScript", level: 95, category: "Frontend" },
  { name: "React/Next.js", level: 90, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Python", level: 85, category: "Backend" },
  { name: "PostgreSQL/MongoDB", level: 82, category: "Database" },
  { name: "AWS/Vercel", level: 80, category: "DevOps" },
  { name: "Docker/Kubernetes", level: 75, category: "DevOps" },
  { name: "GraphQL", level: 78, category: "API" },
]

const categories = ["Frontend", "Backend", "Database", "DevOps", "API"]

export function SkillsSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-foreground mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category} className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-montserrat font-semibold text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
