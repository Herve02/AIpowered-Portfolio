// components/ChatMessage.tsx
import React from 'react';
import { Message } from './Types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatContent = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={`ps-message ps-${message.sender}-message`}>
      {message.isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
      )}
    </div>
  );
};

export default ChatMessage;