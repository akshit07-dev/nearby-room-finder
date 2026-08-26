import { db } from '../db/database.js';

/**
 * @desc    Get user's saved wishlist rooms
 * @route   GET /api/saved
 */
export const getSavedRooms = async (req, res, next) => {
  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const savedIds = user.savedRoomIds || [];
    const rooms = db.rooms.find((r) => savedIds.includes(r.id));

    res.json({
      success: true,
      count: savedIds.length,
      savedRoomIds: savedIds,
      data: rooms
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle or Add a room to saved wishlist
 * @route   POST /api/saved/:roomId
 */
export const toggleSavedRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const room = db.rooms.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    let savedIds = [...(user.savedRoomIds || [])];
    const isSaved = savedIds.includes(roomId);

    if (isSaved) {
      savedIds = savedIds.filter((id) => id !== roomId);
    } else {
      savedIds.push(roomId);
    }

    await db.users.update(user.id, { savedRoomIds: savedIds });

    res.json({
      success: true,
      message: isSaved ? 'Removed from saved wishlist' : 'Saved to wishlist ❤️',
      isSaved: !isSaved,
      savedRoomIds: savedIds
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove room from saved wishlist
 * @route   DELETE /api/saved/:roomId
 */
export const removeSavedRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let savedIds = [...(user.savedRoomIds || [])];
    savedIds = savedIds.filter((id) => id !== roomId);

    await db.users.update(user.id, { savedRoomIds: savedIds });

    res.json({
      success: true,
      message: 'Room removed from saved list',
      savedRoomIds: savedIds
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear all saved wishlist rooms
 * @route   DELETE /api/saved
 */
export const clearSavedRooms = async (req, res, next) => {
  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await db.users.update(user.id, { savedRoomIds: [] });

    res.json({
      success: true,
      message: 'All saved rooms cleared',
      savedRoomIds: []
    });
  } catch (error) {
    next(error);
  }
};
