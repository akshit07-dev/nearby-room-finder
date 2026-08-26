import React from 'react';
import { X, Heart, Trash2, ExternalLink } from 'lucide-react';
import { formatCurrency, formatDistance } from '../../utils/distance';
import './SavedRoomsModal.css';

export default function SavedRoomsModal({
  savedRooms = [],
  onClose,
  onRemoveSaved,
  onSelectRoom,
  onClearAllSaved
}) {
  return (
    <div className="rf-modal-overlay" onClick={onClose}>
      <div className="rf-modal-content rf-saved-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="rf-modal-header">
          <div className="rf-saved-header-title">
            <Heart size={18} className="rf-saved-heart-icon" fill="#f43f5e" color="#f43f5e" />
            <div>
              <h3>Saved Rooms & Wishlist ({savedRooms.length})</h3>
              <p>Quickly access your favorite spaces</p>
            </div>
          </div>

          <div className="rf-modal-header__actions">
            {savedRooms.length > 0 && (
              <button className="rf-saved-clear-btn" onClick={onClearAllSaved}>
                Clear All
              </button>
            )}
            <button className="rf-modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* List of Saved Items */}
        <div className="rf-saved-body">
          {savedRooms.length === 0 ? (
            <div className="rf-saved-empty">
              <Heart size={42} className="rf-saved-empty-icon" />
              <h4>No saved rooms yet</h4>
              <p>Click the heart icon on any room card to save it for quick reference later.</p>
            </div>
          ) : (
            <div className="rf-saved-list">
              {savedRooms.map((room) => (
                <div key={room.id} className="rf-saved-item">
                  <img src={room.images[0]} alt={room.title} className="rf-saved-thumb" />
                  
                  <div className="rf-saved-info">
                    <span className="rf-badge rf-badge-blue">{room.type}</span>
                    <h4 className="rf-saved-title">{room.title}</h4>
                    <p className="rf-saved-address">{room.location.address}</p>
                    <span className="rf-saved-price">{formatCurrency(room.rent)}/mo</span>
                  </div>

                  <div className="rf-saved-actions">
                    <button
                      className="rf-btn rf-btn--post"
                      onClick={() => {
                        onSelectRoom(room);
                        onClose();
                      }}
                    >
                      <span>View</span>
                      <ExternalLink size={13} />
                    </button>
                    <button
                      className="rf-saved-delete-btn"
                      onClick={() => onRemoveSaved(room.id)}
                      title="Remove from saved"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
