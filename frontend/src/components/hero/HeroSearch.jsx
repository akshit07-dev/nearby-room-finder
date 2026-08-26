import React from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  SlidersHorizontal, 
  Check, 
  Sparkles,
  ShieldCheck,
  Zap,
  Building,
  DollarSign
} from 'lucide-react';
import './HeroSearch.css';

const ROOM_TYPES = [
  { label: 'All Rooms', value: 'all' },
  { label: 'Single Room', value: 'single' },
  { label: 'PG / Shared', value: 'pg' },
  { label: '1 BHK', value: '1bhk' },
  { label: '2 BHK', value: '2bhk' },
  { label: 'Studio', value: 'studio' }
];

const RADIUS_OPTIONS = [
  { label: 'Within 2 km', value: 2 },
  { label: 'Within 5 km', value: 5 },
  { label: 'Within 10 km', value: 10 },
  { label: 'Within 20 km', value: 20 },
  { label: 'Any Distance', value: 100 }
];

const QUICK_AMENITY_CHIPS = [
  { id: 'noBrokerage', label: 'No Brokerage' },
  { id: 'instantMoveIn', label: 'Instant Move-in' },
  { id: 'furnished', label: 'Fully Furnished' },
  { id: 'ac', label: 'Air Conditioner' },
  { id: 'meals', label: 'Meals / Food' },
  { id: 'attachedBath', label: 'Attached Bath' },
  { id: 'wifi', label: 'High-speed Wi-Fi' }
];

export default function HeroSearch({
  filters,
  onFilterChange,
  onResetFilters,
  onDetectLocation,
  isDetectingLocation,
  currentLocationName,
  totalResultsCount = 0
}) {
  return (
    <section className="rf-hero">
      <div className="rf-hero__container">
        {/* Top Badges */}
        <div className="rf-hero__tagline-row animate-fade-in">
          <div className="rf-hero__pill">
            <Sparkles size={14} className="rf-hero__pill-icon" />
            <span>AI-Powered Nearby Search</span>
          </div>
          <div className="rf-hero__pill rf-hero__pill--verified">
            <ShieldCheck size={14} className="rf-hero__pill-icon" />
            <span>100% Direct Owner Verified</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="rf-hero__heading animate-slide-up">
          Find Verified Rooms & Flats <span className="rf-text-gradient">Right Near You</span>
        </h1>
        <p className="rf-hero__subheading animate-slide-up">
          Explore single rooms, co-living spaces, PGs, and apartments with transparent pricing, zero brokerage, and instant visit bookings.
        </p>

        {/* Search & Filter Master Card */}
        <div className="rf-hero__card animate-slide-up">
          {/* Top Room Type Tabs */}
          <div className="rf-hero__type-tabs">
            {ROOM_TYPES.map((type) => (
              <button
                key={type.value}
                className={`rf-hero__type-tab ${filters.type === type.value ? 'active' : ''}`}
                onClick={() => onFilterChange('type', type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Core Search Inputs Row */}
          <div className="rf-hero__inputs-row">
            {/* Locality / Keyword Input */}
            <div className="rf-hero__input-group rf-hero__input-group--search">
              <label className="rf-hero__input-label">
                <Search size={14} />
                <span>Search Locality, Landmark, or Society</span>
              </label>
              <div className="rf-hero__input-field-wrap">
                <input
                  type="text"
                  placeholder="e.g. Sony World, Koramangala 5th Block, Metro..."
                  value={filters.searchQuery || ''}
                  onChange={(e) => onFilterChange('searchQuery', e.target.value)}
                  className="rf-hero__input"
                />
                {filters.searchQuery && (
                  <button 
                    className="rf-hero__clear-input"
                    onClick={() => onFilterChange('searchQuery', '')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Live Location / GPS Trigger */}
            <div className="rf-hero__input-group rf-hero__input-group--gps">
              <label className="rf-hero__input-label">
                <MapPin size={14} />
                <span>Current Reference Point</span>
              </label>
              <button
                className="rf-hero__gps-trigger"
                onClick={onDetectLocation}
                disabled={isDetectingLocation}
                title="Detect exact GPS location"
              >
                <Navigation size={15} className={isDetectingLocation ? 'spin' : ''} />
                <span>{isDetectingLocation ? 'Locating...' : (currentLocationName || 'Detect GPS')}</span>
              </button>
            </div>

            {/* Max Budget Slider / Input */}
            <div className="rf-hero__input-group rf-hero__input-group--budget">
              <div className="rf-hero__input-label-row">
                <label className="rf-hero__input-label">
                  <DollarSign size={14} />
                  <span>Max Budget</span>
                </label>
                <span className="rf-hero__budget-val">₹{filters.maxPrice?.toLocaleString('en-IN') || '35,000'}/mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="40000"
                step="1000"
                value={filters.maxPrice || 35000}
                onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
                className="rf-hero__range-slider"
              />
            </div>
          </div>

          {/* Secondary Filters: Radius, Gender, Quick Amenities */}
          <div className="rf-hero__filters-row">
            {/* Radius Selector */}
            <div className="rf-hero__filter-item">
              <span className="rf-hero__filter-title">Max Distance:</span>
              <div className="rf-hero__pill-group">
                {RADIUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`rf-hero__chip ${filters.maxDistance === opt.value ? 'selected' : ''}`}
                    onClick={() => onFilterChange('maxDistance', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="rf-hero__filter-item">
              <span className="rf-hero__filter-title">Gender Preference:</span>
              <div className="rf-hero__pill-group">
                {['Any', 'Male', 'Female'].map((gender) => (
                  <button
                    key={gender}
                    className={`rf-hero__chip ${filters.gender === gender ? 'selected' : ''}`}
                    onClick={() => onFilterChange('gender', gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Amenity Chips */}
            <div className="rf-hero__filter-item rf-hero__filter-item--amenities">
              <span className="rf-hero__filter-title">Must Have:</span>
              <div className="rf-hero__pill-group">
                {QUICK_AMENITY_CHIPS.map((chip) => {
                  const isChecked = Boolean(filters[chip.id]);
                  return (
                    <button
                      key={chip.id}
                      className={`rf-hero__chip rf-hero__chip--amenity ${isChecked ? 'selected' : ''}`}
                      onClick={() => onFilterChange(chip.id, !isChecked)}
                    >
                      {isChecked && <Check size={13} className="rf-chip-check" />}
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="rf-hero__trust-strip">
          <div className="rf-hero__trust-item">
            <Zap size={16} className="rf-trust-icon" />
            <span>Instant Virtual & In-Person Tours</span>
          </div>
          <div className="rf-hero__trust-dot">•</div>
          <div className="rf-hero__trust-item">
            <Building size={16} className="rf-trust-icon" />
            <span>Verified Landlords & Society Gates</span>
          </div>
          <div className="rf-hero__trust-dot">•</div>
          <div className="rf-hero__trust-item">
            <ShieldCheck size={16} className="rf-trust-icon" />
            <span>Zero Brokerage Promise</span>
          </div>
        </div>
      </div>
    </section>
  );
}
