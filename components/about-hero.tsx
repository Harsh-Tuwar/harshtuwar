import { Button } from "@/components/ui/button"
import { siteConfig } from '@/lib/metadata'
import { RichText } from '@/types/global.types';
import { Download, MapPin, Calendar } from "lucide-react"
import { getAboutContent } from '@/lib/notion/content';

export async function AboutHero() {
  const paragraphs = await getAboutContent();

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Decorative Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Text Section */}
          <div className="space-y-12">
            <header className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-extrabold font-serif tracking-tight text-foreground leading-[1.1]">
                About <span className="text-primary">Me</span>
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground/90 text-base font-medium">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  {siteConfig.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  {new Date().getFullYear() - siteConfig.experienceStartYear}+ Years Experience
                </div>
              </div>
            </header>

            {/* About Content — Enhanced Typography */}
            <div className="relative space-y-6 text-[1.05rem] font-light leading-[1.9] tracking-[0.01em] text-muted-foreground/90 text-justify selection:bg-primary/10 selection:text-primary transition-colors duration-500 hyphens-auto">
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
                className="font-semibold shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all duration-300 bg-primary/90 hover:bg-primary text-primary-foreground"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            )}
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/30 via-accent/10 to-background blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700"></div>
              <div className="relative w-[420px] h-[420px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/10">
                <img
                  src="/developer-multiple-monitors.png"
                  alt="Developer at work"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -top-8 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
