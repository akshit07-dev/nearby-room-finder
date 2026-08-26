import { db } from '../db/database.js';
import { calculateHaversineDistance, estimateCommute } from '../utils/geo.js';

/**
 * @desc    Get preset hub localities
 * @route   GET /api/locations/localities
 */
export const getLocalities = async (req, res, next) => {
  try {
    const list = db.localities.find();
    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get popular landmarks
 * @route   GET /api/locations/landmarks
 */
export const getLandmarks = async (req, res, next) => {
  try {
    const list = db.landmarks.find();
    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Calculate distance and commute breakdown between two coordinates
 * @route   POST /api/locations/commute
 */
export const calculateCommuteRoute = async (req, res, next) => {
  try {
    const { originLat, originLng, destLat, destLng, roomId } = req.body;

    let oLat = parseFloat(originLat);
    let oLng = parseFloat(originLng);

    if (roomId) {
      const room = db.rooms.findById(roomId);
      if (room?.location) {
        oLat = room.location.lat;
        oLng = room.location.lng;
      }
    }

    const dLat = parseFloat(destLat);
    const dLng = parseFloat(destLng);

    if (isNaN(oLat) || isNaN(oLng) || isNaN(dLat) || isNaN(dLng)) {
      return res.status(400).json({
        success: false,
        message: 'Valid origin and destination coordinates are required.'
      });
    }

    const distanceKm = calculateHaversineDistance(oLat, oLng, dLat, dLng);
    const commute = estimateCommute(distanceKm);

    res.json({
      success: true,
      data: {
        distanceKm,
        origin: { lat: oLat, lng: oLng },
        destination: { lat: dLat, lng: dLng },
        commute
      }
    });
  } catch (error) {
    next(error);
  }
};
