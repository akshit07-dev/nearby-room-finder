import { db } from '../db/database.js';
import { calculateHaversineDistance, estimateCommute } from '../utils/geo.js';

const DEFAULT_LAT = 12.9352;
const DEFAULT_LNG = 77.6245;

/**
 * @desc    Get all rooms with multi-parameter filtering, Haversine geo-distance, and sorting
 * @route   GET /api/rooms
 */
export const getAllRooms = async (req, res, next) => {
  try {
    const {
      search,
      searchQuery,
      q,
      type,
      category,
      gender,
      maxPrice,
      minPrice,
      maxDistance,
      userLat,
      userLng,
      noBrokerage,
      instantMoveIn,
      furnished,
      ac,
      meals,
      attachedBath,
      wifi,
      sort
    } = req.query;

    const refLat = parseFloat(userLat) || DEFAULT_LAT;
    const refLng = parseFloat(userLng) || DEFAULT_LNG;
    const searchFilter = (search || searchQuery || q || '').trim().toLowerCase();
    const targetCategory = category || type;

    let results = db.rooms.find().map((room) => {
      const dist = calculateHaversineDistance(
        refLat,
        refLng,
        room.location?.lat,
        room.location?.lng
      );
      return {
        ...room,
        calculatedDistance: dist
      };
    });

    // 1. Distance Filter
    const maxDist = parseFloat(maxDistance);
    if (!isNaN(maxDist) && maxDist > 0 && maxDist < 100) {
      results = results.filter((r) => r.calculatedDistance <= maxDist);
    }

    // 2. Budget Filter
    const maxP = parseFloat(maxPrice);
    if (!isNaN(maxP) && maxP > 0) {
      results = results.filter((r) => r.rent <= maxP);
    }
    const minP = parseFloat(minPrice);
    if (!isNaN(minP) && minP > 0) {
      results = results.filter((r) => r.rent >= minP);
    }

    // 3. Category / Room Type Filter
    if (targetCategory && targetCategory !== 'all') {
      results = results.filter((r) => {
        const cat = (r.category || '').toLowerCase();
        const t = (r.type || '').toLowerCase();
        const target = targetCategory.toLowerCase();
        return cat === target || t.includes(target);
      });
    }

    // 4. Gender Filter
    if (gender && gender !== 'Any' && gender !== 'all') {
      results = results.filter((r) => {
        if (!r.gender || r.gender === 'Any') return true;
        return r.gender.toLowerCase() === gender.toLowerCase();
      });
    }

    // 5. Amenity / Feature Flags
    if (noBrokerage === 'true' || noBrokerage === true) {
      results = results.filter((r) => r.isNoBrokerage);
    }
    if (instantMoveIn === 'true' || instantMoveIn === true) {
      results = results.filter((r) => r.isInstantMoveIn);
    }
    if (furnished === 'true' || furnished === true) {
      results = results.filter((r) => (r.furnishing || '').toLowerCase().includes('furnish'));
    }
    if (ac === 'true' || ac === true) {
      results = results.filter((r) =>
        r.amenities?.some((a) => a.toLowerCase().includes('ac') || a.toLowerCase().includes('air conditioner'))
      );
    }
    if (meals === 'true' || meals === true) {
      results = results.filter((r) =>
        r.amenities?.some((a) => a.toLowerCase().includes('meal') || a.toLowerCase().includes('food'))
      );
    }
    if (attachedBath === 'true' || attachedBath === true) {
      results = results.filter((r) =>
        r.amenities?.some((a) => a.toLowerCase().includes('bath') || a.toLowerCase().includes('washroom'))
      );
    }
    if (wifi === 'true' || wifi === true) {
      results = results.filter((r) =>
        r.amenities?.some((a) => a.toLowerCase().includes('wi-fi') || a.toLowerCase().includes('wifi') || a.toLowerCase().includes('internet'))
      );
    }

    // 6. Text Search Filter (title, address, locality, description, landmarks, amenities)
    if (searchFilter) {
      results = results.filter((r) => {
        const matchesTitle = r.title?.toLowerCase().includes(searchFilter);
        const matchesAddr = r.location?.address?.toLowerCase().includes(searchFilter);
        const matchesLoc = r.location?.locality?.toLowerCase().includes(searchFilter);
        const matchesCity = r.location?.city?.toLowerCase().includes(searchFilter);
        const matchesDesc = r.description?.toLowerCase().includes(searchFilter);
        const matchesLandmarks = r.location?.landmarks?.some((lm) => lm.name?.toLowerCase().includes(searchFilter));
        const matchesAmenities = r.amenities?.some((am) => am.toLowerCase().includes(searchFilter));

        return matchesTitle || matchesAddr || matchesLoc || matchesCity || matchesDesc || matchesLandmarks || matchesAmenities;
      });
    }

    // 7. Sorting
    const sortMode = sort || 'distance';
    results.sort((a, b) => {
      if (sortMode === 'distance') {
        return a.calculatedDistance - b.calculatedDistance;
      }
      if (sortMode === 'price-asc') {
        return a.rent - b.rent;
      }
      if (sortMode === 'price-desc') {
        return b.rent - a.rent;
      }
      if (sortMode === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortMode === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      return 0;
    });

    res.json({
      success: true,
      count: results.length,
      data: results,
      meta: {
        totalInDb: db.rooms.data.length,
        referenceCoords: { lat: refLat, lng: refLng }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single room by ID with commute metrics
 * @route   GET /api/rooms/:id
 */
export const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userLat, userLng } = req.query;

    const room = db.rooms.findById(id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: `Room with id "${id}" not found.`
      });
    }

    const refLat = parseFloat(userLat) || DEFAULT_LAT;
    const refLng = parseFloat(userLng) || DEFAULT_LNG;
    const distanceKm = calculateHaversineDistance(
      refLat,
      refLng,
      room.location?.lat,
      room.location?.lng
    );

    const commute = estimateCommute(distanceKm);

    res.json({
      success: true,
      data: {
        ...room,
        calculatedDistance: distanceKm,
        commute
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new room listing
 * @route   POST /api/rooms
 */
export const createRoom = async (req, res, next) => {
  try {
    const {
      title,
      type,
      category,
      gender,
      furnishing,
      rent,
      deposit,
      maintenance,
      areaSqFt,
      availableFrom,
      address,
      locality,
      lat,
      lng,
      description,
      ownerName,
      ownerPhone,
      amenities,
      images,
      houseRules
    } = req.body;

    if (!title || !rent || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide listing title, rent, and address.'
      });
    }

    const defaultImages = [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ];

    const parsedLat = parseFloat(lat) || DEFAULT_LAT + (Math.random() - 0.5) * 0.02;
    const parsedLng = parseFloat(lng) || DEFAULT_LNG + (Math.random() - 0.5) * 0.02;

    const hostUser = req.user;
    const ownerObj = {
      id: hostUser ? hostUser.id : `guest-owner-${Date.now()}`,
      name: hostUser ? hostUser.name : (ownerName || 'Verified Property Owner'),
      role: hostUser?.role?.includes('Owner') ? 'Property Owner' : 'Direct Host',
      avatar: hostUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: hostUser?.phone || ownerPhone || '+91 98450 11223',
      whatsapp: (hostUser?.phone || ownerPhone || '919845011223').replace(/[^0-9]/g, ''),
      responseTime: 'Under 15 mins',
      memberSince: 'Just now',
      verifiedId: true
    };

    const newRoom = await db.rooms.insert({
      id: `room-${Date.now()}`,
      title: title.trim(),
      type: type || 'Single Room',
      category: category || (type === 'Studio' ? 'studio' : type?.toLowerCase().includes('pg') ? 'pg' : 'single'),
      gender: gender || 'Any',
      furnishing: furnishing || 'Furnished',
      rent: Number(rent) || 12000,
      deposit: Number(deposit) || Number(rent) * 2 || 20000,
      maintenance: Number(maintenance) || 0,
      electricityRule: 'Included in rent',
      rating: 5.0,
      reviewCount: 1,
      isVerified: true,
      isNoBrokerage: true,
      isInstantMoveIn: true,
      availableFrom: availableFrom || 'Immediate',
      areaSqFt: Number(areaSqFt) || 250,
      floor: '2nd Floor',
      location: {
        address: address.trim(),
        city: 'Bangalore',
        locality: locality || 'Koramangala',
        lat: parsedLat,
        lng: parsedLng,
        landmarks: [
          { name: 'Nearby Main Junction', distance: '300m', time: '4 min walk' },
          { name: 'Nearest Bus / Metro Stop', distance: '600m', time: '7 min walk' }
        ]
      },
      images: Array.isArray(images) && images.length > 0 ? images : defaultImages,
      amenities: Array.isArray(amenities) && amenities.length > 0
        ? amenities
        : ['High-Speed Wi-Fi', 'Attached Bathroom', 'Air Conditioner', 'Daily Housekeeping'],
      description: description || 'Spacious, well-ventilated room in a prime and peaceful locality. Friendly owner with zero brokerage.',
      houseRules: Array.isArray(houseRules) ? houseRules : ['Non-smoking inside room', 'Quiet hours after 11 PM'],
      owner: ownerObj
    });

    res.status(201).json({
      success: true,
      message: 'Room listed successfully!',
      data: newRoom
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a room listing
 * @route   PUT /api/rooms/:id
 */
export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.rooms.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Update fields
    const updated = await db.rooms.update(id, req.body);
    res.json({
      success: true,
      message: 'Room updated successfully!',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a room listing
 * @route   DELETE /api/rooms/:id
 */
export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await db.rooms.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({
      success: true,
      message: 'Room listing removed successfully!'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add review to a room
 * @route   POST /api/rooms/:id/reviews
 */
export const addReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment, authorName } = req.body;

    const room = db.rooms.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const newRatingVal = Math.min(5, Math.max(1, parseFloat(rating) || 5));
    const currentCount = room.reviewCount || 1;
    const currentRating = room.rating || 5.0;

    const updatedRating = Math.round(((currentRating * currentCount + newRatingVal) / (currentCount + 1)) * 10) / 10;
    const updatedCount = currentCount + 1;

    const updated = await db.rooms.update(id, {
      rating: updatedRating,
      reviewCount: updatedCount
    });

    res.json({
      success: true,
      message: 'Review posted successfully!',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
