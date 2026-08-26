import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/index.js';
import {
  SEED_USERS,
  SEED_ROOMS,
  SEED_FLATMATES,
  SEED_VISITS,
  SEED_LOCALITIES,
  SEED_LANDMARKS
} from './seedData.js';

class JsonCollection {
  constructor(filename, initialData = []) {
    this.filePath = path.join(config.dataDir, `${filename}.json`);
    this.initialData = initialData;
    this.data = [];
    this.isLoaded = false;
  }

  async init() {
    try {
      await fs.mkdir(config.dataDir, { recursive: true });
      const raw = await fs.readFile(this.filePath, 'utf-8');
      this.data = JSON.parse(raw);
      this.isLoaded = true;
    } catch (err) {
      if (err.code === 'ENOENT') {
        // File does not exist yet, seed initial data
        this.data = JSON.parse(JSON.stringify(this.initialData));
        await this.persist();
        this.isLoaded = true;
      } else {
        console.error(`Error loading collection from ${this.filePath}:`, err);
        this.data = JSON.parse(JSON.stringify(this.initialData));
      }
    }
  }

  async persist() {
    try {
      const tempPath = `${this.filePath}.tmp`;
      await fs.writeFile(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      await fs.rename(tempPath, this.filePath);
    } catch (err) {
      console.error(`Failed to persist collection to ${this.filePath}:`, err);
      // Fallback direct write
      await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    }
  }

  find(predicate = () => true) {
    return this.data.filter(predicate);
  }

  findOne(predicate) {
    return this.data.find(predicate) || null;
  }

  findById(id) {
    return this.data.find((item) => String(item.id) === String(id)) || null;
  }

  async insert(item) {
    const newItem = {
      ...item,
      id: item.id || `id-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: item.createdAt || new Date().toISOString()
    };
    this.data.unshift(newItem);
    await this.persist();
    return newItem;
  }

  async update(id, updates) {
    const index = this.data.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return null;

    this.data[index] = {
      ...this.data[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await this.persist();
    return this.data[index];
  }

  async delete(id) {
    const initialLen = this.data.length;
    this.data = this.data.filter((item) => String(item.id) !== String(id));
    if (this.data.length !== initialLen) {
      await this.persist();
      return true;
    }
    return false;
  }

  async reset(newData) {
    this.data = JSON.parse(JSON.stringify(newData || this.initialData));
    await this.persist();
  }
}

class Database {
  constructor() {
    this.users = new JsonCollection('users', SEED_USERS);
    this.rooms = new JsonCollection('rooms', SEED_ROOMS);
    this.flatmates = new JsonCollection('flatmates', SEED_FLATMATES);
    this.visits = new JsonCollection('visits', SEED_VISITS);
    this.messages = new JsonCollection('messages', []);
    this.localities = new JsonCollection('localities', SEED_LOCALITIES);
    this.landmarks = new JsonCollection('landmarks', SEED_LANDMARKS);
  }

  async init() {
    await Promise.all([
      this.users.init(),
      this.rooms.init(),
      this.flatmates.init(),
      this.visits.init(),
      this.messages.init(),
      this.localities.init(),
      this.landmarks.init()
    ]);
    console.log(`✓ Database initialized at: ${config.dataDir}`);
    console.log(`✓ Loaded: ${this.rooms.data.length} rooms, ${this.users.data.length} users, ${this.flatmates.data.length} flatmates`);
  }

  async seed() {
    await this.users.reset(SEED_USERS);
    await this.rooms.reset(SEED_ROOMS);
    await this.flatmates.reset(SEED_FLATMATES);
    await this.visits.reset(SEED_VISITS);
    await this.messages.reset([]);
    await this.localities.reset(SEED_LOCALITIES);
    await this.landmarks.reset(SEED_LANDMARKS);
    console.log('✓ Database re-seeded with fresh default data.');
  }
}

export const db = new Database();
