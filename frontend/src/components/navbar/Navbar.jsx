import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  Heart, 
  Layers, 
  PlusCircle, 
  User, 
  Menu, 
  X, 
  Search, 
  Users, 
  Navigation,
  Check
} from 'lucide-react';
import { PRESET_LOCALITIES } from '../../utils/distance';
import './navbar.css';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentLocation,
  onSelectLocation,
  onDetectLocation,
  isDetectingLocation,
  savedCount = 0,
  compareCount = 0,
  onOpenSaved,
  onOpenCompare,
  onOpenPostRoom,
  onOpenAuth,
  currentUser
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className="rf-navbar">
      <div className="rf-navbar__inner">
        {/* Brand Logo */}
        <div className="rf-navbar__left">
          <a
            href="#"
            className="rf-navbar__brand"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('rooms');
            }}
          >
            <span className="rf-navbar__logo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 9.5V21a1 1 0 001 1h6v-7h6v7h6a1 1 0 001-1V9.5L12 2z" fill="white"/>
                <circle cx="12" cy="7" r="2" fill="#155eef"/>
              </svg>
            </span>
            <span className="rf-navbar__brand-name">
              <span className="rf-navbar__brand-room">Room</span>
              <span className="rf-navbar__brand-finder">Finder</span>
            </span>
          </a>

          {/* Location Selector Pill */}
          <div className="rf-navbar__loc-wrapper">
            <button
              className={`rf-navbar__loc-btn ${isLocDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsLocDropdownOpen(!isLocDropdownOpen)}
              title="Change your current searching location"
              aria-expanded={isLocDropdownOpen}
            >
              <MapPin size={15} className="rf-navbar__loc-pin-icon" />
              <span className="rf-navbar__loc-text">
                {currentLocation?.isGPS ? '📍 Near Me (GPS)' : (currentLocation?.name || 'Select Location')}
              </span>
              <span className="rf-navbar__loc-arrow">▼</span>
            </button>

            {isLocDropdownOpen && (
              <div className="rf-navbar__loc-menu animate-scale-in">
                <div className="rf-navbar__loc-header">
                  <span>Select Locality or Use GPS</span>
                </div>

                {/* GPS Trigger */}
                <button
                  className="rf-navbar__loc-item rf-navbar__loc-gps-item"
                  onClick={() => {
                    onDetectLocation();
                    setIsLocDropdownOpen(false);
                  }}
                  disabled={isDetectingLocation}
                >
                  <Navigation size={15} className={isDetectingLocation ? 'spin' : ''} />
                  <div className="rf-navbar__loc-info">
                    <strong>{isDetectingLocation ? 'Detecting GPS...' : 'Use Current Live Location'}</strong>
                    <small>Accurate distance from where you are right now</small>
                  </div>
                  {currentLocation?.isGPS && <Check size={16} className="rf-loc-check" />}
                </button>

                <div className="rf-navbar__loc-divider">Popular Tech & City Hubs</div>

                {/* Preset Hubs */}
                <div className="rf-navbar__loc-list">
                  {PRESET_LOCALITIES.map((loc) => {
                    const isSelected = !currentLocation?.isGPS && currentLocation?.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        className={`rf-navbar__loc-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          onSelectLocation(loc);
                          setIsLocDropdownOpen(false);
                        }}
                      >
                        <div className="rf-navbar__loc-info">
                          <strong>{loc.name}</strong>
                          <small>{loc.tag} • Avg: {loc.avgRent}</small>
                        </div>
                        {isSelected && <Check size={16} className="rf-loc-check" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="rf-navbar__nav" aria-label="Main Navigation">
          <ul className="rf-navbar__nav-list">
            <li>
              <button
                className={`rf-navbar__nav-link ${activeTab === 'rooms' ? 'rf-navbar__nav-link--active' : ''}`}
                onClick={() => handleNavClick('rooms')}
              >
                <Search size={16} />
                <span>Explore Rooms</span>
              </button>
            </li>
            <li>
              <button
                className={`rf-navbar__nav-link ${activeTab === 'map' ? 'rf-navbar__nav-link--active' : ''}`}
                onClick={() => handleNavClick('map')}
              >
                <Compass size={16} />
                <span>Interactive Map</span>
              </button>
            </li>
            <li>
              <button
                className={`rf-navbar__nav-link ${activeTab === 'flatmates' ? 'rf-navbar__nav-link--active' : ''}`}
                onClick={() => handleNavClick('flatmates')}
              >
                <Users size={16} />
                <span>Find Flatmates</span>
                <span className="rf-nav-pill-new">New</span>
              </button>
            </li>
            <li>
              <button
                className={`rf-navbar__nav-link ${activeTab === 'commute' ? 'rf-navbar__nav-link--active' : ''}`}
                onClick={() => handleNavClick('commute')}
              >
                <Navigation size={16} />
                <span>Commute Check</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="rf-navbar__actions">
          {/* Wishlist Button */}
          <button
            className="rf-navbar__icon-btn"
            onClick={onOpenSaved}
            title="View Saved Rooms"
            aria-label="View Saved Rooms"
          >
            <Heart size={18} />
            {savedCount > 0 && <span className="rf-navbar__badge-count">{savedCount}</span>}
          </button>

          {/* Compare Button */}
          <button
            className={`rf-navbar__icon-btn ${compareCount > 0 ? 'active' : ''}`}
            onClick={onOpenCompare}
            title="Compare Rooms"
            aria-label="Compare Rooms"
          >
            <Layers size={18} />
            {compareCount > 0 && <span className="rf-navbar__badge-count">{compareCount}</span>}
          </button>

          {/* List Property / Post Room CTA */}
          <button
            className="rf-btn rf-btn--post"
            onClick={onOpenPostRoom}
          >
            <PlusCircle size={16} />
            <span>List Your Room</span>
          </button>

          {/* User Profile / Auth */}
          {currentUser ? (
            <div className="rf-navbar__user-profile" onClick={onOpenAuth}>
              <img src={currentUser.avatar} alt={currentUser.name} className="rf-navbar__user-avatar" />
              <span className="rf-navbar__user-name">{currentUser.name.split(' ')[0]}</span>
            </div>
          ) : (
            <button className="rf-btn rf-btn--login" onClick={onOpenAuth}>
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            className="rf-navbar__toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`rf-navbar__mobile ${isMenuOpen ? 'rf-navbar__mobile--open' : ''}`}>
        <ul className="rf-navbar__mobile-list">
          <li>
            <button
              className={`rf-navbar__mobile-link ${activeTab === 'rooms' ? 'rf-navbar__mobile-link--active' : ''}`}
              onClick={() => handleNavClick('rooms')}
            >
              <Search size={18} />
              <span>Explore Rooms</span>
            </button>
          </li>
          <li>
            <button
              className={`rf-navbar__mobile-link ${activeTab === 'map' ? 'rf-navbar__mobile-link--active' : ''}`}
              onClick={() => handleNavClick('map')}
            >
              <Compass size={18} />
              <span>Interactive Map</span>
            </button>
          </li>
          <li>
            <button
              className={`rf-navbar__mobile-link ${activeTab === 'flatmates' ? 'rf-navbar__mobile-link--active' : ''}`}
              onClick={() => handleNavClick('flatmates')}
            >
              <Users size={18} />
              <span>Find Flatmates</span>
            </button>
          </li>
          <li>
            <button
              className={`rf-navbar__mobile-link ${activeTab === 'commute' ? 'rf-navbar__mobile-link--active' : ''}`}
              onClick={() => handleNavClick('commute')}
            >
              <Navigation size={18} />
              <span>Commute Calculator</span>
            </button>
          </li>
        </ul>

        <div className="rf-navbar__mobile-actions">
          <div className="rf-navbar__mobile-quick-row">
            <button className="rf-navbar__mobile-quick-btn" onClick={() => { onOpenSaved(); setIsMenuOpen(false); }}>
              <Heart size={16} />
              <span>Saved ({savedCount})</span>
            </button>
            <button className="rf-navbar__mobile-quick-btn" onClick={() => { onOpenCompare(); setIsMenuOpen(false); }}>
              <Layers size={16} />
              <span>Compare ({compareCount})</span>
            </button>
          </div>

          <button
            className="rf-btn rf-btn--post rf-btn--block"
            onClick={() => {
              onOpenPostRoom();
              setIsMenuOpen(false);
            }}
          >
            <PlusCircle size={16} />
            <span>List Your Room (+ Free)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
