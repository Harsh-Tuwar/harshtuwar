import { Mail, MapPin, Clock, Github, Linkedin, Twitter, type LucideIcon } from "lucide-react"
import { siteConfig } from "./metadata"

/**
 * Contact Configuration
 *
 * This file centralizes all contact information, social links, and availability details.
 * Update these values to reflect your personal information across the entire site.
 */

// Personal Contact Information
export const contactInfo = {
  email: siteConfig.author.email,
  location: {
    display: siteConfig.location,
  },
  availability: {
    days: "Mon - Fri",
    hours: "9AM - 6PM EST",
    timezone: "EST",
  },
} as const

// Contact Details for Display
export interface ContactDetail {
  icon: LucideIcon
  title: string
  main: string
  sub: string
  href?: string
}

export const contactDetails: ContactDetail[] = [
  {
    icon: Mail,
    title: "Email",
    main: contactInfo.email,
    sub: "Typically responds within 24 hours",
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: MapPin,
    title: "Location",
    main: contactInfo.location.display,
    sub: "Open to remote opportunities worldwide",
  },
  {
    icon: Clock,
    title: "Availability",
    main: `${contactInfo.availability.days}, ${contactInfo.availability.hours}`,
    sub: "Reachable for urgent matters outside hours",
  },
]

// Social Media Links
export interface SocialLink {
  icon: LucideIcon
  label: string
  href: string
  username: string
}

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    label: "GitHub",
    href: siteConfig.author.github,
    username: siteConfig.author.github.split("/").pop() || "",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: siteConfig.author.linkedin,
    username: siteConfig.author.linkedin.split("/").pop() || "",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: `https://twitter.com/${siteConfig.author.twitter.replace("@", "")}`,
    username: siteConfig.author.twitter,
  },
]

// Helper function to get social link by platform
export function getSocialLink(platform: "github" | "linkedin" | "twitter"): SocialLink | undefined {
  return socialLinks.find((link) => link.label.toLowerCase() === platform)
}
