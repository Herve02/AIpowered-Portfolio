// components/MessagingForm.tsx
import React from 'react';
import { MessageData } from './Types';

interface MessagingFormProps {
  messageData: MessageData;
  onMessageDataChange: (data: MessageData) => void;
  onSubmitMessage: () => void;
  onCancel: () => void;
}

const MessagingForm: React.FC<MessagingFormProps> = ({
  messageData,
  onMessageDataChange,
  onSubmitMessage,
  onCancel
}) => {
  const handleInputChange = (field: keyof MessageData, value: string | boolean) => {
    onMessageDataChange({
      ...messageData,
      [field]: value
    });
  };

  const isFormValid = messageData.name && 
                     messageData.email && 
                     messageData.topic && 
                     messageData.content && 
                     messageData.consent;

  return (
    <div className="ps-scheduling-form">
      <div className="ps-form-group">
        <label>Full Name *</label>
        <input
          type="text"
          value={messageData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      <div className="ps-form-group">
        <label>Email *</label>
        <input
          type="email"
          value={messageData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>
      <div className="ps-form-group">
        <label>Topic *</label>
        <input
          type="text"
          value={messageData.topic}
          onChange={(e) => handleInputChange('topic', e.target.value)}
          placeholder="Brief topic summary"
          required
        />
      </div>
      <div className="ps-form-group">
        <label>Message *</label>
        <textarea
          value={messageData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          placeholder="Your message to Herve..."
          required
          style={{ minHeight: '100px' }}
        />
      </div>
      <div className="ps-form-group">
        <label>
          <input
            type="checkbox"
            checked={messageData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            required
          />
          I consent to being contacted regarding this message
        </label>
      </div>
      <div className="ps-form-actions">
        <button
          className="ps-btn ps-btn-primary"
          onClick={onSubmitMessage}
          disabled={!isFormValid}
        >
          Send Message
        </button>
        <button className="ps-btn ps-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MessagingForm;