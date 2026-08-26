import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  MapPin, 
  Wifi, 
  Wind, 
  Bath, 
  Utensils, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  PhoneCall, 
  MessageSquare, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { formatDistance, formatCurrency } from '../../utils/distance';
import './RoomCard.css';

export default function RoomCard({
  room,
  distanceKm,
  isSaved,
  onToggleSave,
  isCompared,
  onToggleCompare,
  onSelectRoom,
  onHoverRoom,
  onScheduleVisit,
  onContactLandlord
}) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const images = room.images && room.images.length > 0 
    ? room.images 
    : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`rf-card ${isCompared ? 'rf-card--compared' : ''}`}
      onMouseEnter={() => onHoverRoom && onHoverRoom(room.id)}
      onMouseLeave={() => onHoverRoom && onHoverRoom(null)}
      onClick={() => onSelectRoom(room)}
    >
      {/* Media & Carousel Container */}
      <div className="rf-card__media">
        <img
          src={images[currentImgIdx]}
          alt={room.title}
          className="rf-card__img"
          loading="lazy"
        />

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="rf-card__carousel-btn rf-card__carousel-btn--prev"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="rf-card__carousel-btn rf-card__carousel-btn--next"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
            {/* Dots */}
            <div className="rf-card__dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`rf-card__dot ${idx === currentImgIdx ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges Overlay */}
        <div className="rf-card__badge-row-top">
          <div className="rf-card__badges-left">
            {room.isVerified && (
              <span className="rf-badge rf-badge-emerald">
                <ShieldCheck size={12} />
                <span>Verified</span>
              </span>
            )}
            {room.isNoBrokerage && (
              <span className="rf-badge rf-badge-blue">
                <span>Zero Brokerage</span>
              </span>
            )}
          </div>

          {/* Heart / Wishlist Button */}
          <button
            className={`rf-card__wishlist-btn ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(room.id);
            }}
            title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
            aria-label="Save room"
          >
            <Heart size={16} fill={isSaved ? '#f43f5e' : 'none'} color={isSaved ? '#f43f5e' : '#ffffff'} />
          </button>
        </div>

        {/* Bottom Distance & Type Pill */}
        <div className="rf-card__badge-row-bottom">
          <span className="rf-card__distance-pill">
            <MapPin size={12} />
            <span>{formatDistance(distanceKm)}</span>
          </span>
          <span className="rf-card__type-pill">
            {room.type}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="rf-card__body">
        {/* Title & Rating */}
        <div className="rf-card__header-row">
          <h3 className="rf-card__title" title={room.title}>
            {room.title}
          </h3>
          <div className="rf-card__rating">
            <Star size={13} className="rf-star-icon" />
            <span className="rf-rating-val">{room.rating}</span>
            <span className="rf-review-count">({room.reviewCount})</span>
          </div>
        </div>

        {/* Address / Landmark */}
        <p className="rf-card__address">
          <MapPin size={13} className="rf-address-icon" />
          <span>{room.location.address}</span>
        </p>

        {/* Specs & Attributes Chips */}
        <div className="rf-card__specs">
          <span className="rf-card__spec-item">{room.furnishing}</span>
          <span className="rf-card__spec-dot">•</span>
          <span className="rf-card__spec-item">{room.gender} Friendly</span>
          {room.areaSqFt && (
            <>
              <span className="rf-card__spec-dot">•</span>
              <span className="rf-card__spec-item">{room.areaSqFt} sq ft</span>
            </>
          )}
        </div>

        {/* Key Amenities Preview */}
        <div className="rf-card__amenities">
          <span className="rf-card__amenity-tag" title="High-Speed Wi-Fi">
            <Wifi size={13} />
            <span>Wi-Fi</span>
          </span>
          <span className="rf-card__amenity-tag" title="Air Conditioner">
            <Wind size={13} />
            <span>AC</span>
          </span>
          <span className="rf-card__amenity-tag" title="Attached Bathroom">
            <Bath size={13} />
            <span>Attached Bath</span>
          </span>
        </div>

        {/* Landlord Snippet */}
        <div className="rf-card__host-row">
          <img src={room.owner.avatar} alt={room.owner.name} className="rf-card__host-avatar" />
          <div className="rf-card__host-info">
            <span className="rf-card__host-name">{room.owner.name}</span>
            <span className="rf-card__host-res">⚡ Responds {room.owner.responseTime}</span>
          </div>

          {/* Compare Checkbox */}
          <label
            className="rf-card__compare-label"
            onClick={(e) => e.stopPropagation()}
            title="Compare up to 3 rooms side by side"
          >
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(room.id)}
              className="rf-card__compare-chk"
            />
            <span>Compare</span>
          </label>
        </div>

        {/* Footer: Price & Quick Action Buttons */}
        <div className="rf-card__footer">
          <div className="rf-card__price-wrap">
            <span className="rf-card__price">{formatCurrency(room.rent)}</span>
            <span className="rf-card__period">/month</span>
            {room.deposit && (
              <span className="rf-card__deposit">Dep: {formatCurrency(room.deposit)}</span>
            )}
          </div>

          <div className="rf-card__actions">
            <button
              className="rf-card__btn rf-card__btn--visit"
              onClick={(e) => {
                e.stopPropagation();
                onScheduleVisit(room);
              }}
              title="Schedule a visit or virtual tour"
            >
              <Calendar size={13} />
              <span>Visit</span>
            </button>

            <button
              className="rf-card__btn rf-card__btn--contact"
              onClick={(e) => {
                e.stopPropagation();
                onContactLandlord(room);
              }}
              title="Contact Owner via WhatsApp or Phone"
            >
              <MessageSquare size={13} />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
