import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { db } from '../db/database.js';

/**
 * Strict authentication middleware - requires valid JWT Bearer token
 */
export const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing. Please sign in.'
      });
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = db.users.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User belonging to this token no longer exists.'
        });
      }

      // Strip password hash before attaching to req
      const { passwordHash, ...safeUser } = user;
      req.user = safeUser;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please sign in again.'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication middleware - attaches user if token is present and valid
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = db.users.findById(decoded.id);
      if (user) {
        const { passwordHash, ...safeUser } = user;
        req.user = safeUser;
      } else {
        req.user = null;
      }
    } catch (err) {
      req.user = null;
    }

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
