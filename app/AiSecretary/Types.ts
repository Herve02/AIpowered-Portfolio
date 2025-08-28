// types/index.ts

export type MoodType = 'professional' | 'friendly' | 'energetic' | 'calm';

export type ConversationState = 'idle' | 'scheduling' | 'messaging';

export type MessageSender = 'user' | 'bot';

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  isHtml?: boolean;
  timestamp: Date;
}

export interface MoodResponse {
  greeting: string;
  closing: string;
}

export interface HerveData {
  about: {
    location: string;
    profile: string;
    tech: string[];
    softSkills: string[];
    education: string;
  };
  projects: Project[];
  services: string[];
}

export interface Project {
  name: string;
  description: string;
}

export interface SchedulingData {
  name: string;
  email: string;
  purpose: string;
  duration: string;
  type: 'google-meet' | 'zoom' | 'phone' | 'in-person';
  date?: string;
}

export interface MessageData {
  name: string;
  email: string;
  topic: string;
  content: string;
  consent: boolean;
}

export interface AvailableSlot {
  id: number;
  datetime: Date;
  display: string;
}

export interface QuickAction {
  id: string;
  label: string;
  action: 'about' | 'projects' | 'services' | 'schedule' | 'message';
}