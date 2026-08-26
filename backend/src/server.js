import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config/index.js';
import { db } from './db/database.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import savedRoutes from './routes/savedRoutes.js';
import visitRoutes from './routes/visitRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import flatmateRoutes from './routes/flatmateRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Security & Parsing Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting (General API protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', limiter);

// Root Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    dbStats: {
      roomsCount: db.rooms.data.length,
      usersCount: db.users.data.length,
      flatmatesCount: db.flatmates.data.length,
      visitsCount: db.visits.data.length
    }
  });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/flatmates', flatmateRoutes);
app.use('/api/locations', locationRoutes);

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize DB and Start Server
async function startServer() {
  try {
    await db.init();

    app.listen(config.port, () => {
      console.log(`===============================================`);
      console.log(` 🚀 RoomFinder Backend running on port ${config.port}`);
      console.log(` 📡 Health check: http://localhost:${config.port}/api/health`);
      console.log(` 🏠 API Base URL: http://localhost:${config.port}/api`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
