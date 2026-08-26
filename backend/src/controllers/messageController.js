import { db } from '../db/database.js';

/**
 * @desc    Send a message or inquiry to landlord/host
 * @route   POST /api/messages
 */
export const sendMessage = async (req, res, next) => {
  try {
    const { roomId, hostName, hostId, message, senderName, senderPhone } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty.'
      });
    }

    const room = roomId ? db.rooms.findById(roomId) : null;
    const sender = req.user;

    const newMsg = await db.messages.insert({
      id: `msg-${Date.now()}`,
      senderId: sender ? sender.id : `guest-${Date.now()}`,
      senderName: sender ? sender.name : (senderName || 'Interested Seeker'),
      senderPhone: sender ? sender.phone : (senderPhone || ''),
      recipientId: hostId || room?.owner?.id || 'host',
      recipientName: hostName || room?.owner?.name || 'Property Owner',
      roomId: roomId || null,
      roomTitle: room?.title || 'Listing',
      message: message.trim(),
      read: false
    });

    res.status(201).json({
      success: true,
      message: `Your message was delivered to ${newMsg.recipientName}!`,
      data: newMsg
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get messages for logged-in user
 * @route   GET /api/messages
 */
export const getMyMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const msgs = db.messages.find(
      (m) => m.senderId === userId || m.recipientId === userId
    );

    res.json({
      success: true,
      count: msgs.length,
      data: msgs
    });
  } catch (error) {
    next(error);
  }
};
