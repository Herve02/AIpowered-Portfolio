// components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import SchedulingForm from './SchedulingForm';
import MessagingForm from './MessagingForm';
import { 
  Message, 
  ConversationState, 
  SchedulingData, 
  MessageData, 
  AvailableSlot 
} from './Types';
import { QUICK_ACTIONS } from './Data';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  conversationState: ConversationState;
  schedulingData: SchedulingData;
  messageData: MessageData;
  availableSlots: AvailableSlot[];
  selectedSlot: AvailableSlot | null;
  onSendMessage: (message: string) => void;
  onQuickAction: (action: string) => void;
  onSchedulingDataChange: (data: SchedulingData) => void;
  onMessageDataChange: (data: MessageData) => void;
  onCheckAvailability: () => void;
  onSlotSelect: (slot: AvailableSlot) => void;
  onConfirmBooking: () => void;
  onSubmitMessage: () => void;
  onCancelScheduling: () => void;
  onCancelMessaging: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isTyping,
  conversationState,
  schedulingData,
  messageData,
  availableSlots,
  selectedSlot,
  onSendMessage,
  onQuickAction,
  onSchedulingDataChange,
  onMessageDataChange,
  onCheckAvailability,
  onSlotSelect,
  onConfirmBooking,
  onSubmitMessage,
  onCancelScheduling,
  onCancelMessaging
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="ps-chat-container">
      <div className="ps-chat-header">
        <h3>💼 Portfolio Secretary</h3>
        <p>Ask me about Herve's work, book a meeting, or leave a message!</p>
      </div>
      
      <div className="ps-quick-actions">
        {QUICK_ACTIONS.map(action => (
          <button
            key={action.id}
            className="ps-quick-btn"
            onClick={() => onQuickAction(action.action)}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="ps-chat-messages">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Show forms based on conversation state */}
        {conversationState === 'scheduling' && (
          <div className="ps-message ps-bot-message">
            <SchedulingForm
              schedulingData={schedulingData}
              onSchedulingDataChange={onSchedulingDataChange}
              onCheckAvailability={onCheckAvailability}
              onCancel={onCancelScheduling}
              availableSlots={availableSlots}
              selectedSlot={selectedSlot}
              onSlotSelect={onSlotSelect}
              onConfirmBooking={onConfirmBooking}
              showSlots={availableSlots.length > 0}
            />
          </div>
        )}
        
        {conversationState === 'messaging' && (
          <div className="ps-message ps-bot-message">
            <MessagingForm
              messageData={messageData}
              onMessageDataChange={onMessageDataChange}
              onSubmitMessage={onSubmitMessage}
              onCancel={onCancelMessaging}
            />
          </div>
        )}
        
        {isTyping && (
          <div className="ps-typing-indicator">
            Secretary is typing...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="ps-chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;