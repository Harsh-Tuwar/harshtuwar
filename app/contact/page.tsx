import { Navigation } from "@/components/navigation"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with John Doe for web development projects, collaborations, or consulting opportunities.",
  url: "/contact",
})

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ContactHero />

      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Contact Form (full width) */}
        <ContactForm />

        {/* Unified Contact Info Card */}
        <ContactInfo />
      </div>
    </main>
  )
}
