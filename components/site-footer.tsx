import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { SiStackoverflow } from "react-icons/si"
import { siteConfig as config } from "@/lib/metadata"

const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  ...(config.showProjects ? [{ href: "/projects", label: "Projects" }] : []),
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const socials = [
  { href: config.author.github, label: "GitHub", Icon: Github },
  { href: config.author.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: config.author.stackoverflow, label: "Stack Overflow", Icon: SiStackoverflow },
  { href: `mailto:${config.author.email}`, label: "Email", Icon: Mail },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="font-montserrat font-bold text-lg text-foreground">{config.name}</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {config.role} in {config.location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-muted-foreground hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
