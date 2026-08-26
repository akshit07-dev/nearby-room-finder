import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  INITIAL_ROOMS 
} from './data/mockRooms';
import { 
  calculateDistance, 
  PRESET_LOCALITIES 
} from './utils/distance';

// API Services
import { roomApi, authApi, savedApi, locationApi } from './api/services';

// UI & Component Imports
import Navbar from './components/navbar/Navbar';
import HeroSearch from './components/hero/HeroSearch';
import ControlsBar from './components/controls/ControlsBar';
import RoomList from './components/rooms/RoomList';
import MapView from './components/map/MapView';
import FlatmateFinder from './components/flatmates/FlatmateFinder';
import CommuteCalculator from './components/commute/CommuteCalculator';
import Toast from './components/ui/Toast';

// Modals
import RoomDetailModal from './components/modals/RoomDetailModal';
import PostRoomModal from './components/modals/PostRoomModal';
import CompareModal from './components/modals/CompareModal';
import SavedRoomsModal from './components/modals/SavedRoomsModal';
import AuthModal from './components/modals/AuthModal';

import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import './App.css';

const DEFAULT_LOCATION = PRESET_LOCALITIES[0]; // Koramangala

export default function App() {
  // Application Data State
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('rf_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  // Active Main Tab: 'rooms' | 'map' | 'flatmates' | 'commute'
  const [activeTab, setActiveTab] = useState('rooms');

  // View Mode for Room Explorer: 'split' | 'grid' | 'map'
  const [viewMode, setViewMode] = useState('split');
  const [currentSort, setCurrentSort] = useState('distance');
  const [hoveredRoomId, setHoveredRoomId] = useState(null);

  // Filter State
  const [filters, setFilters] = useState({
    searchQuery: '',
    type: 'all',
    gender: 'Any',
    maxDistance: 10,
    maxPrice: 35000,
    noBrokerage: false,
    instantMoveIn: false,
    furnished: false,
    ac: false,
    meals: false,
    attachedBath: false,
    wifi: false
  });

  // User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('rf_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Wishlist / Saved State
  const [savedRoomIds, setSavedRoomIds] = useState(() => {
    const saved = localStorage.getItem('rf_saved');
    return saved ? JSON.parse(saved) : ['room-1', 'room-4'];
  });

  // Compare State (Up to 3 rooms)
  const [comparedRoomIds, setComparedRoomIds] = useState(['room-1', 'room-2']);

  // Modals
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isPostRoomOpen, setIsPostRoomOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Initial Health Check & Auth Hydration
  useEffect(() => {
    const initApp = async () => {
      try {
        const health = await locationApi.checkHealth();
        if (health && health.status === 'online') {
          setApiConnected(true);
        }
      } catch (err) {
        console.warn('Backend API connection pending:', err.message);
      }

      // Check existing token and hydrate user
      const token = localStorage.getItem('rf_token');
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.user) {
            setCurrentUser(res.user);
            if (Array.isArray(res.user.savedRoomIds) && res.user.savedRoomIds.length > 0) {
              setSavedRoomIds(res.user.savedRoomIds);
            }
          }
        } catch (e) {
          // Token expired
          localStorage.removeItem('rf_token');
        }
      }
    };

    initApp();
  }, []);

  // 2. Fetch Rooms from REST Backend API with filtering & coordinates
  const fetchLiveRooms = useCallback(async () => {
    setIsLoadingRooms(true);
    try {
      const params = {
        userLat: currentLocation.lat,
        userLng: currentLocation.lng,
        searchQuery: filters.searchQuery,
        type: filters.type,
        gender: filters.gender,
        maxDistance: filters.maxDistance,
        maxPrice: filters.maxPrice,
        noBrokerage: filters.noBrokerage || undefined,
        instantMoveIn: filters.instantMoveIn || undefined,
        furnished: filters.furnished || undefined,
        ac: filters.ac || undefined,
        meals: filters.meals || undefined,
        attachedBath: filters.attachedBath || undefined,
        wifi: filters.wifi || undefined,
        sort: currentSort
      };

      const res = await roomApi.getAll(params);
      if (res && Array.isArray(res.data)) {
        setRooms(res.data);
        setApiConnected(true);
      }
    } catch (err) {
      console.warn('Using local room dataset fallback:', err.message);
    } finally {
      setIsLoadingRooms(false);
    }
  }, [currentLocation, filters, currentSort]);

  // Debounced rooms fetching when search or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLiveRooms();
    }, 150);
    return () => clearTimeout(timer);
  }, [fetchLiveRooms]);

  // Persist State
  useEffect(() => {
    localStorage.setItem('rf_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('rf_saved', JSON.stringify(savedRoomIds));
  }, [savedRoomIds]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rf_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rf_user');
    }
  }, [currentUser]);

  // GPS Geolocation Handler
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      addToast('Location Error', 'Geolocation is not supported by your browser', 'error');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          id: 'user-gps',
          name: `Near You (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
          lat: latitude,
          lng: longitude,
          isGPS: true
        });
        addToast('Location Detected', 'Updated reference point to your current live coordinates!', 'success');
      },
      (error) => {
        setIsDetectingLocation(false);
        addToast('GPS Permission Denied', 'Using default city hub (Koramangala, Bangalore)', 'info');
      },
      { timeout: 8000 }
    );
  };

  // Filter Updates
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      type: 'all',
      gender: 'Any',
      maxDistance: 10,
      maxPrice: 35000,
      noBrokerage: false,
      instantMoveIn: false,
      furnished: false,
      ac: false,
      meals: false,
      attachedBath: false,
      wifi: false
    });
    addToast('Filters Reset', 'Showing all available rooms near you', 'info');
  };

  const handleRemoveFilter = (key) => {
    if (key === 'type') handleFilterChange('type', 'all');
    else if (key === 'gender') handleFilterChange('gender', 'Any');
    else if (key === 'maxDistance') handleFilterChange('maxDistance', 100);
    else if (key === 'searchQuery') handleFilterChange('searchQuery', '');
    else handleFilterChange(key, false);
  };

  // Wishlist Toggle with Backend Sync
  const handleToggleSave = async (roomId) => {
    const isAlreadySaved = savedRoomIds.includes(roomId);
    
    // Optimistic UI update
    setSavedRoomIds((prev) => {
      if (isAlreadySaved) {
        addToast('Removed from Saved', 'Room removed from your wishlist', 'info');
        return prev.filter((id) => id !== roomId);
      } else {
        addToast('Saved to Wishlist', 'Room added to your saved wishlist ❤️', 'success');
        return [...prev, roomId];
      }
    });

    // If logged in, sync with backend
    if (currentUser && localStorage.getItem('rf_token')) {
      try {
        await savedApi.toggle(roomId);
      } catch (err) {
        console.warn('Could not sync save state to backend:', err.message);
      }
    }
  };

  // Compare Toggle
  const handleToggleCompare = (roomId) => {
    setComparedRoomIds((prev) => {
      const isAlready = prev.includes(roomId);
      if (isAlready) {
        return prev.filter((id) => id !== roomId);
      }
      if (prev.length >= 3) {
        addToast('Comparison Limit', 'You can compare up to 3 rooms at a time', 'error');
        return prev;
      }
      addToast('Added to Compare', 'Room added to comparison matrix', 'success');
      return [...prev, roomId];
    });
  };

  // Add Newly Posted Room
  const handleAddRoom = (newRoom) => {
    setRooms((prev) => [newRoom, ...prev]);
    addToast('Room Listed Successfully!', `"${newRoom.title}" is now live and searchable!`, 'success');
    fetchLiveRooms();
  };

  // Filtered & Sorted Rooms Memo (Handles both live API response and client-side real-time computation)
  const processedRooms = useMemo(() => {
    return rooms
      .map((room) => {
        const dist = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          room.location?.lat,
          room.location?.lng
        );
        return { ...room, calculatedDistance: room.calculatedDistance != null ? room.calculatedDistance : dist };
      })
      .filter((room) => {
        // Distance Filter
        if (filters.maxDistance && filters.maxDistance < 100 && room.calculatedDistance > filters.maxDistance) {
          return false;
        }

        // Budget Filter
        if (filters.maxPrice && room.rent > filters.maxPrice) {
          return false;
        }

        // Room Type Filter
        if (filters.type && filters.type !== 'all') {
          const cat = (room.category || '').toLowerCase();
          const t = (room.type || '').toLowerCase();
          const target = filters.type.toLowerCase();
          if (cat !== target && !t.includes(target)) return false;
        }

        // Gender Filter
        if (filters.gender && filters.gender !== 'Any') {
          if (room.gender && room.gender !== 'Any' && room.gender !== filters.gender) {
            return false;
          }
        }

        // Amenity / Property Flags
        if (filters.noBrokerage && !room.isNoBrokerage) return false;
        if (filters.instantMoveIn && !room.isInstantMoveIn) return false;
        if (filters.furnished && !room.furnishing?.toLowerCase().includes('furnish')) return false;
        if (filters.ac && !room.amenities?.some((a) => a.toLowerCase().includes('ac') || a.toLowerCase().includes('air conditioner'))) return false;
        if (filters.meals && !room.amenities?.some((a) => a.toLowerCase().includes('meal') || a.toLowerCase().includes('food'))) return false;
        if (filters.attachedBath && !room.amenities?.some((a) => a.toLowerCase().includes('bath') || a.toLowerCase().includes('washroom'))) return false;
        if (filters.wifi && !room.amenities?.some((a) => a.toLowerCase().includes('wi-fi') || a.toLowerCase().includes('wifi') || a.toLowerCase().includes('internet'))) return false;

        // Search Query
        if (filters.searchQuery?.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesTitle = room.title?.toLowerCase().includes(q);
          const matchesAddress = room.location?.address?.toLowerCase().includes(q);
          const matchesLocality = room.location?.locality?.toLowerCase().includes(q);
          const matchesLandmarks = room.location?.landmarks?.some((lm) => lm.name?.toLowerCase().includes(q));
          const matchesAmenities = room.amenities?.some((am) => am.toLowerCase().includes(q));
          if (!matchesTitle && !matchesAddress && !matchesLocality && !matchesLandmarks && !matchesAmenities) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (currentSort === 'distance') {
          return a.calculatedDistance - b.calculatedDistance;
        }
        if (currentSort === 'price-asc') {
          return a.rent - b.rent;
        }
        if (currentSort === 'price-desc') {
          return b.rent - a.rent;
        }
        if (currentSort === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
  }, [rooms, currentLocation, filters, currentSort]);

  // Derived Saved and Compared Room Objects
  const savedRoomsList = useMemo(() => {
    return rooms.filter((r) => savedRoomIds.includes(r.id));
  }, [rooms, savedRoomIds]);

  const comparedRoomsList = useMemo(() => {
    return rooms
      .filter((r) => comparedRoomIds.includes(r.id))
      .map((r) => ({
        ...r,
        calculatedDistance: calculateDistance(currentLocation.lat, currentLocation.lng, r.location?.lat, r.location?.lng)
      }));
  }, [rooms, comparedRoomIds, currentLocation]);

  return (
    <div className="rf-app">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => {
          setCurrentLocation(loc);
          addToast('Location Changed', `Showing rooms near ${loc.name}`, 'info');
        }}
        onDetectLocation={handleDetectLocation}
        isDetectingLocation={isDetectingLocation}
        savedCount={savedRoomIds.length}
        compareCount={comparedRoomIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenCompare={() => {
          if (comparedRoomIds.length === 0) {
            addToast('No Rooms Selected', 'Check the "Compare" box on any card to compare!', 'info');
          }
          setIsCompareOpen(true);
        }}
        onOpenPostRoom={() => setIsPostRoomOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Content Areas based on Active Tab */}
      <main className="rf-main">
        {activeTab === 'rooms' && (
          <>
            {/* Hero & Search Engine */}
            <HeroSearch
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onDetectLocation={handleDetectLocation}
              isDetectingLocation={isDetectingLocation}
              currentLocationName={currentLocation.name}
              totalResultsCount={processedRooms.length}
            />

            {/* Controls Bar */}
            <ControlsBar
              resultsCount={processedRooms.length}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              filters={filters}
              onResetFilters={handleResetFilters}
              onRemoveFilter={handleRemoveFilter}
            />

            {/* Content Display: Split View / Grid / Map */}
            <section className="rf-listings-container">
              {viewMode === 'split' && (
                <div className="rf-split-layout">
                  <div className="rf-split-left">
                    <RoomList
                      rooms={processedRooms}
                      savedRoomIds={savedRoomIds}
                      onToggleSave={handleToggleSave}
                      comparedRoomIds={comparedRoomIds}
                      onToggleCompare={handleToggleCompare}
                      onSelectRoom={setSelectedRoom}
                      onHoverRoom={setHoveredRoomId}
                      onScheduleVisit={(room) => setSelectedRoom(room)}
                      onContactLandlord={(room) => setSelectedRoom(room)}
                      onResetFilters={handleResetFilters}
                      viewMode="split"
                    />
                  </div>
                  <div className="rf-split-right">
                    <MapView
                      rooms={processedRooms}
                      userLocation={currentLocation}
                      searchRadiusKm={filters.maxDistance}
                      hoveredRoomId={hoveredRoomId}
                      selectedRoom={selectedRoom}
                      onSelectRoom={setSelectedRoom}
                      viewMode="split"
                    />
                  </div>
                </div>
              )}

              {viewMode === 'grid' && (
                <div className="rf-grid-layout">
                  <RoomList
                    rooms={processedRooms}
                    savedRoomIds={savedRoomIds}
                    onToggleSave={handleToggleSave}
                    comparedRoomIds={comparedRoomIds}
                    onToggleCompare={handleToggleCompare}
                    onSelectRoom={setSelectedRoom}
                    onHoverRoom={setHoveredRoomId}
                    onScheduleVisit={(room) => setSelectedRoom(room)}
                    onContactLandlord={(room) => setSelectedRoom(room)}
                    onResetFilters={handleResetFilters}
                    viewMode="grid"
                  />
                </div>
              )}

              {viewMode === 'map' && (
                <div className="rf-map-only-layout">
                  <MapView
                    rooms={processedRooms}
                    userLocation={currentLocation}
                    searchRadiusKm={filters.maxDistance}
                    hoveredRoomId={hoveredRoomId}
                    selectedRoom={selectedRoom}
                    onSelectRoom={setSelectedRoom}
                    viewMode="map"
                  />
                </div>
              )}
            </section>
          </>
        )}

        {/* Interactive Map Tab */}
        {activeTab === 'map' && (
          <div className="rf-map-tab-view animate-fade-in">
            <div className="rf-map-tab-header">
              <div>
                <h2>Interactive Map Explorer</h2>
                <p>Showing {processedRooms.length} verified listings near {currentLocation.name}</p>
              </div>
            </div>
            <div className="rf-map-tab-container">
              <MapView
                rooms={processedRooms}
                userLocation={currentLocation}
                searchRadiusKm={filters.maxDistance}
                hoveredRoomId={hoveredRoomId}
                selectedRoom={selectedRoom}
                onSelectRoom={setSelectedRoom}
                viewMode="map"
              />
            </div>
          </div>
        )}

        {/* Find Flatmates Tab */}
        {activeTab === 'flatmates' && (
          <FlatmateFinder
            onConnectFlatmate={(name) => {
              addToast('Opening Chat', `Connecting you with ${name} via WhatsApp...`, 'success');
            }}
          />
        )}

        {/* Commute Calculator Tab */}
        {activeTab === 'commute' && (
          <CommuteCalculator
            rooms={rooms}
            onSelectRoom={setSelectedRoom}
          />
        )}
      </main>

      {/* Floating Compare Bar */}
      {comparedRoomIds.length > 0 && (
        <aside className="rf-compare-floating-bar animate-slide-up" aria-label="Room Comparison Bar">
          <div className="rf-compare-bar-inner">
            <div className="rf-compare-bar-info">
              <strong>{comparedRoomIds.length}/3 Rooms Selected to Compare</strong>
              <small>Compare rent, deposit, distance & amenities</small>
            </div>
            <div className="rf-compare-bar-actions">
              <button
                className="rf-btn rf-btn--post"
                onClick={() => setIsCompareOpen(true)}
              >
                Compare Now
              </button>
              <button
                className="rf-compare-bar-clear"
                onClick={() => setComparedRoomIds([])}
              >
                Clear
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Footer */}
      <footer className="rf-footer">
        <div className="rf-footer__inner">
          <div className="rf-footer__col-brand">
            <div className="rf-navbar__brand">
              <span className="rf-navbar__logo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 9.5V21a1 1 0 001 1h6v-7h6v7h6a1 1 0 001-1V9.5L12 2z" fill="white"/>
                  <circle cx="12" cy="7" r="2" fill="#155eef"/>
                </svg>
              </span>
              <span className="rf-navbar__brand-name">
                <span className="rf-navbar__brand-room">Room</span>
                <span className="rf-navbar__brand-finder">Finder</span>
              </span>
            </div>
            <p className="rf-footer__tagline">
              Discover verified single rooms, PGs, flats, and flatmates right near your location with zero brokerage, interactive maps, and instant bookings.
            </p>
            <div className="rf-footer__guarantee">
              <ShieldCheck size={16} className="rf-shield-icon" />
              <span>100% Direct Landlords & Verified Gate Security</span>
            </div>
          </div>

          <div className="rf-footer__col">
            <h4>Popular Hubs</h4>
            <ul>
              {PRESET_LOCALITIES.slice(0, 4).map((l) => (
                <li key={l.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentLocation(l);
                      setActiveTab('rooms');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Rooms in {l.name.split(',')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rf-footer__col">
            <h4>Quick Features</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('rooms'); }}>Explore Nearby Rooms</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('map'); }}>Interactive Leaflet Map</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('flatmates'); }}>Find Flatmates</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('commute'); }}>Commute Calculator</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setIsPostRoomOpen(true); }}>List Your Space (Free)</a></li>
            </ul>
          </div>

          <div className="rf-footer__col">
            <h4>Direct Support</h4>
            <p className="rf-footer__support-text">
              Have questions about listing or booking a room? Reach our community team 24/7.
            </p>
            <div className="rf-footer__contact-item">
              <Phone size={14} />
              <span>+91 8000 123 456</span>
            </div>
            <div className="rf-footer__contact-item">
              <Mail size={14} />
              <span>help@roomfinder.app</span>
            </div>
          </div>
        </div>

        <div className="rf-footer__bottom">
          <p>© 2026 RoomFinder Technologies Inc. Powered by Express REST Backend & React Leaflet.</p>
        </div>
      </footer>

      {/* Modals */}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          isSaved={savedRoomIds.includes(selectedRoom.id)}
          onToggleSave={handleToggleSave}
          onScheduleVisitSuccess={(details) => {
            addToast('Visit Confirmed!', `Visit scheduled for ${details.date} (${details.time})`, 'success');
          }}
          onSendMessageSuccess={(hostName, msg) => {
            addToast('Message Sent', `Your message was delivered to ${hostName}`, 'success');
          }}
        />
      )}

      {isPostRoomOpen && (
        <PostRoomModal
          onClose={() => setIsPostRoomOpen(false)}
          onAddRoom={handleAddRoom}
        />
      )}

      {isCompareOpen && (
        <CompareModal
          comparedRooms={comparedRoomsList}
          onClose={() => setIsCompareOpen(false)}
          onRemoveCompare={(id) => handleToggleCompare(id)}
          onSelectRoom={setSelectedRoom}
        />
      )}

      {isSavedOpen && (
        <SavedRoomsModal
          savedRooms={savedRoomsList}
          onClose={() => setIsSavedOpen(false)}
          onRemoveSaved={handleToggleSave}
          onSelectRoom={setSelectedRoom}
          onClearAllSaved={async () => {
            setSavedRoomIds([]);
            if (currentUser && localStorage.getItem('rf_token')) {
              try {
                await savedApi.clear();
              } catch (e) {}
            }
            addToast('Wishlist Cleared', 'All saved rooms removed', 'info');
          }}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLogin={(user) => {
            setCurrentUser(user);
            addToast('Signed In', `Welcome back, ${user.name}!`, 'success');
          }}
          currentUser={currentUser}
          onLogout={() => {
            authApi.logout();
            setCurrentUser(null);
            addToast('Signed Out', 'You have been logged out successfully', 'info');
          }}
        />
      )}
    </div>
  );
}
