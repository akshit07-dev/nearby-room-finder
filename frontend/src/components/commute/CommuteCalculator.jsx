import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Car, 
  Bike, 
  Train, 
  Footprints, 
  Building2, 
  Search,
  ExternalLink
} from 'lucide-react';
import { calculateDistance, estimateCommuteTime, formatCurrency } from '../../utils/distance';
import './CommuteCalculator.css';

const POPULAR_DESTINATIONS = [
  { id: 'dest-1', name: 'RMZ Ecospace Tech Park, Bellandur', lat: 12.9260, lng: 77.6830, tag: 'IT Hub' },
  { id: 'dest-2', name: 'Embassy GolfLinks (EGL), Domlur', lat: 12.9490, lng: 77.6430, tag: 'Business Park' },
  { id: 'dest-3', name: 'Indiranagar Purple Line Metro', lat: 12.9784, lng: 77.6408, tag: 'Metro Station' },
  { id: 'dest-4', name: 'Christ University, Hosur Road', lat: 12.9340, lng: 77.6060, tag: 'College Campus' },
  { id: 'dest-5', name: 'Sony World Signal, Koramangala', lat: 12.9382, lng: 77.6285, tag: 'Central Landmark' }
];

export default function CommuteCalculator({ rooms = [], onSelectRoom }) {
  const [selectedDest, setSelectedDest] = useState(POPULAR_DESTINATIONS[0]);
  const [customDestText, setCustomDestText] = useState('');

  // Calculate commute from each room to selected destination
  const roomsWithCommute = rooms.map((room) => {
    const dist = calculateDistance(
      room.location.lat,
      room.location.lng,
      selectedDest.lat,
      selectedDest.lng
    );

    return {
      ...room,
      commuteDist: dist,
      commuteWalk: estimateCommuteTime(dist, 'walk'),
      commuteBike: estimateCommuteTime(dist, 'bike'),
      commuteTransit: estimateCommuteTime(dist, 'transit'),
      commuteDrive: estimateCommuteTime(dist, 'drive')
    };
  }).sort((a, b) => a.commuteDist - b.commuteDist);

  return (
    <div className="rf-commute-page animate-fade-in">
      {/* Hero */}
      <div className="rf-commute-hero">
        <div className="rf-commute-hero__inner">
          <span className="rf-badge rf-badge-blue">
            <Navigation size={12} />
            <span>Commute Time & Transit Calculator</span>
          </span>
          <h2 className="rf-commute-heading">
            Calculate Commute to Your <span className="rf-text-gradient">Workplace or College</span>
          </h2>
          <p className="rf-commute-sub">
            Pick your office or college hub to see exact walking, biking, metro, and driving times from each nearby room.
          </p>

          {/* Destination Selector Buttons */}
          <div className="rf-dest-pill-group">
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                className={`rf-dest-pill ${selectedDest.id === dest.id ? 'active' : ''}`}
                onClick={() => setSelectedDest(dest)}
              >
                <MapPin size={13} />
                <span>{dest.name.split(',')[0]}</span>
                <small>({dest.tag})</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Matrix */}
      <div className="rf-commute-results">
        <div className="rf-commute-results__header">
          <div>
            <h3>Rooms Ranked by Proximity to: <strong>{selectedDest.name}</strong></h3>
            <p>Showing closest accommodations first for minimal daily travel time</p>
          </div>
        </div>

        <div className="rf-commute-grid">
          {roomsWithCommute.map((room) => (
            <div key={room.id} className="rf-commute-card" onClick={() => onSelectRoom(room)}>
              <img src={room.images[0]} alt={room.title} className="rf-commute-img" />
              
              <div className="rf-commute-body">
                <div className="rf-commute-room-meta">
                  <span className="rf-badge rf-badge-blue">{room.type}</span>
                  <span className="rf-commute-dist-tag">
                    📍 {room.commuteDist} km to {selectedDest.name.split(',')[0]}
                  </span>
                </div>

                <h4 className="rf-commute-title">{room.title}</h4>
                <p className="rf-commute-address">{room.location.address}</p>

                {/* Commute Times Breakdown Grid */}
                <div className="rf-commute-times-grid">
                  <div className="rf-commute-time-box" title="Walking time">
                    <Footprints size={15} className="rf-time-icon walk" />
                    <strong>{room.commuteWalk}</strong>
                    <span>Walk</span>
                  </div>
                  <div className="rf-commute-time-box" title="Bicycle / Two Wheeler time">
                    <Bike size={15} className="rf-time-icon bike" />
                    <strong>{room.commuteBike}</strong>
                    <span>Bike</span>
                  </div>
                  <div className="rf-commute-time-box" title="Metro / Transit time">
                    <Train size={15} className="rf-time-icon transit" />
                    <strong>{room.commuteTransit}</strong>
                    <span>Metro</span>
                  </div>
                  <div className="rf-commute-time-box" title="Cab / Car Driving time">
                    <Car size={15} className="rf-time-icon drive" />
                    <strong>{room.commuteDrive}</strong>
                    <span>Drive</span>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="rf-commute-footer">
                  <span className="rf-commute-rent">{formatCurrency(room.rent)}/mo</span>
                  <button className="rf-btn rf-btn--visit">
                    <span>View Room</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
