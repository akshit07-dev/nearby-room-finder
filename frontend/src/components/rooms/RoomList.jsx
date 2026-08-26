import React from 'react';
import RoomCard from './RoomCard';
import { Home, Sparkles, RotateCcw } from 'lucide-react';
import './RoomList.css';

export default function RoomList({
  rooms = [],
  savedRoomIds = [],
  onToggleSave,
  comparedRoomIds = [],
  onToggleCompare,
  onSelectRoom,
  onHoverRoom,
  onScheduleVisit,
  onContactLandlord,
  onResetFilters,
  viewMode = 'split'
}) {
  if (rooms.length === 0) {
    return (
      <div className="rf-empty-state animate-fade-in">
        <div className="rf-empty-state__icon-wrap">
          <Home size={36} className="rf-empty-state__icon" />
        </div>
        <h3 className="rf-empty-state__title">No rooms found matching your filters</h3>
        <p className="rf-empty-state__desc">
          Try adjusting your budget range, widening your search radius, or clearing specific amenities to see more rooms near you.
        </p>
        <button className="rf-btn rf-btn--post" onClick={onResetFilters}>
          <RotateCcw size={15} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`rf-room-grid rf-room-grid--${viewMode}`}>
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          distanceKm={room.calculatedDistance}
          isSaved={savedRoomIds.includes(room.id)}
          onToggleSave={onToggleSave}
          isCompared={comparedRoomIds.includes(room.id)}
          onToggleCompare={onToggleCompare}
          onSelectRoom={onSelectRoom}
          onHoverRoom={onHoverRoom}
          onScheduleVisit={onScheduleVisit}
          onContactLandlord={onContactLandlord}
        />
      ))}
    </div>
  );
}
