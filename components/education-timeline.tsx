import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, GraduationCap } from "lucide-react"
import { getEducation } from "@/lib/notion/content"
import Image from "next/image"

export async function EducationTimeline() {
  const education = await getEducation()

  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/5 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 shadow-md">
            <GraduationCap className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Education
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-border" />
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
              Academic Journey
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-border" />
          </div>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <article
              key={edu.id}
              className="group relative animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-gradient-to-br from-card via-card to-muted/5 rounded-3xl border border-border/50 overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Card Content */}
                <div className="relative p-7 sm:p-8">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Institution Logo */}
                      {edu.instLogo && (
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-background rounded-2xl border border-border/50 p-2.5 shadow-md ring-1 ring-border/10 group-hover:shadow-lg transition-shadow duration-300">
                          <Image
                            src={edu.instLogo}
                            alt={edu.instName}
                            fill
                            className="object-contain p-0.5 rounded-xl"
                          />
                        </div>
                      )}

                      {/* Institution & Degree */}
                      <div className="flex-1 min-w-0">
                        {edu.instUrl ? (
                          <a
                            href={edu.instUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors duration-300"
                          >
                            <span className="truncate">{edu.instName}</span>
                            <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-60 group-hover/link:opacity-100 transition-opacity duration-300" />
                          </a>
                        ) : (
                          <h3 className="text-xl font-bold text-foreground truncate">
                            {edu.instName}
                          </h3>
                        )}
                        <p className="text-lg font-semibold text-muted-foreground mt-1.5">
                          {edu.degreeName}
                        </p>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3.5 py-2 rounded-full border border-border/30 shadow-sm self-start">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{edu.period}</span>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

                  {/* Skills */}
                  {edu.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skill.id}
                          variant="secondary"
                          className="px-3 py-1.5 text-xs font-medium rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 animate-in fade-in"
                          style={{ animationDelay: `${(index * 100) + (skillIndex * 30)}ms` }}
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
