/**
 * Geospatial distance & commute calculations for RoomFinder Backend
 */

const EARTH_RADIUS_KM = 6371;

/**
 * Calculates straight-line distance between two coordinates using Haversine formula
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Distance in kilometers rounded to 1 decimal place
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 0;
  
  const p1 = Number(lat1);
  const l1 = Number(lon1);
  const p2 = Number(lat2);
  const l2 = Number(lon2);

  if (isNaN(p1) || isNaN(l1) || isNaN(p2) || isNaN(l2)) return 0;

  const dLat = ((p2 - p1) * Math.PI) / 180;
  const dLon = ((l2 - l1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1 * Math.PI) / 180) *
      Math.cos((p2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS_KM * c;
  return Math.round(d * 10) / 10;
}

/**
 * Estimates commute duration and route information based on mode
 */
export function estimateCommute(distanceKm) {
  const km = Number(distanceKm) || 0;
  return {
    walk: {
      durationMins: Math.max(3, Math.round(km * 13)),
      label: `${Math.max(3, Math.round(km * 13))} min walk`
    },
    bike: {
      durationMins: Math.max(2, Math.round(km * 3.3)),
      label: `${Math.max(2, Math.round(km * 3.3))} min ride`
    },
    transit: {
      durationMins: Math.max(5, Math.round(km * 2.4 + 4)),
      label: `${Math.max(5, Math.round(km * 2.4 + 4))} min transit`
    },
    drive: {
      durationMins: Math.max(4, Math.round(km * 3)),
      label: `${Math.max(4, Math.round(km * 3))} min drive`
    }
  };
}
