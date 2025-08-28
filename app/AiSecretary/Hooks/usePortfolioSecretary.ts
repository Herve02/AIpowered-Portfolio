// hooks/usePortfolioSecretary.ts
import { useState, useCallback } from 'react';
import { 
  MoodType, 
  ConversationState, 
  Message, 
  SchedulingData, 
  MessageData, 
  AvailableSlot 
} from '../Types';
import { HERVE_DATA, MOOD_RESPONSES } from '../Data';

export const usePortfolioSecretary = () => {
  const [currentMood, setCurrentMood] = useState<MoodType>('professional');
  const [conversationState, setConversationState] = useState<ConversationState>('idle');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      content: "Hello! I'm Herve's Portfolio Secretary. I can help you learn about his work, schedule a meeting, or take a message. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [schedulingData, setSchedulingData] = useState<SchedulingData>({
    name: '',
    email: '',
    purpose: '',
    duration: '30',
    type: 'google-meet'
  });
  const [messageData, setMessageData] = useState<MessageData>({
    name: '',
    email: '',
    topic: '',
    content: '',
    consent: false
  });
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  const addMessage = useCallback((sender: 'user' | 'bot', content: string, isHtml = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      content,
      isHtml,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const changeMood = useCallback((mood: MoodType) => {
    setCurrentMood(mood);
    addMessage('bot', `Mood switched to ${mood}. ${MOOD_RESPONSES[mood].greeting}`);
  }, [addMessage]);

  const processMessage = useCallback((message: string) => {
    const lowerMessage = message.toLowerCase();
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (lowerMessage.includes('schedule') || lowerMessage.includes('meeting') || lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
        handleScheduling();
      } else if (lowerMessage.includes('message') || lowerMessage.includes('contact') || lowerMessage.includes('reach out')) {
        handleMessaging();
      } else if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('herve')) {
        handleAboutQuery();
      } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
        handleProjectsQuery();
      } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('help')) {
        handleServicesQuery();
      } else if (lowerMessage.includes('itinerary') || lowerMessage.includes('schedule today') || lowerMessage.includes('today')) {
        handleItineraryRequest();
      } else {
        handleGeneralQuery();
      }
    }, 1000);
  }, [currentMood]);

  const handleAboutQuery = useCallback(() => {
    const about = HERVE_DATA.about;
    const response = `**About Herve Twubahimana**

📍 **Location:** ${about.location}

👨‍💼 **Profile:** ${about.profile}

🎓 **Education:** ${about.education}

💻 **Technical Skills:** ${about.tech.join(', ')}

🤝 **Soft Skills:** ${about.softSkills.join(', ')}

${MOOD_RESPONSES[currentMood].closing}`;
    addMessage('bot', response);
  }, [currentMood, addMessage]);

  const handleProjectsQuery = useCallback(() => {
    let response = "**Herve's Recent Projects:**\n\n";
    HERVE_DATA.projects.forEach((project, index) => {
      response += `${index + 1}. **${project.name}**\n   ${project.description}\n\n`;
    });
    response += MOOD_RESPONSES[currentMood].closing;
    addMessage('bot', response);
  }, [currentMood, addMessage]);

  const handleServicesQuery = useCallback(() => {
    let response = "**Services Herve Offers:**\n\n";
    HERVE_DATA.services.forEach((service) => {
      response += `• ${service}\n`;
    });
    response += `\n${MOOD_RESPONSES[currentMood].closing}`;
    addMessage('bot', response);
  }, [currentMood, addMessage]);

  const handleScheduling = useCallback(() => {
    setConversationState('scheduling');
    const response = `I'd be happy to help you schedule a meeting with Herve! 

**Available Options:**
• Duration: 15, 30, or 60 minutes
• Meeting Types: Google Meet, Zoom, Phone, or In-person
• Business Hours: Mon-Fri, 9:00 AM - 6:00 PM (Africa/Kigali time)

Please fill out the form below to proceed:`;
    addMessage('bot', response);
  }, [addMessage]);

  const handleMessaging = useCallback(() => {
    setConversationState('messaging');
    const response = `I'll help you leave a message for Herve. Please fill out the form below:`;
    addMessage('bot', response);
  }, [addMessage]);

  const handleItineraryRequest = useCallback(() => {
    const today = new Date().toLocaleDateString('en-CA');
    const response = `**Today's Itinerary (${today}):**

🕘 **09:00 - 10:00** Client Call - Website Review
   📍 Google Meet
   
🕐 **10:30 - 11:30** Project Development - Harmony Spa
   📍 Office workspace
   
🕒 **14:00 - 15:00** SEO Consultation
   📍 Zoom Meeting
   
🕓 **16:00 - 17:00** Microsoft 365 Support Session  
   📍 Phone call

✅ Itinerary has been sent to twubaherve@gmail.com

${MOOD_RESPONSES[currentMood].closing}`;
    addMessage('bot', response);
  }, [currentMood, addMessage]);

  const handleGeneralQuery = useCallback(() => {
    const responses = [
      "I can help you with information about Herve's background, projects, and services. You can also schedule a meeting or leave a message!",
      "Feel free to ask about Herve's experience, view his projects, learn about his services, or book a consultation.",
      "I'm here to assist with any questions about Herve's work. Would you like to know about his projects, services, or schedule a meeting?"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addMessage('bot', `${randomResponse} ${MOOD_RESPONSES[currentMood].closing}`);
  }, [currentMood, addMessage]);

  const generateAvailableSlots = useCallback((baseDate?: string) => {
    const startDate = baseDate ? new Date(baseDate) : new Date();
    startDate.setDate(startDate.getDate() + 1);
    
    const slots: AvailableSlot[] = [];
    for (let i = 0; i < 3; i++) {
      const slotDate = new Date(startDate);
      slotDate.setDate(slotDate.getDate() + i);
      
      if (slotDate.getDay() === 0 || slotDate.getDay() === 6) {
        slotDate.setDate(slotDate.getDate() + 2);
      }
      
      const hour = 9 + (i * 2);
      slotDate.setHours(hour, 0, 0, 0);
      
      slots.push({
        id: i,
        datetime: slotDate,
        display: slotDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        }) + ' (Africa/Kigali)'
      });
    }
    
    setAvailableSlots(slots);
  }, []);

  const confirmBooking = useCallback(() => {
    if (!selectedSlot) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const meetingLink = schedulingData.type === 'google-meet' ? 'https://meet.google.com/abc-defg-hij' :
                        schedulingData.type === 'zoom' ? 'https://zoom.us/j/123456789' : null;
      
      let confirmationMessage = `✅ **Meeting Booked Successfully!**

📅 **Date & Time:** ${selectedSlot.display}
👤 **Duration:** ${schedulingData.duration} minutes
💼 **Purpose:** ${schedulingData.purpose}
📧 **Attendee:** ${schedulingData.email}`;

      if (meetingLink) {
        confirmationMessage += `\n🔗 **Meeting Link:** ${meetingLink}`;
      } else if (schedulingData.type === 'phone') {
        confirmationMessage += `\n📞 **Herve will call you at your provided number**`;
      } else if (schedulingData.type === 'in-person') {
        confirmationMessage += `\n📍 **Location:** To be confirmed via email`;
      }

      confirmationMessage += `\n\n📧 Calendar invitation sent to ${schedulingData.email}!\nHerve will also receive a notification about this booking.`;

      addMessage('bot', confirmationMessage);
      setConversationState('idle');
      setSelectedSlot(null);
    }, 2000);
  }, [selectedSlot, schedulingData, addMessage]);

  const submitMessage = useCallback(() => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const response = `✅ **Message Sent Successfully!**

📧 Your message has been delivered to Herve
📝 **Topic:** ${messageData.topic}
👤 **From:** ${messageData.name}

Herve typically responds within 24 hours. Thank you for reaching out!

${MOOD_RESPONSES[currentMood].closing}`;
      
      addMessage('bot', response);
      setConversationState('idle');
      setMessageData({
        name: '',
        email: '',
        topic: '',
        content: '',
        consent: false
      });
    }, 1500);
  }, [messageData, currentMood, addMessage]);

  return {
    // State
    currentMood,
    conversationState,
    messages,
    isTyping,
    schedulingData,
    messageData,
    availableSlots,
    selectedSlot,
    
    // Actions
    setCurrentMood,
    setConversationState,
    addMessage,
    changeMood,
    processMessage,
    setSchedulingData,
    setMessageData,
    generateAvailableSlots,
    setSelectedSlot,
    confirmBooking,
    submitMessage
  };
};