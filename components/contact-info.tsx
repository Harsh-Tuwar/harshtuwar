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
            {contactDetails.map(({ icon: Icon, title, main, sub, href }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                {href ? (
                  <a href={href} className="block">
                    <div className="relative p-5 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                        <p className="text-sm text-foreground/90 font-medium mb-1">{main}</p>
                        <p className="text-xs text-muted-foreground/70">{sub}</p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="relative p-5 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-foreground/90 font-medium mb-1">{main}</p>
                      <p className="text-xs text-muted-foreground/70">{sub}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-foreground/90 group-hover:text-foreground">{label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
