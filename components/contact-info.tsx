"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { contactDetails, socialLinks } from "@/lib/contact-config"

export function ContactInfo() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-border/30 bg-background/60 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="font-montserrat text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
              Other Ways to Connect
            </h2>
            <p className="text-muted-foreground/80">
              Prefer a different method? Here's how you can reach me.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {contactDetails.map(({ icon: Icon, title, main, sub, href }, i) => {
              const cardContent = (
                <div className="relative h-full overflow-hidden rounded-2xl bg-background/60 backdrop-blur-xl border border-border/30 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/40">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Glow effect */}
                  <div className="absolute -inset-px bg-linear-to-br from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

                  <div className="relative p-6">
                    {/* Decorative dots - top left */}
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/60 transition-colors duration-500 delay-75" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500 delay-150" />
                    </div>

                    {/* Icon */}
                    <div className="inline-flex p-2.5 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 mb-3 mt-3 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{title}</h3>
                    <p className="text-sm text-foreground/90 font-medium mb-1">{main}</p>
                    <p className="text-xs text-muted-foreground/70">{sub}</p>
                  </div>
                </div>
              )

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                  className="group relative h-full"
                >
                  {href ? (
                    <a href={href} className="block h-full">{cardContent}</a>
                  ) : (
                    cardContent
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background/60 backdrop-blur-sm px-4 py-1 rounded-full text-muted-foreground/60 font-medium">
                Social Links
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            {socialLinks.map(({ icon: Icon, label, href }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                className="group relative"
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-3 px-6 py-3 rounded-2xl overflow-hidden bg-background/60 backdrop-blur-xl border border-border/30 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/40 transition-all duration-500"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Glow effect */}
                  <div className="absolute -inset-px bg-linear-to-br from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

                  <Icon className="relative h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300">{label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
