import React from 'react';
import { X, Layers, Check, Minus, Star, MapPin, Trash2 } from 'lucide-react';
import { formatCurrency, formatDistance } from '../../utils/distance';
import './CompareModal.css';

export default function CompareModal({
  comparedRooms = [],
  onClose,
  onRemoveCompare,
  onSelectRoom
}) {
  if (comparedRooms.length === 0) return null;

  const allAmenities = [
    'High-Speed Wi-Fi',
    'Air Conditioner',
    'Attached Bathroom',
    'Meals / Food Included',
    'Washing Machine',
    '24/7 Power Backup',
    'Balcony',
    'Daily Housekeeping',
    'Covered Parking'
  ];

  return (
    <div className="rf-modal-overlay" onClick={onClose}>
      <div className="rf-modal-content rf-compare-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="rf-modal-header">
          <div className="rf-compare-header-title">
            <Layers size={18} className="rf-compare-icon" />
            <div>
              <h3>Compare Shortlisted Rooms ({comparedRooms.length}/3)</h3>
              <p>Side-by-side feature, price, and distance matrix</p>
            </div>
          </div>
          <button className="rf-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Comparison Grid Table */}
        <div className="rf-compare-body">
          <div className="rf-compare-table">
            {/* Headers / Room Previews */}
            <div className="rf-compare-row rf-compare-row--cards">
              <div className="rf-compare-label-cell">Properties</div>
              {comparedRooms.map((room) => (
                <div key={room.id} className="rf-compare-card-cell">
                  <div className="rf-compare-card-top">
                    <img src={room.images[0]} alt={room.title} className="rf-compare-thumb" />
                    <button
                      className="rf-compare-delete-btn"
                      onClick={() => onRemoveCompare(room.id)}
                      title="Remove from comparison"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <h4 className="rf-compare-room-title">{room.title}</h4>
                  <span className="rf-compare-room-price">{formatCurrency(room.rent)}/mo</span>
                  <button
                    className="rf-btn rf-btn--visit rf-btn--block"
                    onClick={() => {
                      onSelectRoom(room);
                      onClose();
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Row: Distance */}
            <div className="rf-compare-row">
              <div className="rf-compare-label-cell">Distance from You</div>
              {comparedRooms.map((room) => (
                <div key={room.id} className="rf-compare-val-cell">
                  <MapPin size={13} className="rf-text-blue" />
                  <strong>{formatDistance(room.calculatedDistance)}</strong>
                </div>
              ))}
            </div>

            {/* Row: Room Type */}
            <div className="rf-compare-row">
              <div className="rf-compare-label-cell">Type & Category</div>
              {comparedRooms.map((room) => (
                <div key={room.id} className="rf-compare-val-cell">
                  {room.type}
                </div>
              ))}
            </div>

            {/* Row: Security Deposit */}
            <div className="rf-compare-row">
              <div className="rf-compare-label-cell">Security Deposit</div>
              {comparedRooms.map((room) => (
                <div key={room.id} className="rf-compare-val-cell">
                  {formatCurrency(room.deposit)}
                </div>
              ))}
            </div>

            {/* Row: Furnishing */}
            <div className="rf-compare-row">
              <div className="rf-compare-label-cell">Furnishing</div>
              {comparedRooms.map((room) => (
                <div key={room.id} className="rf-compare-val-cell">
                  {room.furnishing}
                </div>
              ))}
            </div>

            {/* Row: Rating */}
            <div className="rf-compare-row">
              <div className="rf-compare-label-cell">Rating & Trust</div>
              {comparedRooms.map((room) => (
                <div key={room.id} className="rf-compare-val-cell">
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <span>{room.rating} ({room.reviewCount})</span>
                </div>
              ))}
            </div>

            {/* Row: Brokerage */}
            <div className="rf-compare-row">
              <div className="rf-compare-label-cell">Brokerage Fee</div>
              {comparedRooms.map((room) => (
                <div key={room.id} className="rf-compare-val-cell">
                  {room.isNoBrokerage ? (
                    <span className="rf-badge rf-badge-emerald">Zero Brokerage</span>
                  ) : (
                    <span>Standard</span>
                  )}
                </div>
              ))}
            </div>

            {/* Amenities Matrix Rows */}
            {allAmenities.map((amenity) => (
              <div key={amenity} className="rf-compare-row">
                <div className="rf-compare-label-cell">{amenity}</div>
                {comparedRooms.map((room) => {
                  const hasAmenity = room.amenities.some((a) =>
                    a.toLowerCase().includes(amenity.toLowerCase().split(' ')[0])
                  );
                  return (
                    <div key={room.id} className="rf-compare-val-cell">
                      {hasAmenity ? (
                        <Check size={16} className="rf-compare-check" />
                      ) : (
                        <Minus size={16} className="rf-compare-minus" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
