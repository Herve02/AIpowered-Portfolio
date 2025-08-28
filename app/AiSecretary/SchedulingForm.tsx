// components/SchedulingForm.tsx
import React from 'react';
import { SchedulingData, AvailableSlot } from './Types';
import { DURATION_OPTIONS, MEETING_TYPES } from './Data';

interface SchedulingFormProps {
  schedulingData: SchedulingData;
  onSchedulingDataChange: (data: SchedulingData) => void;
  onCheckAvailability: () => void;
  onCancel: () => void;
  availableSlots: AvailableSlot[];
  selectedSlot: AvailableSlot | null;
  onSlotSelect: (slot: AvailableSlot) => void;
  onConfirmBooking: () => void;
  showSlots: boolean;
}

const SchedulingForm: React.FC<SchedulingFormProps> = ({
  schedulingData,
  onSchedulingDataChange,
  onCheckAvailability,
  onCancel,
  availableSlots,
  selectedSlot,
  onSlotSelect,
  onConfirmBooking,
  showSlots
}) => {
  const handleInputChange = (field: keyof SchedulingData, value: string) => {
    onSchedulingDataChange({
      ...schedulingData,
      [field]: value
    });
  };

  const isFormValid = schedulingData.name && schedulingData.email && schedulingData.purpose;

  if (showSlots) {
    return (
      <div className="ps-scheduling-form">
        <h4>Available Time Slots:</h4>
        <div className="ps-availability-slots">
          {availableSlots.map(slot => (
            <div
              key={slot.id}
              className={`ps-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
              onClick={() => onSlotSelect(slot)}
            >
              {slot.display}
            </div>
          ))}
        </div>
        <div className="ps-form-actions">
          <button
            className="ps-btn ps-btn-primary"
            onClick={onConfirmBooking}
            disabled={!selectedSlot}
          >
            Confirm Booking
          </button>
          <button className="ps-btn ps-btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-scheduling-form">
      <div className="ps-form-group">
        <label>Full Name *</label>
        <input
          type="text"
          value={schedulingData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      <div className="ps-form-group">
        <label>Email *</label>
        <input
          type="email"
          value={schedulingData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>
      <div className="ps-form-group">
        <label>Meeting Purpose *</label>
        <textarea
          value={schedulingData.purpose}
          onChange={(e) => handleInputChange('purpose', e.target.value)}
          placeholder="What would you like to discuss?"
          required
        />
      </div>
      <div className="ps-form-group">
        <label>Duration *</label>
        <select
          value={schedulingData.duration}
          onChange={(e) => handleInputChange('duration', e.target.value)}
        >
          {DURATION_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="ps-form-group">
        <label>Meeting Type *</label>
        <select
          value={schedulingData.type}
          onChange={(e) => handleInputChange('type', e.target.value as any)}
        >
          {MEETING_TYPES.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="ps-form-group">
        <label>Preferred Date Range</label>
        <input
          type="date"
          value={schedulingData.date || ''}
          onChange={(e) => handleInputChange('date', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="ps-form-actions">
        <button
          className="ps-btn ps-btn-primary"
          onClick={onCheckAvailability}
          disabled={!isFormValid}
        >
          Check Availability
        </button>
        <button className="ps-btn ps-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SchedulingForm;