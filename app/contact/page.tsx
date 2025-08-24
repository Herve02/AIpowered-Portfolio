"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useVoiceCommands } from "@/hooks/use-voice-commands"
import { portfolioData } from "@/lib/portfolio-data"
import { sendContactEmail, validateContactForm, type ContactFormData } from "@/lib/email-service"
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Send,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { VoiceFeedback } from "@/components/voice-feedback"

export default function ContactPage() {
  const { isListening, isSupported, toggleListening, feedback } = useVoiceCommands()
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateContactForm(formData)
    if (!validation.isValid) {
      setFormErrors(validation.errors)
      setSubmitStatus({ type: "error", message: "Please fix the errors below and try again." })
      return
    }

    setIsSubmitting(true)
    setFormErrors({})
    setSubmitStatus({ type: null, message: "" })

    console.log("[v0] Contact form submitted:", formData)

    const result = await sendContactEmail(formData)

    setIsSubmitting(false)

    if (result.success) {
      setSubmitStatus({ type: "success", message: result.message })
      setFormData({ name: "", email: "", message: "" })
    } else {
      setSubmitStatus({ type: "error", message: result.message })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onVoiceToggle={isSupported ? toggleListening : undefined} isListening={isListening} />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-in fade-in-50 duration-700">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to start your next project? I'd love to hear from you. Let's create something amazing together.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              {/* <Card className="p-8 hover:shadow-lg transition-shadow duration-300 animate-in slide-in-from-left-5 duration-700">
                <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

                {submitStatus.type && (
                  <Alert
                    variant={submitStatus.type === "success" ? "success" : "destructive"}
                    className="mb-6 animate-in slide-in-from-top-2 duration-300"
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{submitStatus.message}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="animate-in slide-in-from-bottom-3 duration-500 delay-200">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`mt-2 transition-colors duration-200 ${formErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-destructive mt-1 animate-in slide-in-from-left-2 duration-200">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="animate-in slide-in-from-bottom-3 duration-500 delay-300">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`mt-2 transition-colors duration-200 ${formErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-destructive mt-1 animate-in slide-in-from-left-2 duration-200">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="animate-in slide-in-from-bottom-3 duration-500 delay-400">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`mt-2 min-h-[120px] transition-colors duration-200 ${formErrors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      placeholder="Tell me about your project or how I can help you..."
                      disabled={isSubmitting}
                    />
                    {formErrors.message && (
                      <p className="text-sm text-destructive mt-1 animate-in slide-in-from-left-2 duration-200">
                        {formErrors.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{formData.message.length}/1000 characters</p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full hover:scale-105 transition-transform duration-200 animate-in slide-in-from-bottom-3 duration-500 delay-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg animate-in fade-in-50 duration-500 delay-700">
                  <h4 className="text-sm font-medium mb-2">📧 Email Integration</h4>
                  <p className="text-xs text-muted-foreground">
                    This form is ready for EmailJS integration. In production, configure your EmailJS service ID,
                    template ID, and public key in the email service configuration.
                  </p>
                </div>
              </Card> */}

              {/* Contact Information */}
              <div className="space-y-8 animate-in slide-in-from-right-5 duration-700 delay-200">
                {/* Contact Details */}
                <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        title: "Email",
                        content: portfolioData.contact.email,
                        href: `mailto:${portfolioData.contact.email}`,
                        color: "primary",
                      },
                      {
                        icon: MapPin,
                        title: "Location",
                        content: "Available for remote work worldwide",
                        color: "secondary",
                      },
                      {
                        icon: Phone,
                        title: "Response Time",
                        content: "Usually within 24 hours",
                        color: "accent",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className={`flex items-center space-x-4 animate-in slide-in-from-bottom-3 duration-500`}
                        style={{ animationDelay: `${(index + 1) * 150}ms` }}
                      >
                        <div className={`w-12 h-12 bg-${item.color}/10 rounded-full flex items-center justify-center`}>
                          <item.icon className={`h-6 w-6 text-${item.color}`} />
                        </div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {item.content}
                            </Link>
                          ) : (
                            <p className="text-muted-foreground">{item.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Social Links */}
                <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>

                  <div className="space-y-4">
                    {[
                      {
                        icon: Github,
                        title: "GitHub",
                        description: "View my code and projects",
                        href: portfolioData.contact.social.github,
                      },
                      {
                        icon: Linkedin,
                        title: "LinkedIn",
                        description: "Professional network",
                        href: portfolioData.contact.social.linkedin,
                      },
                      {
                        icon: ExternalLink,
                        title: "Portfolio Website",
                        description: "Herve Designs",
                        href: portfolioData.contact.social.portfolio,
                      },
                    ].map((social, index) => (
                      <Link
                        key={social.title}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-all duration-300 group hover:-translate-y-1 animate-in slide-in-from-bottom-3 duration-500`}
                        style={{ animationDelay: `${(index + 1) * 200}ms` }}
                      >
                        <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                        <div className="flex-1">
                          <p className="font-medium">{social.title}</p>
                          <p className="text-sm text-muted-foreground">{social.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ScrollToTop />
      <VoiceFeedback isListening={isListening} feedback={feedback} isSupported={isSupported} />
    </div>
  )
}
