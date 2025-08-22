// EmailJS integration for contact form
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
}

// EmailJS configuration - these would be set as environment variables in production
const EMAILJS_CONFIG = {
  serviceId: "service_portfolio",
  templateId: "template_contact",
  publicKey: "your_public_key_here",
}

export async function sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // Simulate EmailJS integration
    console.log("[v0] Sending email with EmailJS:", formData)

    // In a real implementation, you would use:
    // import emailjs from '@emailjs/browser'
    // const result = await emailjs.send(
    //   EMAILJS_CONFIG.serviceId,
    //   EMAILJS_CONFIG.templateId,
    //   {
    //     from_name: formData.name,
    //     from_email: formData.email,
    //     message: formData.message,
    //     to_name: 'Twubahimana Herve'
    //   },
    //   EMAILJS_CONFIG.publicKey
    // )

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1

    if (isSuccess) {
      return {
        success: true,
        message: "Your message has been sent successfully! I'll get back to you within 24 hours.",
      }
    } else {
      throw new Error("Failed to send email")
    }
  } catch (error) {
    console.error("[v0] Email sending failed:", error)
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again or contact me directly via email.",
    }
  }
}

// Form validation utilities
export function validateContactForm(formData: ContactFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  // Name validation
  if (!formData.name.trim()) {
    errors.name = "Name is required"
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = "Email is required"
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address"
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = "Message is required"
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters"
  } else if (formData.message.trim().length > 1000) {
    errors.message = "Message must be less than 1000 characters"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
