import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Check, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  Navigation, 
  Home, 
  Info,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import { formatCurrency, formatDistance } from '../../utils/distance';
import confetti from 'canvas-confetti';
import { visitApi, messageApi } from '../../api/services';
import './RoomDetailModal.css';

export default function RoomDetailModal({
  room,
  onClose,
  isSaved,
  onToggleSave,
  onScheduleVisitSuccess,
  onSendMessageSuccess
}) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [visitType, setVisitType] = useState('in_person');
  const [visitDate, setVisitDate] = useState('Tomorrow');
  const [visitTimeSlot, setVisitTimeSlot] = useState('4:00 PM - 6:00 PM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isSubmittingVisit, setIsSubmittingVisit] = useState(false);
  const [visitBooked, setVisitBooked] = useState(false);

  if (!room) return null;

  const images = room.images || [];

  const handleBookVisit = async (e) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) {
      alert('Please enter your name and contact phone number');
      return;
    }
    setIsSubmittingVisit(true);
    try {
      await visitApi.book({
        roomId: room.id,
        roomTitle: room.title,
        visitType,
        visitDate,
        visitTimeSlot,
        visitorName: visitorName.trim(),
        visitorPhone: visitorPhone.trim()
      });

      setIsSubmittingVisit(false);
      setVisitBooked(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      onScheduleVisitSuccess && onScheduleVisitSuccess({
        roomTitle: room.title,
        date: visitDate,
        time: visitTimeSlot,
        type: visitType
      });
    } catch (err) {
      setIsSubmittingVisit(false);
      alert(err.message || 'Failed to book visit. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    try {
      await messageApi.send({
        roomId: room.id,
        hostName: room.owner?.name,
        hostId: room.owner?.id,
        message: chatMessage.trim()
      });
      onSendMessageSuccess && onSendMessageSuccess(room.owner?.name || 'Host', chatMessage);
      setChatMessage('');
    } catch (err) {
      alert(err.message || 'Failed to send message.');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link to this room copied to clipboard!');
    }
  };

  return (
    <div className="rf-modal-overlay" onClick={onClose}>
      <div className="rf-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Controls */}
        <div className="rf-modal-header">
          <div className="rf-modal-header__left">
            <span className="rf-badge rf-badge-blue">{room.type}</span>
            {room.isVerified && (
              <span className="rf-badge rf-badge-emerald">
                <ShieldCheck size={12} />
                <span>Verified Direct Owner</span>
              </span>
            )}
            {room.isNoBrokerage && (
              <span className="rf-badge rf-badge-emerald">Zero Brokerage</span>
            )}
          </div>

          <div className="rf-modal-header__actions">
            <button
              className={`rf-modal-icon-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => onToggleSave(room.id)}
              title={isSaved ? 'Remove from Wishlist' : 'Save room'}
            >
              <Heart size={18} fill={isSaved ? '#f43f5e' : 'none'} color={isSaved ? '#f43f5e' : '#64748b'} />
            </button>
            <button className="rf-modal-icon-btn" onClick={handleShare} title="Share listing">
              <Share2 size={18} />
            </button>
            <button className="rf-modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="rf-modal-body">
          {/* Main Photo Gallery */}
          <div className="rf-gallery">
            <div className="rf-gallery__main-wrap">
              <img
                src={images[selectedImgIdx]}
                alt={room.title}
                className="rf-gallery__main-img"
              />
              {images.length > 1 && (
                <>
                  <button
                    className="rf-gallery__nav-btn prev"
                    onClick={() => setSelectedImgIdx((prev) => (prev - 1 + images.length) % images.length)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    className="rf-gallery__nav-btn next"
                    onClick={() => setSelectedImgIdx((prev) => (prev + 1) % images.length)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="rf-gallery__thumbs">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`rf-gallery__thumb ${idx === selectedImgIdx ? 'active' : ''}`}
                    onClick={() => setSelectedImgIdx(idx)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid: Left Details & Right Booking Card */}
          <div className="rf-modal-grid">
            {/* Left Column: Room Details */}
            <div className="rf-modal-details">
              {/* Title & Location */}
              <div className="rf-detail-section">
                <div className="rf-detail-rating-row">
                  <div className="rf-rating-tag">
                    <Star size={14} className="rf-star-icon" />
                    <span>{room.rating}</span>
                    <span className="rf-review-count">({room.reviewCount} reviews)</span>
                  </div>
                  <span className="rf-detail-avail">Available: {room.availableFrom}</span>
                </div>

                <h2 className="rf-detail-title">{room.title}</h2>
                <p className="rf-detail-address">
                  <MapPin size={15} className="rf-pin-icon" />
                  <span>{room.location.address}, {room.location.locality}</span>
                </p>

                {/* Key Specs Bar */}
                <div className="rf-specs-bar">
                  <div className="rf-spec-box">
                    <span className="rf-spec-label">Room Type</span>
                    <strong className="rf-spec-val">{room.type}</strong>
                  </div>
                  <div className="rf-spec-box">
                    <span className="rf-spec-label">Furnishing</span>
                    <strong className="rf-spec-val">{room.furnishing}</strong>
                  </div>
                  <div className="rf-spec-box">
                    <span className="rf-spec-label">Gender Allowed</span>
                    <strong className="rf-spec-val">{room.gender}</strong>
                  </div>
                  <div className="rf-spec-box">
                    <span className="rf-spec-label">Carpet Area</span>
                    <strong className="rf-spec-val">{room.areaSqFt} sq ft</strong>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rf-detail-section">
                <h3 className="rf-section-heading">About this Space</h3>
                <p className="rf-detail-description">{room.description}</p>
              </div>

              {/* Price Breakdown */}
              <div className="rf-detail-section">
                <h3 className="rf-section-heading">Transparent Fee Breakdown</h3>
                <div className="rf-price-table">
                  <div className="rf-price-row">
                    <span>Monthly Rent</span>
                    <strong>{formatCurrency(room.rent)}</strong>
                  </div>
                  <div className="rf-price-row">
                    <span>Security Deposit (100% Refundable)</span>
                    <strong>{formatCurrency(room.deposit)}</strong>
                  </div>
                  <div className="rf-price-row">
                    <span>Monthly Society Maintenance</span>
                    <strong>{room.maintenance ? formatCurrency(room.maintenance) : 'Included'}</strong>
                  </div>
                  <div className="rf-price-row">
                    <span>Electricity & Water Policy</span>
                    <span className="rf-price-note">{room.electricityRule}</span>
                  </div>
                  <div className="rf-price-row rf-price-row--total">
                    <span>Estimated Monthly Total</span>
                    <strong>{formatCurrency(room.rent + (room.maintenance || 0))}</strong>
                  </div>
                </div>
              </div>

              {/* Verified Amenities */}
              <div className="rf-detail-section">
                <h3 className="rf-section-heading">Verified Amenities</h3>
                <div className="rf-amenities-grid">
                  {room.amenities.map((item, idx) => (
                    <div key={idx} className="rf-amenity-item">
                      <Check size={16} className="rf-amenity-check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Landmarks & Commute Times */}
              <div className="rf-detail-section">
                <h3 className="rf-section-heading">Nearby Transit & Landmarks</h3>
                <div className="rf-landmarks-list">
                  {room.location.landmarks?.map((lm, idx) => (
                    <div key={idx} className="rf-landmark-item">
                      <div className="rf-landmark-icon-wrap">
                        <Navigation size={14} />
                      </div>
                      <div className="rf-landmark-info">
                        <strong>{lm.name}</strong>
                        <span>{lm.distance} • {lm.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="rf-detail-section">
                <h3 className="rf-section-heading">House Rules & Policies</h3>
                <ul className="rf-rules-list">
                  {room.houseRules.map((rule, idx) => (
                    <li key={idx}>• {rule}</li>
                  ))}
                </ul>
              </div>

              {/* Landlord Profile */}
              <div className="rf-detail-section rf-host-card">
                <img src={room.owner.avatar} alt={room.owner.name} className="rf-host-avatar" />
                <div className="rf-host-meta">
                  <div className="rf-host-badge-row">
                    <h4 className="rf-host-name">{room.owner.name}</h4>
                    {room.owner.verifiedId && (
                      <span className="rf-badge rf-badge-emerald">Verified Host</span>
                    )}
                  </div>
                  <p className="rf-host-role">{room.owner.role} • Member since {room.owner.memberSince}</p>
                  <p className="rf-host-response">⚡ Typically responds {room.owner.responseTime}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Schedule Visit & Connect Box */}
            <div className="rf-modal-sidebar">
              <div className="rf-sidebar-card">
                <div className="rf-sidebar-price-header">
                  <div>
                    <span className="rf-sidebar-price">{formatCurrency(room.rent)}</span>
                    <span className="rf-sidebar-per">/month</span>
                  </div>
                  <span className="rf-sidebar-tag">Zero Brokerage</span>
                </div>

                {visitBooked ? (
                  <div className="rf-booked-success animate-fade-in">
                    <div className="rf-booked-icon">
                      <Check size={28} />
                    </div>
                    <h4>Visit Scheduled!</h4>
                    <p>
                      The owner <strong>{room.owner.name}</strong> has been notified for your {visitType === 'in_person' ? 'in-person visit' : 'virtual 360 tour'} on <strong>{visitDate} ({visitTimeSlot})</strong>.
                    </p>
                    <div className="rf-booked-phone">
                      <Phone size={14} />
                      <span>Host Phone: {room.owner.phone}</span>
                    </div>
                    <button
                      className="rf-btn rf-btn--login rf-btn--block"
                      onClick={() => setVisitBooked(false)}
                    >
                      Reschedule Visit
                    </button>
                  </div>
                ) : (
                  <form className="rf-visit-form" onSubmit={handleBookVisit}>
                    <h4 className="rf-form-title">Schedule a Free Visit</h4>

                    {/* Visit Type Switcher */}
                    <div className="rf-visit-type-tabs">
                      <button
                        type="button"
                        className={`rf-visit-type-tab ${visitType === 'in_person' ? 'active' : ''}`}
                        onClick={() => setVisitType('in_person')}
                      >
                        In-Person Visit
                      </button>
                      <button
                        type="button"
                        className={`rf-visit-type-tab ${visitType === 'virtual' ? 'active' : ''}`}
                        onClick={() => setVisitType('virtual')}
                      >
                        Virtual Video Tour
                      </button>
                    </div>

                    {/* Date Selector */}
                    <div className="rf-form-group">
                      <label>Preferred Day</label>
                      <div className="rf-pill-options">
                        {['Today', 'Tomorrow', 'This Weekend'].map((day) => (
                          <button
                            type="button"
                            key={day}
                            className={`rf-pill-option ${visitDate === day ? 'selected' : ''}`}
                            onClick={() => setVisitDate(day)}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slot */}
                    <div className="rf-form-group">
                      <label>Time Slot</label>
                      <select
                        value={visitTimeSlot}
                        onChange={(e) => setVisitTimeSlot(e.target.value)}
                        className="rf-form-select"
                      >
                        <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                        <option value="2:00 PM - 4:00 PM">Afternoon (2:00 PM - 4:00 PM)</option>
                        <option value="4:00 PM - 6:00 PM">Evening (4:00 PM - 6:00 PM)</option>
                        <option value="6:00 PM - 8:00 PM">Night (6:00 PM - 8:00 PM)</option>
                      </select>
                    </div>

                    {/* Contact Inputs */}
                    <div className="rf-form-group">
                      <label>Your Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sneha Roy"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="rf-form-input"
                        required
                      />
                    </div>

                    <div className="rf-form-group">
                      <label>Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        className="rf-form-input"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="rf-btn rf-btn--post rf-btn--block"
                      disabled={isSubmittingVisit}
                    >
                      <Calendar size={16} />
                      <span>{isSubmittingVisit ? 'Scheduling...' : 'Confirm Free Visit'}</span>
                    </button>
                  </form>
                )}

                {/* Direct Connect Options */}
                <div className="rf-sidebar-contact-row">
                  <a
                    href={`https://wa.me/${room.owner.whatsapp?.replace(/[^0-9]/g, '') || '919845012890'}?text=Hi%20${encodeURIComponent(room.owner.name)},%20I%20am%20interested%20in%20your%20room%20"${encodeURIComponent(room.title)}"`}
                    target="_blank"
                    rel="noreferrer"
                    className="rf-contact-btn rf-contact-btn--whatsapp"
                  >
                    <MessageSquare size={15} />
                    <span>WhatsApp Owner</span>
                  </a>
                  <a
                    href={`tel:${room.owner.phone}`}
                    className="rf-contact-btn rf-contact-btn--call"
                  >
                    <Phone size={15} />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
