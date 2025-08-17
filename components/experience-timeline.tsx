import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    location: "San Francisco, CA",
    description:
      "Lead a team of 5 developers building scalable web applications. Architected microservices infrastructure serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%.",
    technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    location: "Remote",
    description:
      "Built the entire frontend and backend for a SaaS platform from scratch. Collaborated with designers to create intuitive user experiences. Optimized application performance achieving 95+ Lighthouse scores.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Vercel"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2019 - 2020",
    location: "New York, NY",
    description:
      "Developed responsive websites and web applications for various clients. Worked closely with design teams to implement pixel-perfect interfaces. Mentored junior developers and established coding standards.",
    technologies: ["React", "JavaScript", "SCSS", "WordPress"],
  },
]

export function ExperienceTimeline() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-foreground mb-4">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and key achievements in software development
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>

                <Card className="md:ml-16 border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl font-montserrat font-semibold">{exp.title}</CardTitle>
                        <div className="flex items-center text-primary font-medium mt-1">
                          <Building className="h-4 w-4 mr-2" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {exp.period}
                        </div>
                        <span className="text-sm text-muted-foreground">{exp.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-4">{exp.description}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
