// constants/data.ts
import { HerveData, MoodResponse, MoodType } from './Types';

export const HERVE_DATA: HerveData = {
  about: {
    location: "Kigali, Rwanda",
    profile: "Early-career professional experienced in software development (ReactJS), tender coordination, business development support, and Microsoft 365 IT support.",
    tech: ["HTML", "CSS", "JavaScript", "ReactJS", "SEO (on-page)", "Figma (basics)", "Microsoft 365", "Digital Record Management"],
    softSkills: ["Communication", "Problem-solving", "Strategic thinking", "Client outreach", "Process improvement", "Team collaboration"],
    education: "Bachelor in Business Information Technology, University of Rwanda"
  },
  projects: [
    {
      name: "Harmony Spa Website",
      description: "Responsive site with booking system and SEO focus"
    },
    {
      name: "Wouessi Website",
      description: "ReactJS development, frontend optimization, on-page SEO contribution"
    },
    {
      name: "Herve Designs",
      description: "Personal business site showcasing services and offers"
    }
  ],
  services: [
    "Website development (React + frontend)",
    "SEO optimization",
    "Microsoft 365 support", 
    "Digital outreach campaign support",
    "Tender coordination assistance"
  ]
};

export const MOOD_RESPONSES: Record<MoodType, MoodResponse> = {
  professional: {
    greeting: "Good day! How may I assist you with Herve's services today?",
    closing: "Thank you for your interest. Is there anything else I can help you with?"
  },
  friendly: {
    greeting: "Hey there! 😊 What can I help you learn about Herve today?",
    closing: "Hope that helps! Feel free to ask me anything else!"
  },
  energetic: {
    greeting: "Hello! 🚀 I'm excited to tell you about Herve's amazing work!",
    closing: "Awesome! Let me know what else you'd like to explore!"
  },
  calm: {
    greeting: "Hello, and welcome. I'm here to help you learn about Herve's work at your own pace.",
    closing: "I hope you found that helpful. Please don't hesitate to ask more questions."
  }
};

export const QUICK_ACTIONS = [
  { id: 'about', label: 'About Herve', action: 'about' as const },
  { id: 'projects', label: 'Projects', action: 'projects' as const },
  { id: 'services', label: 'Services', action: 'services' as const },
  { id: 'schedule', label: 'Book Meeting', action: 'schedule' as const },
  { id: 'message', label: 'Leave Message', action: 'message' as const }
];

export const DURATION_OPTIONS = [
  { value: '30', label: '30 minutes' },
  { value: '60', label: '60 minutes' },
  { value: '15', label: '15 minutes' }
];

export const MEETING_TYPES = [
  { value: 'google-meet', label: 'Google Meet' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'in-person', label: 'In Person' }
];