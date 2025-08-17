import { Card, CardContent } from "@/components/ui/card"

const technologies = [
  { name: "React", icon: "⚛️", color: "bg-blue-500/10 text-blue-600" },
  { name: "Next.js", icon: "▲", color: "bg-gray-500/10 text-gray-600" },
  { name: "TypeScript", icon: "TS", color: "bg-blue-500/10 text-blue-600" },
  { name: "Node.js", icon: "🟢", color: "bg-green-500/10 text-green-600" },
  { name: "Python", icon: "🐍", color: "bg-yellow-500/10 text-yellow-600" },
  { name: "PostgreSQL", icon: "🐘", color: "bg-blue-500/10 text-blue-600" },
  { name: "MongoDB", icon: "🍃", color: "bg-green-500/10 text-green-600" },
  { name: "AWS", icon: "☁️", color: "bg-orange-500/10 text-orange-600" },
  { name: "Docker", icon: "🐳", color: "bg-blue-500/10 text-blue-600" },
  { name: "GraphQL", icon: "◉", color: "bg-pink-500/10 text-pink-600" },
  { name: "Tailwind CSS", icon: "🎨", color: "bg-cyan-500/10 text-cyan-600" },
  { name: "Git", icon: "📝", color: "bg-red-500/10 text-red-600" },
]

export function TechnologiesGrid() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-foreground mb-4">Technologies & Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The modern stack I use to build exceptional digital experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-lg ${tech.color} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl font-bold">{tech.icon}</span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
