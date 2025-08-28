// components/PortfolioSecretary.tsx
import React, { useCallback } from 'react';
import HeroSection from './HeroSection';
import ChatInterface from './ChatInterface';
import { usePortfolioSecretary } from './Hooks/usePortfolioSecretary';
import './secretary.css';

const PortfolioSecretary: React.FC = () => {
  const {
    currentMood,
    conversationState,
    messages,
    isTyping,
    schedulingData,
    messageData,
    availableSlots,
    selectedSlot,
    addMessage,
    changeMood,
    processMessage,
    setSchedulingData,
    setMessageData,
    generateAvailableSlots,
    setSelectedSlot,
    confirmBooking,
    submitMessage,
    setConversationState
  } = usePortfolioSecretary();

  const handleSendMessage = useCallback((message: string) => {
    addMessage('user', message);
    processMessage(message);
  }, [addMessage, processMessage]);

  const handleQuickAction = useCallback((action: string) => {
    const actionMessages: Record<string, string> = {
      about: "Tell me about Herve",
      projects: "What projects has Herve worked on?",
      services: "What services does Herve offer?",
      schedule: "I'd like to schedule a meeting",
      message: "I'd like to leave a message"
    };
    
    const message = actionMessages[action];
    if (message) {
      handleSendMessage(message);
    }
  }, [handleSendMessage]);

  const handleCheckAvailability = useCallback(() => {
    // Validate required fields
    if (!schedulingData.name || !schedulingData.email || !schedulingData.purpose) {
      addMessage('bot', 'Please fill in all required fields before checking availability.');
      return;
    }

    // Simulate availability check with typing indicator
    setTimeout(() => {
      generateAvailableSlots(schedulingData.date);
    }, 1500);
  }, [schedulingData, addMessage, generateAvailableSlots]);

  const handleCancelScheduling = useCallback(() => {
    setConversationState('idle');
    addMessage('bot', 'Scheduling cancelled. Is there anything else I can help you with?');
  }, [setConversationState, addMessage]);

  const handleCancelMessaging = useCallback(() => {
    setConversationState('idle');
    addMessage('bot', 'Message cancelled. Is there anything else I can help you with?');
  }, [setConversationState, addMessage]);

  return (
    <div className="portfolio-secretary">
      <div className="ps-container">
        <HeroSection 
          currentMood={currentMood}
          onMoodChange={changeMood}
        />
        
        <ChatInterface
          messages={messages}
          isTyping={isTyping}
          conversationState={conversationState}
          schedulingData={schedulingData}
          messageData={messageData}
          availableSlots={availableSlots}
          selectedSlot={selectedSlot}
          onSendMessage={handleSendMessage}
          onQuickAction={handleQuickAction}
          onSchedulingDataChange={setSchedulingData}
          onMessageDataChange={setMessageData}
          onCheckAvailability={handleCheckAvailability}
          onSlotSelect={setSelectedSlot}
          onConfirmBooking={confirmBooking}
          onSubmitMessage={submitMessage}
          onCancelScheduling={handleCancelScheduling}
          onCancelMessaging={handleCancelMessaging}
        />
      </div>
    </div>
  );
};

export default PortfolioSecretary;