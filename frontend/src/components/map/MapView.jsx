import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { formatCurrency, formatDistance } from '../../utils/distance';
import './MapView.css';

export default function MapView({
  rooms = [],
  userLocation,
  searchRadiusKm = 10,
  hoveredRoomId,
  selectedRoom,
  onSelectRoom,
  viewMode = 'split'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const userMarkerRef = useRef(null);
  const radiusCircleRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = userLocation?.lat || 12.9352;
      const initialLng = userLocation?.lng || 77.6245;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Clean, modern CartoDB Positron tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Center & User Location Pin + Radius Circle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation?.lat || !userLocation?.lng) return;

    const userLatLng = [userLocation.lat, userLocation.lng];

    // Remove old user marker
    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
    }
    if (radiusCircleRef.current) {
      map.removeLayer(radiusCircleRef.current);
    }

    // Custom pulsing user location marker
    const userIcon = L.divIcon({
      className: 'rf-user-marker-wrapper',
      html: '<div class="rf-user-location-marker"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    userMarkerRef.current = L.marker(userLatLng, { icon: userIcon, zIndexOffset: 2000 })
      .addTo(map)
      .bindPopup(`<div class="rf-map-popup rf-map-popup--user"><strong>📍 Reference Location</strong><br/>${userLocation.name || 'Your Location'}</div>`);

    // Radius Circle
    if (searchRadiusKm && searchRadiusKm < 100) {
      radiusCircleRef.current = L.circle(userLatLng, {
        radius: searchRadiusKm * 1000,
        color: '#155eef',
        fillColor: '#155eef',
        fillOpacity: 0.05,
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);
    }

    map.setView(userLatLng, 13, { animate: true });
  }, [userLocation, searchRadiusKm]);

  // Update Room Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => map.removeLayer(marker));
    markersRef.current = {};

    rooms.forEach((room) => {
      if (!room.location?.lat || !room.location?.lng) return;

      const priceTag = room.rent >= 1000 ? `₹${Math.round(room.rent / 1000)}k` : `₹${room.rent}`;

      const icon = L.divIcon({
        className: 'rf-map-price-marker-wrap',
        html: `<div class="rf-map-price-marker ${hoveredRoomId === room.id ? 'active' : ''}">${priceTag}</div>`,
        iconSize: [50, 30],
        iconAnchor: [25, 15]
      });

      const marker = L.marker([room.location.lat, room.location.lng], { icon }).addTo(map);

      // Popup template
      const popupHtml = `
        <div class="rf-map-popup">
          <img src="${room.images[0]}" alt="${room.title}" class="rf-map-popup__img" />
          <div class="rf-map-popup__body">
            <span class="rf-map-popup__type">${room.type}</span>
            <h4 class="rf-map-popup__title">${room.title}</h4>
            <div class="rf-map-popup__bottom">
              <span class="rf-map-popup__price">${formatCurrency(room.rent)}/mo</span>
              <button class="rf-map-popup__btn" id="popup-btn-${room.id}">View Details</button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 260, className: 'rf-custom-leaflet-popup' });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${room.id}`);
        if (btn) {
          btn.onclick = () => onSelectRoom(room);
        }
      });

      marker.on('mouseover', () => {
        marker.openPopup();
      });

      markersRef.current[room.id] = marker;
    });

    // Invalidate size in case layout toggled
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [rooms, onSelectRoom]);

  // Sync Hovered Room from Cards
  useEffect(() => {
    if (!hoveredRoomId) return;
    const marker = markersRef.current[hoveredRoomId];
    if (marker) {
      marker.openPopup();
      const el = marker.getElement();
      if (el) {
        const inner = el.querySelector('.rf-map-price-marker');
        if (inner) inner.classList.add('active');
      }
    }
  }, [hoveredRoomId]);

  return (
    <div className={`rf-map-wrapper rf-map-wrapper--${viewMode}`}>
      <div ref={mapContainerRef} className="rf-leaflet-container" />
      <div className="rf-map-indicator">
        <span>📍 Interactive Live Map</span>
        <small>{rooms.length} pins loaded</small>
      </div>
    </div>
  );
}
