"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Clock, Github, Linkedin, Twitter, Send } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ContactInfoProps {
  type: "getInTouch" | "reachOut"
}

export function ContactInfo({ type }: ContactInfoProps) {
  if (type === "getInTouch") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="pt-6 border-none shadow-xl backdrop-blur-sm bg-gradient-to-br from-background/60 to-muted/30 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="space-y-0.5">
            <CardTitle className="text-2xl font-semibold tracking-tight">Get in Touch</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Always open to new collaborations, opportunities, and great conversations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 mt-2">
            {[
              {
                icon: Mail,
                title: "Email",
                main: "john.doe@example.com",
                sub: "Typically responds within 24 hours",
              },
              {
                icon: MapPin,
                title: "Location",
                main: "San Francisco, CA",
                sub: "Open to remote opportunities worldwide",
              },
              {
                icon: Clock,
                title: "Availability",
                main: "Mon - Fri, 9AM - 6PM PST",
                sub: "Reachable for urgent matters outside hours",
              },
            ].map(({ icon: Icon, title, main, sub }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition"
              >
                <div className="p-2 rounded-lg bg-gradient-to-tr from-primary/20 to-primary/40 shadow-sm">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm">{main}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // reachOut
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="pt-6 border-none shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary/10 via-background/60 to-muted/20 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold tracking-tight">Reach Out</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Stay connected or get a quick response — whatever works best for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 mt-2">
          <div className="flex flex-wrap items-center justify-between">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/johndoe" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/johndoe" },
              { icon: Twitter, label: "Twitter", href: "https://twitter.com/johndoe" },
            ].map(({ icon: Icon, label, href }, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
                <Button asChild variant="outline" className="flex items-center bg-transparent hover:bg-primary/10 transition rounded-xl px-8">
                  <Link href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4 mr-2 text-primary" />
                    {label}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-5">
            <h3 className="font-semibold text-lg mb-2 text-foreground">Need a Quick Response?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              For urgent or time-sensitive inquiries, reach out directly by email.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.15 }}>
              <Button asChild size="sm" className="rounded-lg font-medium">
                <Link href="mailto:john.doe@example.com">
                  <Send className="h-4 w-4 mr-2" />
                  Email Directly
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
