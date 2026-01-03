import { Button } from "@/components/ui/button"
import { siteConfig } from '@/lib/metadata'
import { Download, MapPin, Calendar } from "lucide-react"
import { getAboutContent } from '@/lib/notion/content';

export async function AboutHero() {
  const paragraphs = await getAboutContent();

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Decorative Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-40 h-40 sm:w-72 sm:h-72 bg-primary/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-16 sm:-bottom-32 -right-16 sm:-right-32 w-56 h-56 sm:w-96 sm:h-96 bg-accent/10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mt-10">

          {/* Text Section */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <header className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-foreground leading-[1.1]">
                About <span className="text-primary">Me</span>
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-muted-foreground/90 font-medium">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                  {siteConfig.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                  {new Date().getFullYear() - siteConfig.experienceStartYear}+ Years Experience
                </div>
              </div>
            </header>

            {/* About Content — Enhanced Typography */}
            <div className="relative space-y-4 sm:space-y-6 text-base sm:text-[1.05rem] font-light leading-relaxed sm:leading-[1.9] tracking-[0.01em] text-muted-foreground/90 text-left sm:text-justify selection:bg-primary/10 selection:text-primary transition-colors duration-500 hyphens-auto">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="hover:text-foreground/95 transition-colors duration-500"
                >
                  {para.map((content, j) => {
                    const { bold, italic, underline, strikethrough, color = "default" } = content.annotations;

                    const className = [
                      bold ? "font-semibold text-foreground" : "",
                      italic ? "italic text-foreground/90" : "",
                      underline ? "underline underline-offset-4 decoration-primary/40" : "",
                      strikethrough ? "line-through text-muted-foreground/70" : "",
                      color !== "default" ? `text-${color}-500` : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <span
                        key={j}
                        className={`${className} [text-wrap:balance]`}
                      >
                        {content.text}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>

            {siteConfig.allowResumeDownload && (
              <Button
                size="lg"
                className="w-full sm:w-auto font-semibold shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all duration-300 bg-primary/90 hover:bg-primary text-primary-foreground"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            )}
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative group w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/30 via-accent/10 to-background blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700"></div>
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/10">
                <img
                  src="/developer-multiple-monitors.png"
                  alt="Developer at work"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -top-4 sm:-top-8 -right-3 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 sm:-bottom-10 -left-4 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-accent/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
