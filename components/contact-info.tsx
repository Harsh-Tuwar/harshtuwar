import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Clock, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-montserrat text-2xl">Get in touch</CardTitle>
          <CardDescription>I'm always open to discussing new opportunities and interesting projects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <p className="text-sm text-muted-foreground mt-1">I typically respond within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Location</h3>
              <p className="text-muted-foreground">San Francisco, CA</p>
              <p className="text-sm text-muted-foreground mt-1">Open to remote work worldwide</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Availability</h3>
              <p className="text-muted-foreground">Mon - Fri, 9AM - 6PM PST</p>
              <p className="text-sm text-muted-foreground mt-1">Usually available for urgent matters</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-montserrat text-xl">Connect with me</CardTitle>
          <CardDescription>Follow my work and connect on social platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Button asChild variant="outline" className="justify-start bg-transparent">
              <Link href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-3" />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start bg-transparent">
              <Link href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-3" />
                LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start bg-transparent">
              <Link href="https://twitter.com/johndoe" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4 mr-3" />
                Twitter
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-primary/5">
        <CardContent className="pt-6">
          <h3 className="font-montserrat font-semibold text-lg mb-2">Quick Response</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Need a faster response? Send me a direct email for urgent inquiries or time-sensitive projects.
          </p>
          <Button asChild size="sm">
            <Link href="mailto:john.doe@example.com">
              <Mail className="h-4 w-4 mr-2" />
              Email Directly
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
