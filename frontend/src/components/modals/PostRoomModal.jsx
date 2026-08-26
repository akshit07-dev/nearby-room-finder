import React, { useState } from 'react';
import { 
  X, 
  Building, 
  MapPin, 
  DollarSign, 
  Check, 
  Upload, 
  Sparkles, 
  ShieldCheck, 
  Plus,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { roomApi } from '../../api/services';
import './PostRoomModal.css';

const DEFAULT_ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
];

export default function PostRoomModal({ onClose, onAddRoom }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Single Room',
    category: 'single',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: '',
    deposit: '',
    maintenance: '',
    areaSqFt: '250',
    availableFrom: 'Immediate',
    address: '',
    locality: 'Koramangala',
    lat: 12.9352,
    lng: 77.6245,
    description: '',
    ownerName: '',
    ownerPhone: '',
    amenities: ['High-Speed Wi-Fi', 'Attached Bathroom', 'Air Conditioner', 'Daily Housekeeping']
  });

  const availableAmenities = [
    'High-Speed Wi-Fi',
    'Attached Bathroom',
    'Air Conditioner',
    'Daily Housekeeping',
    'Washing Machine',
    '24/7 Power Backup',
    'Private Balcony',
    'Meals Included',
    'Covered Parking',
    'RO Water Purifier',
    'Elevator / Lift',
    'Gym Access'
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.rent || !formData.address || !formData.ownerName) {
      alert('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const roomPayload = {
        title: formData.title,
        type: formData.type,
        category: formData.type === 'Studio' ? 'studio' : (formData.type.toLowerCase().includes('pg') ? 'pg' : 'single'),
        gender: formData.gender,
        furnishing: formData.furnishing,
        rent: Number(formData.rent) || 12000,
        deposit: Number(formData.deposit) || 20000,
        maintenance: Number(formData.maintenance) || 0,
        availableFrom: formData.availableFrom || 'Immediate',
        areaSqFt: Number(formData.areaSqFt) || 250,
        address: formData.address,
        locality: formData.locality,
        lat: formData.lat + (Math.random() - 0.5) * 0.01,
        lng: formData.lng + (Math.random() - 0.5) * 0.01,
        images: DEFAULT_ROOM_IMAGES,
        amenities: formData.amenities,
        description: formData.description || 'Spacious, well-ventilated room in a prime and peaceful locality. Friendly owner with zero brokerage.',
        houseRules: ['Non-smoking inside room', 'Quiet hours after 11 PM'],
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone || '+91 98450 11223'
      };

      const res = await roomApi.create(roomPayload);
      const createdRoom = res.data || res;

      onAddRoom(createdRoom);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to list room. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rf-modal-overlay" onClick={onClose}>
      <div className="rf-modal-content rf-post-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="rf-modal-header">
          <div className="rf-post-header-title">
            <Sparkles size={18} className="rf-post-sparkle" />
            <div>
              <h3>List Your Room / Property</h3>
              <p>Reach thousands of verified room seekers nearby (100% Free)</p>
            </div>
          </div>
          <button className="rf-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="rf-post-steps">
          <div className={`rf-post-step ${step >= 1 ? 'active' : ''}`}>
            <span className="rf-step-num">1</span>
            <span>Basic Details</span>
          </div>
          <div className="rf-post-step-line" />
          <div className={`rf-post-step ${step >= 2 ? 'active' : ''}`}>
            <span className="rf-step-num">2</span>
            <span>Rent & Location</span>
          </div>
          <div className="rf-post-step-line" />
          <div className={`rf-post-step ${step >= 3 ? 'active' : ''}`}>
            <span className="rf-step-num">3</span>
            <span>Amenities & Host</span>
          </div>
        </div>

        {/* Wizard Form Body */}
        <form onSubmit={handleSubmit} className="rf-post-form">
          {step === 1 && (
            <div className="rf-post-step-content animate-fade-in">
              <div className="rf-form-group">
                <label>Listing Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Spacious Sunny Studio with Balcony & AC"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="rf-form-input"
                  required
                />
              </div>

              <div className="rf-post-row-2">
                <div className="rf-form-group">
                  <label>Room / Property Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="rf-form-select"
                  >
                    <option value="Single Room">Single Private Room</option>
                    <option value="Shared / PG">Shared PG Room</option>
                    <option value="Studio Apartment">Studio Apartment</option>
                    <option value="1 BHK">1 BHK Flat</option>
                    <option value="2 BHK">2 BHK Flat</option>
                  </select>
                </div>

                <div className="rf-form-group">
                  <label>Furnishing Status</label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => handleInputChange('furnishing', e.target.value)}
                    className="rf-form-select"
                  >
                    <option value="Furnished">Fully Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              <div className="rf-post-row-2">
                <div className="rf-form-group">
                  <label>Gender Preference</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="rf-form-select"
                  >
                    <option value="Any">Any / Unisex</option>
                    <option value="Male">Male Flatmates Only</option>
                    <option value="Female">Female Only (Girls PG)</option>
                  </select>
                </div>

                <div className="rf-form-group">
                  <label>Room Area (Approx Sq Ft)</label>
                  <input
                    type="number"
                    value={formData.areaSqFt}
                    onChange={(e) => handleInputChange('areaSqFt', e.target.value)}
                    className="rf-form-input"
                    placeholder="250"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rf-post-step-content animate-fade-in">
              <div className="rf-post-row-3">
                <div className="rf-form-group">
                  <label>Monthly Rent (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 14000"
                    value={formData.rent}
                    onChange={(e) => handleInputChange('rent', e.target.value)}
                    className="rf-form-input"
                    required
                  />
                </div>

                <div className="rf-form-group">
                  <label>Security Deposit (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 25000"
                    value={formData.deposit}
                    onChange={(e) => handleInputChange('deposit', e.target.value)}
                    className="rf-form-input"
                  />
                </div>

                <div className="rf-form-group">
                  <label>Maintenance (₹/mo)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.maintenance}
                    onChange={(e) => handleInputChange('maintenance', e.target.value)}
                    className="rf-form-input"
                  />
                </div>
              </div>

              <div className="rf-form-group">
                <label>Exact Street Address & Landmark *</label>
                <input
                  type="text"
                  placeholder="e.g. #14, 5th Cross, Near Sony Signal, Koramangala"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="rf-form-input"
                  required
                />
              </div>

              <div className="rf-post-row-2">
                <div className="rf-form-group">
                  <label>Locality / Sector</label>
                  <select
                    value={formData.locality}
                    onChange={(e) => handleInputChange('locality', e.target.value)}
                    className="rf-form-select"
                  >
                    <option value="Koramangala">Koramangala, Bangalore</option>
                    <option value="HSR Layout">HSR Layout, Bangalore</option>
                    <option value="Indiranagar">Indiranagar, Bangalore</option>
                    <option value="Whitefield">Whitefield, Bangalore</option>
                    <option value="BTM Layout">BTM Layout, Bangalore</option>
                  </select>
                </div>

                <div className="rf-form-group">
                  <label>Available From</label>
                  <input
                    type="text"
                    placeholder="Immediate / 1st of next month"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    className="rf-form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rf-post-step-content animate-fade-in">
              <div className="rf-form-group">
                <label>Select Amenities Provided</label>
                <div className="rf-post-amenities-wrap">
                  {availableAmenities.map((amenity) => {
                    const checked = formData.amenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        className={`rf-post-amenity-pill ${checked ? 'active' : ''}`}
                        onClick={() => handleToggleAmenity(amenity)}
                      >
                        {checked && <Check size={14} />}
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rf-post-row-2">
                <div className="rf-form-group">
                  <label>Owner / Host Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    className="rf-form-input"
                    required
                  />
                </div>

                <div className="rf-form-group">
                  <label>WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98450 12345"
                    value={formData.ownerPhone}
                    onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                    className="rf-form-input"
                    required
                  />
                </div>
              </div>

              <div className="rf-form-group">
                <label>Short Description / House Rules</label>
                <textarea
                  rows="3"
                  placeholder="Describe your space, sunlight, balcony, flatmates, and any specific preferences..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="rf-form-textarea"
                />
              </div>
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="rf-post-footer">
            {step > 1 ? (
              <button
                type="button"
                className="rf-btn rf-btn--login"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                className="rf-btn rf-btn--post"
                onClick={() => {
                  if (step === 1 && !formData.title.trim()) {
                    alert('Please enter a listing title');
                    return;
                  }
                  if (step === 2 && (!formData.rent || !formData.address.trim())) {
                    alert('Please enter rent and street address');
                    return;
                  }
                  setStep(step + 1);
                }}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button type="submit" className="rf-btn rf-btn--post" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Publishing Listing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Publish Room Listing</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
