/**
 * Distance, Geolocation & Formatting Utilities for RoomFinder
 */

// Earth radius in kilometers
const EARTH_RADIUS_KM = 6371;

/**
 * Calculates straight-line distance between two coordinates using Haversine formula
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS_KM * c;
  return Math.round(d * 10) / 10; // Round to 1 decimal place
}

/**
 * Formats distance in readable string (meters if < 1km, else km)
 */
export function formatDistance(km) {
  if (km === undefined || km === null) return 'Nearby';
  if (km < 1) {
    return `${Math.round(km * 1000)} m away`;
  }
  return `${km.toFixed(1)} km away`;
}

/**
 * Estimates commute duration based on mode
 */
export function estimateCommuteTime(km, mode = 'walk') {
  if (!km) return '5 mins';
  switch (mode) {
    case 'walk': {
      // average walking speed ~ 4.5 km/h -> ~13 mins per km
      const mins = Math.max(3, Math.round(km * 13));
      return `${mins} min walk`;
    }
    case 'bike': {
      // average cycling / two wheeler speed ~ 18 km/h -> ~3.3 mins per km
      const mins = Math.max(2, Math.round(km * 3.3));
      return `${mins} min ride`;
    }
    case 'transit':
    case 'metro': {
      // transit avg ~ 25 km/h + 5 min wait
      const mins = Math.max(5, Math.round(km * 2.4 + 4));
      return `${mins} min transit`;
    }
    case 'drive':
    default: {
      // urban car traffic ~ 20 km/h
      const mins = Math.max(4, Math.round(km * 3));
      return `${mins} min drive`;
    }
  }
}

/**
 * Format Indian Rupees or USD
 */
export function formatCurrency(amount, currency = 'INR') {
  if (!amount && amount !== 0) return '₹0';
  if (currency === 'INR') {
    return '₹' + amount.toLocaleString('en-IN');
  }
  return '$' + amount.toLocaleString('en-US');
}

/**
 * Preset Top Cities & Tech Hub Localities
 */
export const PRESET_LOCALITIES = [
  {
    id: 'koramangala',
    name: 'Koramangala, Bangalore',
    lat: 12.9352,
    lng: 77.6245,
    tag: 'Tech & Cafe Hub',
    avgRent: '₹14,000'
  },
  {
    id: 'hsr',
    name: 'HSR Layout, Bangalore',
    lat: 12.9121,
    lng: 77.6446,
    tag: 'Startups & Greenery',
    avgRent: '₹16,500'
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar, Bangalore',
    lat: 12.9784,
    lng: 77.6408,
    tag: 'Nightlife & Metro',
    avgRent: '₹19,000'
  },
  {
    id: 'whitefield',
    name: 'Whitefield, Bangalore',
    lat: 12.9698,
    lng: 77.7500,
    tag: 'IT Parks & Malls',
    avgRent: '₹13,500'
  },
  {
    id: 'btm',
    name: 'BTM Layout, Bangalore',
    lat: 12.9166,
    lng: 77.6101,
    tag: 'Budget & Student Friendly',
    avgRent: '₹10,500'
  },
  {
    id: 'powai',
    name: 'Powai, Mumbai',
    lat: 19.1176,
    lng: 72.9060,
    tag: 'Lake Views & IIT',
    avgRent: '₹22,000'
  },
  {
    id: 'cybercity',
    name: 'Cyber City, Gurgaon',
    lat: 28.4905,
    lng: 77.0898,
    tag: 'Corporate & Metro',
    avgRent: '₹18,000'
  }
];

export const POPULAR_LANDMARKS = [
  { name: 'Sony World Junction', lat: 12.9382, lng: 77.6285 },
  { name: 'Koramangala 5th Block Metro', lat: 12.9348, lng: 77.6190 },
  { name: 'Forum South Mall', lat: 12.9350, lng: 77.6100 },
  { name: 'HSR BDA Complex', lat: 12.9110, lng: 77.6385 },
  { name: 'Indiranagar 100ft Road', lat: 12.9719, lng: 77.6412 },
  { name: 'RMZ Ecospace Tech Park', lat: 12.9260, lng: 77.6830 }
];
