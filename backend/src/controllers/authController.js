import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { db } from '../db/database.js';

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, avatar, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = db.users.findOne((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const defaultAvatar = role?.toLowerCase().includes('owner')
      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';

    const newUser = await db.users.insert({
      id: `user-${Date.now()}`,
      name: name?.trim() || 'Room Seeker',
      email: normalizedEmail,
      passwordHash,
      role: role || 'Verified Room Seeker',
      avatar: avatar || defaultAvatar,
      phone: phone || '',
      bio: '',
      savedRoomIds: []
    });

    const { passwordHash: _, ...safeUser } = newUser;
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user with email & password
 * @route   POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = db.users.findOne((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const { passwordHash: _, ...safeUser } = user;
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Signed in successfully!',
      token,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    1-Click Demo Login
 * @route   POST /api/auth/demo-login
 */
export const demoLogin = async (req, res, next) => {
  try {
    const { type } = req.body; // 'owner' | 'seeker'

    let user;
    if (type === 'owner') {
      user = db.users.findOne((u) => u.id === 'user-owner-1' || u.role.includes('Owner'));
    } else {
      user = db.users.findOne((u) => u.id === 'user-seeker-1' || u.role.includes('Seeker'));
    }

    if (!user) {
      // Fallback first user
      user = db.users.find()[0];
    }

    const { passwordHash: _, ...safeUser } = user;
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: `Signed in as Demo ${type === 'owner' ? 'Property Owner' : 'Room Seeker'}!`,
      token,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile + live stats
 * @route   GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compute live stats
    const savedCount = (user.savedRoomIds || []).length;
    const visitsCount = db.visits.find((v) => v.userId === user.id).length;
    const listedCount = db.rooms.find((r) => r.owner?.id === user.id || r.owner?.name === user.name).length;

    const { passwordHash: _, ...safeUser } = user;

    res.json({
      success: true,
      user: {
        ...safeUser,
        stats: {
          savedRooms: savedCount,
          visitsBooked: visitsCount,
          listedRooms: listedCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update current user profile
 * @route   PUT /api/auth/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, bio, avatar } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (bio !== undefined) updates.bio = bio;
    if (avatar !== undefined) updates.avatar = avatar;

    const updated = await db.users.update(req.user.id, updates);
    const { passwordHash: _, ...safeUser } = updated;

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};
