# Nearby Room Finder — REST API Backend

A production-grade, lightweight, and high-performance Express REST backend for the **Nearby Room Finder** application.

---

## 🛠 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: Pure JS File-backed Atomic JSON Database (`backend/data/`) with ACID file-swapping
- **Security**: Helmet, CORS, JWT Authentication, bcryptjs password hashing, Rate Limiting
- **Logging**: Morgan

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm --prefix backend install
```

### 2. Run Backend Dev Server (with live reload)
```bash
npm run server
# or from root:
npm run dev # runs both backend and frontend concurrently
```

### 3. Re-seed Initial Data
```bash
npm run seed
```

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` — Returns server uptime and database record counts.

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new room seeker or property owner | No |
| `POST` | `/api/auth/login` | Login with email and password -> JWT token | No |
| `POST` | `/api/auth/demo-login` | 1-Click login (`{ type: 'seeker' \| 'owner' }`) | No |
| `GET` | `/api/auth/me` | Current user profile with activity stats | Yes (Bearer Token) |
| `PUT` | `/api/auth/profile` | Update profile information | Yes (Bearer Token) |

### Rooms & Geolocation (`/api/rooms`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/rooms` | Query rooms with Haversine distance, filters & sorting | No |
| `GET` | `/api/rooms/:id` | Get room details with commute metrics | No |
| `POST` | `/api/rooms` | Create a new room listing | Optional |
| `PUT` | `/api/rooms/:id` | Update existing listing | Yes (Bearer Token) |
| `DELETE` | `/api/rooms/:id` | Delete listing | Yes (Bearer Token) |
| `POST` | `/api/rooms/:id/reviews` | Post review & recalculate rating | Optional |

#### Query Parameters for `GET /api/rooms`:
- `userLat`, `userLng`: Reference coordinate (calculates accurate `calculatedDistance` in km via Haversine formula)
- `maxDistance`: Distance radius filter (e.g. `5`, `10` km)
- `maxPrice`, `minPrice`: Budget boundaries
- `category` / `type`: Filter by `studio`, `single`, `pg`, `1bhk`, `2bhk`
- `gender`: Filter by `Any`, `Male`, `Female`
- `noBrokerage`, `instantMoveIn`, `furnished`, `ac`, `meals`, `attachedBath`, `wifi`: Boolean amenity flags
- `searchQuery` / `q`: Multi-field text search (title, address, locality, landmarks, amenities)
- `sort`: `distance`, `price-asc`, `price-desc`, `rating`, `newest`

### Saved Wishlist (`/api/saved`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/saved` | List saved room IDs and full room objects | Yes (Bearer Token) |
| `POST` | `/api/saved/:roomId` | Toggle / save room | Yes (Bearer Token) |
| `DELETE` | `/api/saved/:roomId` | Remove room from saved wishlist | Yes (Bearer Token) |
| `DELETE` | `/api/saved` | Clear all saved rooms | Yes (Bearer Token) |

### Visits & Tours (`/api/visits`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/visits` | Book in-person or video tour visit | Optional |
| `GET` | `/api/visits/my` | Get user's booked visits and host's incoming visits | Yes (Bearer Token) |
| `PATCH` | `/api/visits/:id/status` | Update status (`confirmed`, `completed`, `cancelled`) | Yes (Bearer Token) |

### Messages & Inquiries (`/api/messages`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/messages` | Send inquiry to property host | Optional |
| `GET` | `/api/messages` | View user inquiries | Yes (Bearer Token) |

### Flatmates (`/api/flatmates`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/flatmates` | Filter flatmates by gender, tags, locality | No |
| `GET` | `/api/flatmates/:id` | Get single flatmate seeker profile | No |
| `POST` | `/api/flatmates` | Post a new flatmate seeker profile | Optional |

### Locations & Commute (`/api/locations`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/locations/localities` | Preset hub localities (Koramangala, HSR, Indiranagar...) | No |
| `GET` | `/api/locations/landmarks` | Major tech parks and metro stations | No |
| `POST` | `/api/locations/commute` | Calculate multi-modal travel times (walk, bike, transit, drive) | No |
