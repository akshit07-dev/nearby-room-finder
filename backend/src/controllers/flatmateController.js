import { db } from '../db/database.js';

/**
 * @desc    Get all flatmate profiles with filtering
 * @route   GET /api/flatmates
 */
export const getAllFlatmates = async (req, res, next) => {
  try {
    const { gender, tag, locality, search } = req.query;
    let list = db.flatmates.find();

    // Filter by gender
    if (gender && gender !== 'All' && gender !== 'all') {
      list = list.filter((m) => m.gender?.toLowerCase() === gender.toLowerCase());
    }

    // Filter by tag
    if (tag && tag !== 'All' && tag !== 'all') {
      list = list.filter((m) =>
        m.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    // Filter by locality
    if (locality && locality !== 'all') {
      list = list.filter((m) =>
        m.targetLocality?.toLowerCase().includes(locality.toLowerCase())
      );
    }

    // Search query
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.occupation?.toLowerCase().includes(q) ||
          m.about?.toLowerCase().includes(q) ||
          m.targetLocality?.toLowerCase().includes(q)
      );
    }

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
 * @desc    Get single flatmate profile
 * @route   GET /api/flatmates/:id
 */
export const getFlatmateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mate = db.flatmates.findById(id);

    if (!mate) {
      return res.status(404).json({ success: false, message: 'Flatmate profile not found' });
    }

    res.json({
      success: true,
      data: mate
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new flatmate seeker profile
 * @route   POST /api/flatmates
 */
export const createFlatmate = async (req, res, next) => {
  try {
    const {
      name,
      age,
      gender,
      occupation,
      budget,
      targetLocality,
      moveInDate,
      about,
      tags,
      preferences,
      contact,
      avatar
    } = req.body;

    if (!name || !gender || !targetLocality) {
      return res.status(400).json({
        success: false,
        message: 'Name, gender, and target locality are required.'
      });
    }

    const defaultAvatar = gender === 'Female'
      ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
      : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80';

    const newMate = await db.flatmates.insert({
      id: `mate-${Date.now()}`,
      name: name.trim(),
      age: Number(age) || 25,
      gender: gender || 'Male',
      occupation: occupation || 'Working Professional',
      avatar: avatar || defaultAvatar,
      budget: budget || '₹10,000 - ₹18,000 / mo',
      targetLocality: targetLocality.trim(),
      moveInDate: moveInDate || 'Immediate',
      about: about || 'Friendly, clean, and respectful roommate seeking a pleasant shared flat.',
      tags: Array.isArray(tags) && tags.length > 0 ? tags : ['Non-Smoker', 'Work From Home'],
      preferences: preferences || {
        roomType: 'Private Room in Shared Flat',
        diet: 'Any',
        smoking: 'Non-Smoker',
        drinking: 'Socially'
      },
      contact: contact || {
        phone: '+91 98765 00000',
        whatsapp: '919876500000',
        email: 'flatmate@example.com'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Flatmate profile created successfully!',
      data: newMate
    });
  } catch (error) {
    next(error);
  }
};
