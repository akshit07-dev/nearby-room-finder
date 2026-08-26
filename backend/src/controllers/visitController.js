import { db } from '../db/database.js';

/**
 * @desc    Book a room visit (In-Person or Video Tour)
 * @route   POST /api/visits
 */
export const bookVisit = async (req, res, next) => {
  try {
    const {
      roomId,
      roomTitle,
      visitType,
      visitDate,
      visitTimeSlot,
      visitorName,
      visitorPhone,
      notes
    } = req.body;

    if (!roomId || !visitorName || !visitorPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide room ID, visitor name, and contact phone.'
      });
    }

    const room = db.rooms.findById(roomId);
    const resolvedTitle = roomTitle || room?.title || 'Selected Room';
    const userId = req.user ? req.user.id : `guest-${Date.now()}`;

    const newVisit = await db.visits.insert({
      id: `visit-${Date.now()}`,
      userId,
      roomId,
      roomTitle: resolvedTitle,
      visitType: visitType || 'in_person',
      visitDate: visitDate || 'Tomorrow',
      visitTimeSlot: visitTimeSlot || '4:00 PM - 6:00 PM',
      visitorName: visitorName.trim(),
      visitorPhone: visitorPhone.trim(),
      status: 'confirmed',
      notes: notes || '',
      hostId: room?.owner?.id || null,
      hostName: room?.owner?.name || 'Property Host'
    });

    res.status(201).json({
      success: true,
      message: `Visit confirmed for ${newVisit.visitDate} (${newVisit.visitTimeSlot})!`,
      data: newVisit
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all visits for current user (as visitor or host)
 * @route   GET /api/visits/my
 */
export const getMyVisits = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const visits = db.visits.find(
      (v) => v.userId === userId || v.hostId === userId
    );

    res.json({
      success: true,
      count: visits.length,
      data: visits
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update visit status (confirmed / completed / cancelled)
 * @route   PATCH /api/visits/:id/status
 */
export const updateVisitStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value.'
      });
    }

    const updated = await db.visits.update(id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Visit not found' });
    }

    res.json({
      success: true,
      message: `Visit marked as ${status}`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
