"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, CheckCircle, AlertCircle, Mail } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const SESSION_STORAGE_KEY = "contact_form_data";
const API_BASE_URL = "https://harshtuwar-api.vercel.app";
const API_CONTACT_ENDPOINT_PATH = "send";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [messageLength, setMessageLength] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load saved form data from session storage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData((prev) => ({ ...prev, ...parsed }))
        setMessageLength(parsed.message?.length || 0)
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  // Save form data to session storage on change
  useEffect(() => {
    if (formData.name || formData.email || formData.subject || formData.message) {
      const dataToSave = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(dataToSave))
    }
  }, [formData])

  // Auto-dismiss success/error messages after 5 seconds
  useEffect(() => {
    if (submitStatus !== "idle") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle")
        setSubmitMessage("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [formData.message])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)

    // Focus on first error field
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const firstErrorField = Object.keys(newErrors)[0]
        const element = document.getElementById(firstErrorField)
        if (element) {
          element.focus()
        }
      }, 0)
    }

    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Update message length counter
    if (field === "message") {
      setMessageLength(value.length)
    }

    // Clear error when user starts typing
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check for honeypot (anti-spam)
    if (formData.honeypot) {
      // Silently reject spam
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          msg: formData.message,
        })
      }

      const response = await fetch(
        `${API_BASE_URL}/${API_CONTACT_ENDPOINT_PATH}`,
        requestOptions
      );

      if (!response || !response.ok) {
        setSubmitStatus("error")
        setSubmitMessage("Contact form fields cannot be empty!")
        setIsSubmitting(false)
        return
      }

      const result = await response.json()

      if (result.status === 'success') {
        setSubmitStatus("success")
        setSubmitMessage("Your email has been sent! I will get back to you ASAP. Thanks for contacting!")
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
        setMessageLength(0)
        // Clear session storage on successful submit
        sessionStorage.removeItem(SESSION_STORAGE_KEY)
      } else {
        setSubmitStatus("error")
        setSubmitMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle keyboard shortcut (Ctrl/Cmd+Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="group relative">
      <div className="relative bg-linear-to-br from-card via-card to-muted/5 rounded-3xl border border-border/50 overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-500">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative p-7 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 mb-4 shadow-md">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-montserrat text-3xl font-bold text-foreground mb-2">
              Send me a message
            </h2>
            <p className="text-base text-muted-foreground/80">
              Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent mb-8" />

          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            value={formData.honeypot}
            onChange={(e) => handleInputChange("honeypot", e.target.value)}
            style={{ position: "absolute", left: "-9999px" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label htmlFor="name" className="text-sm font-semibold text-foreground/90">
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                className={`h-11 bg-background/50 backdrop-blur-sm border-border/50 placeholder:text-muted-foreground/40 placeholder:font-normal placeholder:italic focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                className={`h-11 bg-background/50 backdrop-blur-sm border-border/50 placeholder:text-muted-foreground/40 placeholder:font-normal placeholder:italic focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="subject" className="text-sm font-semibold text-foreground/90">
              Subject *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="What's this about?"
              className={`h-11 bg-background/50 backdrop-blur-sm border-border/50 placeholder:text-muted-foreground/40 placeholder:font-normal placeholder:italic focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.subject ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.subject}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="message" className="text-sm font-semibold text-foreground/90">
                Message *
              </Label>
              <span
                className={`text-xs font-medium transition-colors duration-200 ${
                  messageLength < 10
                    ? "text-muted-foreground"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {messageLength} / 10 min
              </span>
            </div>
            <Textarea
              ref={textareaRef}
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell me about your project or inquiry..."
              rows={6}
              className={`resize-none overflow-hidden bg-background/50 backdrop-blur-sm border-border/50 placeholder:text-muted-foreground/40 placeholder:font-normal placeholder:italic focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-primary/50"></span>
              Tip: Press Ctrl/Cmd + Enter to submit
            </p>
          </div>

          {submitStatus !== "idle" && (
            <Alert
              className={`backdrop-blur-sm animate-in fade-in slide-in-from-top-2 ${
                submitStatus === "success"
                  ? "border-green-200/50 bg-green-50/50 dark:border-green-900/50 dark:bg-green-950/50"
                  : "border-destructive/50 bg-destructive/5"
              }`}
            >
              {submitStatus === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-destructive" />
              )}
              <AlertDescription
                className={`text-sm font-medium ${
                  submitStatus === "success" ? "text-green-800 dark:text-green-300" : "text-destructive"
                }`}
              >
                {submitMessage}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold cursor-pointer bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    </div>
  )
}
