import { Button } from "@/components/ui/button"
import { Download, MapPin, Calendar } from "lucide-react"

export function AboutHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-montserrat font-black text-4xl sm:text-5xl text-foreground">
                About <span className="text-primary">Me</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  San Francisco, CA
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  5+ Years Experience
                </div>
              </div>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I'm a passionate Senior Full Stack Developer with over 5 years of experience building scalable web
                  applications and leading development teams. My journey in tech started with a Computer Science degree
                  and has evolved through various roles at startups and established companies.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, cloud architecture, and creating exceptional user
                  experiences. When I'm not coding, you'll find me contributing to open source projects, mentoring
                  junior developers, or exploring the latest in web technologies.
                </p>
                <p>
                  My approach combines technical expertise with strong communication skills, enabling me to bridge the
                  gap between complex technical concepts and business objectives.
                </p>
              </div>
            </div>

            <Button size="lg" className="font-semibold">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-96 h-96 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                <img
                  src="/developer-multiple-monitors.png"
                  alt="John Doe working"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
