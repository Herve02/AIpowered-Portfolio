// components/HeroSection.tsx
import React from 'react';
import { MoodType } from './Types';

interface HeroSectionProps {
  currentMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentMood, onMoodChange }) => {
  const moods: { key: MoodType; label: string }[] = [
    { key: 'professional', label: 'Professional' },
    { key: 'friendly', label: 'Friendly' },
    { key: 'energetic', label: 'Energetic' },
    { key: 'calm', label: 'Calm' }
  ];

  return (
    <div className="ps-hero-section">
      <div className="ps-hero-image">👨‍💻</div>
      <div className="ps-hero-content">
        <h1>Hi, I'm Herve</h1>
        <p>Helping you build websites, streamline digital tools, and grow your business in Kigali, Rwanda.</p>
        <div className="ps-mood-selector">
          {moods.map(mood => (
            <button
              key={mood.key}
              className={`ps-mood-btn ${currentMood === mood.key ? 'active' : ''}`}
              onClick={() => onMoodChange(mood.key)}
            >
              {mood.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;