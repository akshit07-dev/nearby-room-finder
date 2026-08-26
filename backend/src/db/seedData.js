/**
 * Initial rich seed dataset for Nearby Room Finder
 */
import bcrypt from 'bcryptjs';

const DEFAULT_HASH = bcrypt.hashSync('password123', 10);

export const SEED_USERS = [
  {
    id: 'user-seeker-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    passwordHash: DEFAULT_HASH,
    role: 'Verified Room Seeker',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98765 43210',
    bio: 'Software engineer moving to Koramangala. Clean, quiet, and friendly.',
    savedRoomIds: ['room-1', 'room-4'],
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'user-owner-1',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@example.com',
    passwordHash: DEFAULT_HASH,
    role: 'Property Owner (Superhost)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98450 12890',
    bio: 'Superhost managing 4 verified properties across Koramangala and HSR Layout.',
    savedRoomIds: [],
    createdAt: '2025-11-15T08:30:00.000Z'
  },
  {
    id: 'user-seeker-2',
    name: 'Sneha Roy',
    email: 'sneha.roy@example.com',
    passwordHash: DEFAULT_HASH,
    role: 'Verified Room Seeker',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    phone: '+91 99887 11223',
    bio: 'Product designer looking for single studio or shared 2 BHK near Indiranagar.',
    savedRoomIds: ['room-2', 'room-5'],
    createdAt: '2026-02-01T12:00:00.000Z'
  }
];

export const SEED_ROOMS = [
  {
    id: 'room-1',
    title: 'Sunny Studio with Balcony & High-Speed Wi-Fi',
    type: 'Studio Apartment',
    category: 'studio',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 14500,
    deposit: 20000,
    maintenance: 1200,
    electricityRule: 'As per meter reading (₹8/unit)',
    rating: 4.9,
    reviewCount: 38,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Ready to Move',
    areaSqFt: 380,
    floor: '2nd of 4 floors',
    location: {
      address: '4th Cross, 5th Block, Koramangala',
      city: 'Bangalore',
      locality: 'Koramangala',
      lat: 12.9348,
      lng: 77.6225,
      landmarks: [
        { name: 'Jyoti Nivas College', distance: '350m', time: '4 min walk' },
        { name: 'Sony World Signal', distance: '600m', time: '7 min walk' },
        { name: 'Swiggy HQ / Tech Park', distance: '1.1 km', time: '14 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi (300 Mbps)',
      'Split Air Conditioner',
      'Attached Bathroom with Geyser',
      'Private Balcony',
      'Washing Machine',
      '24/7 Power Backup',
      'RO Drinking Water',
      'Daily Housekeeping',
      'Dedicated Work Desk & Chair',
      'Covered Bike Parking'
    ],
    description: 'Bright and airy private studio apartment located in the prime cafe corridor of Koramangala 5th Block. Fully furnished with king size bed, ergonomic study chair, smart TV, and modern kitchenette. Zero brokerage direct from owner.',
    houseRules: [
      'Non-smoking inside the room',
      'Guests allowed until 10:00 PM',
      'Quiet hours after 11:00 PM',
      'Pet friendly upon prior notice'
    ],
    owner: {
      id: 'user-owner-1',
      name: 'Vikram Mehta',
      role: 'Property Owner (Superhost)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98450 12890',
      whatsapp: '+919845012890',
      responseTime: 'Under 15 mins',
      memberSince: 'March 2023',
      verifiedId: true
    },
    createdAt: '2026-01-05T09:00:00.000Z'
  },
  {
    id: 'room-2',
    title: 'Modern Private Room in Luxury Co-living Villa',
    type: 'Single Room',
    category: 'single',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 11000,
    deposit: 15000,
    maintenance: 0,
    electricityRule: 'Included in rent',
    rating: 4.8,
    reviewCount: 52,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 220,
    floor: '1st of 3 floors',
    location: {
      address: '14th Main, Sector 4, HSR Layout',
      city: 'Bangalore',
      locality: 'HSR Layout',
      lat: 12.9152,
      lng: 77.6410,
      landmarks: [
        { name: 'HSR BDA Complex', distance: '400m', time: '5 min walk' },
        { name: 'Agara Lake Walkway', distance: '800m', time: '10 min walk' },
        { name: 'Silk Board Metro Interchange', distance: '1.4 km', time: '18 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioner',
      'Attached Bathroom',
      'Home-Cooked 3 Meals Daily',
      'Daily Cleaning Service',
      'Gym & Yoga Terrace',
      'Biometric Security Access',
      'Common Lounge with PS5',
      'Washing Machine & Dryer'
    ],
    description: 'Chic single room in an architect-designed co-living community in HSR Sector 4. Inclusive of 3 home-cooked meals, daily housekeeping, 500Mbps optical fiber internet, and access to rooftop fitness deck.',
    houseRules: [
      'No alcohol in common corridors',
      'Visitor registration required at reception',
      'Quiet hours after 11:30 PM'
    ],
    owner: {
      id: 'owner-hsr-1',
      name: 'Stanza Coliving Hub',
      role: 'Verified Property Partner',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      phone: '+91 80491 55660',
      whatsapp: '+918049155660',
      responseTime: 'Under 5 mins',
      memberSince: 'January 2022',
      verifiedId: true
    },
    createdAt: '2026-01-10T11:00:00.000Z'
  },
  {
    id: 'room-3',
    title: 'Spacious 1 BHK Flat with Modular Kitchen & Car Park',
    type: '1 BHK Flat',
    category: '1bhk',
    gender: 'Any',
    furnishing: 'Semi-Furnished',
    rent: 18500,
    deposit: 35000,
    maintenance: 1500,
    electricityRule: 'As per BESCOM electric meter',
    rating: 4.7,
    reviewCount: 19,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: false,
    availableFrom: '1st of Next Month',
    areaSqFt: 560,
    floor: '3rd of 5 floors (Lift available)',
    location: {
      address: '12th Main, HAL 2nd Stage, Indiranagar',
      city: 'Bangalore',
      locality: 'Indiranagar',
      lat: 12.9719,
      lng: 77.6412,
      landmarks: [
        { name: 'Indiranagar 100ft Road', distance: '250m', time: '3 min walk' },
        { name: 'Indiranagar Metro Station (Purple Line)', distance: '650m', time: '8 min walk' },
        { name: 'Toit Brewpub / 100ft Junction', distance: '500m', time: '6 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee1b2b93e083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Covered Car & Bike Parking',
      'High-Speed Wi-Fi Provision',
      'Lift with Automatic Rescue Device',
      'Modular Kitchen with Chimney',
      'Wardrobes with Full Mirrors',
      '24/7 Cauvery Water + Borewell',
      'Gated Society with CCTV Surveillance'
    ],
    description: 'A spacious and well-lit 1 BHK apartment situated in prime Indiranagar HAL 2nd Stage. Walking distance to 100ft Road pubs, cafes, and Indiranagar Metro Station. Ideal for working couples or professionals.',
    houseRules: [
      'Families and working bachelors welcome',
      'No loud music in corridors'
    ],
    owner: {
      id: 'owner-ind-1',
      name: 'Ananya Deshmukh',
      role: 'Direct Owner',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      phone: '+91 97412 88990',
      whatsapp: '+919741288990',
      responseTime: 'Within 1 hour',
      memberSince: 'June 2023',
      verifiedId: true
    },
    createdAt: '2026-01-15T14:30:00.000Z'
  },
  {
    id: 'room-4',
    title: 'Premium Executive Single Room in Tech Gated Society',
    type: 'Single Room in 3 BHK',
    category: 'single',
    gender: 'Male',
    furnishing: 'Furnished',
    rent: 9500,
    deposit: 12000,
    maintenance: 800,
    electricityRule: 'Split equally among flatmates',
    rating: 4.9,
    reviewCount: 44,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Ready to Move',
    areaSqFt: 210,
    floor: '7th of 14 floors',
    location: {
      address: 'Near ITPL Main Road, Whitefield',
      city: 'Bangalore',
      locality: 'Whitefield',
      lat: 12.9860,
      lng: 77.7320,
      landmarks: [
        { name: 'ITPL Tech Park Gate 1', distance: '500m', time: '6 min walk' },
        { name: 'Pattandur Agrahara Metro', distance: '400m', time: '5 min walk' },
        { name: 'Inorbit Mall Whitefield', distance: '900m', time: '11 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed 5G Wi-Fi',
      'Attached Bathroom & Balcony',
      'Olympic Swimming Pool Access',
      'Clubhouse Gym & Badminton Court',
      'Power Backup 100%',
      'Microwave & Gas Stove in Kitchen',
      'Covered Parking'
    ],
    description: 'Private master bedroom with attached bathroom in a premium high-rise society right opposite ITPL. The society features an infinity pool, gym, tennis court, and supermarket inside campus. Zero brokerage.',
    houseRules: [
      'Male bachelor only',
      'Maintain common room cleanliness',
      'Strictly non-smoking indoors'
    ],
    owner: {
      id: 'owner-wf-1',
      name: 'Rohan Joshi',
      role: 'Flatmate / Lead Tenant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      phone: '+91 91234 56780',
      whatsapp: '+919123456780',
      responseTime: 'Under 10 mins',
      memberSince: 'September 2023',
      verifiedId: true
    },
    createdAt: '2026-01-20T10:00:00.000Z'
  },
  {
    id: 'room-5',
    title: 'Cozy Budget Single PG Room with Food & Wi-Fi',
    type: 'PG / Co-living Room',
    category: 'pg',
    gender: 'Female',
    furnishing: 'Furnished',
    rent: 7500,
    deposit: 8000,
    maintenance: 0,
    electricityRule: 'Included in monthly rent',
    rating: 4.6,
    reviewCount: 67,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 160,
    floor: '2nd Floor',
    location: {
      address: '2nd Stage, BTM Layout',
      city: 'Bangalore',
      locality: 'BTM Layout',
      lat: 12.9166,
      lng: 77.6101,
      landmarks: [
        { name: 'Udupi Garden Signal', distance: '300m', time: '4 min walk' },
        { name: 'Jayadeva Hospital Metro Junction', distance: '900m', time: '11 min walk' },
        { name: 'Vega City Mall', distance: '1.2 km', time: '15 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      '3 Times South & North Indian Food',
      'High-Speed Wi-Fi',
      'Attached Geyser Bathroom',
      'Washing Machine & Terrace Drying Area',
      '24/7 Biometric Female Warden Security',
      'RO Drinking Water Coolers on Every Floor',
      'Daily Room Housekeeping'
    ],
    description: 'Safe and well-managed ladies executive PG with hygienic 3-time meals, high-speed fiber internet, and individual wardrobe with locker. Located 3 minutes from Udupi Garden bus stand and food street.',
    houseRules: [
      'Female residents only',
      'Gate closes at 10:30 PM (Biometric late pass available)',
      'Male visitors restricted to ground floor lobby'
    ],
    owner: {
      id: 'owner-btm-1',
      name: 'Gayathri Residency',
      role: 'Verified PG Operator',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
      phone: '+91 94480 33445',
      whatsapp: '+919448033445',
      responseTime: 'Under 10 mins',
      memberSince: 'August 2021',
      verifiedId: true
    },
    createdAt: '2026-01-22T16:00:00.000Z'
  },
  {
    id: 'room-6',
    title: 'Lakeview Studio with Work-From-Home Lounge & Smart TV',
    type: 'Studio Apartment',
    category: 'studio',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 22000,
    deposit: 40000,
    maintenance: 2000,
    electricityRule: 'As per meter reading',
    rating: 4.95,
    reviewCount: 31,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Ready to Move',
    areaSqFt: 450,
    floor: '9th of 18 floors',
    location: {
      address: 'Hiranandani Gardens, Powai',
      city: 'Mumbai',
      locality: 'Powai',
      lat: 19.1176,
      lng: 72.9060,
      landmarks: [
        { name: 'Powai Lake Promenade', distance: '200m', time: '3 min walk' },
        { name: 'IIT Bombay Main Gate', distance: '1.2 km', time: '14 min walk' },
        { name: 'Galleria Shopping Arcade', distance: '400m', time: '5 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Lake View Balcony',
      '55-inch 4K Smart TV',
      'Ergonomic Herman Miller Chair & Desk',
      'Daikin Inverter AC',
      'Full Kitchen with Microwave & Hob',
      'Swimming Pool & Rooftop Cafe',
      'High-Speed Wi-Fi (500 Mbps)'
    ],
    description: 'Designer studio apartment overlooking tranquil Powai Lake in Hiranandani. Features full modular kitchen, king bed, ultra-fast optic fiber, and rooftop pool access. Direct owner listing, no brokerage.',
    houseRules: [
      'Cleanliness policy in balcony',
      'Guests welcome',
      'Pets allowed'
    ],
    owner: {
      id: 'owner-pow-1',
      name: 'Karan Singhania',
      role: 'Property Owner (Superhost)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98200 44556',
      whatsapp: '+919820044556',
      responseTime: 'Under 15 mins',
      memberSince: 'February 2022',
      verifiedId: true
    },
    createdAt: '2026-02-01T08:00:00.000Z'
  },
  {
    id: 'room-7',
    title: 'Designer 2 BHK Penthouse Room with Private Terrace',
    type: 'Private Room in 2 BHK',
    category: 'single',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 16000,
    deposit: 25000,
    maintenance: 1200,
    electricityRule: 'Split equally',
    rating: 4.88,
    reviewCount: 27,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 320,
    floor: '4th Floor (Top Penthouse)',
    location: {
      address: 'Near DLF Cyber City, Sector 24, DLF Phase 3',
      city: 'Gurgaon',
      locality: 'Cyber City',
      lat: 28.4905,
      lng: 77.0898,
      landmarks: [
        { name: 'Micromax Moulsari Avenue Metro', distance: '350m', time: '4 min walk' },
        { name: 'DLF CyberHub & Offices', distance: '800m', time: '10 min walk' },
        { name: 'Ambience Mall Gurgaon', distance: '1.5 km', time: '18 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Private Terrace Garden',
      'Air Conditioner',
      'High-Speed Wi-Fi',
      'Attached European Bathroom',
      'Automatic Washing Machine',
      'Cook & Housekeeping Available',
      '24/7 Power Backup with Inverter'
    ],
    description: 'Master bedroom with exclusive private terrace in DLF Phase 3, 5 minutes from CyberHub and Rapid Metro. Perfect for corporate employees working in Cyber City, Horizon Center, or Udyog Vihar.',
    houseRules: [
      'Professionals only',
      'Clean common kitchen after use',
      'Terrace gatherings permitted on weekends'
    ],
    owner: {
      id: 'owner-ggn-1',
      name: 'Aditya Oberoi',
      role: 'Direct Owner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      phone: '+91 99100 88776',
      whatsapp: '+919910088776',
      responseTime: 'Under 20 mins',
      memberSince: 'May 2023',
      verifiedId: true
    },
    createdAt: '2026-02-05T15:00:00.000Z'
  },
  {
    id: 'room-8',
    title: 'Peaceful Single Room near Koramangala 1st Block Park',
    type: 'Single Room',
    category: 'single',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 12500,
    deposit: 18000,
    maintenance: 500,
    electricityRule: 'Included in rent',
    rating: 4.75,
    reviewCount: 22,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 240,
    floor: '1st Floor',
    location: {
      address: '8th Main, 1st Block, Koramangala',
      city: 'Bangalore',
      locality: 'Koramangala',
      lat: 12.9280,
      lng: 77.6320,
      landmarks: [
        { name: 'Koramangala 1st Block Park', distance: '120m', time: '2 min walk' },
        { name: 'Wipro Park Junction', distance: '500m', time: '6 min walk' },
        { name: 'Oasis Centre Mall', distance: '900m', time: '12 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Split Air Conditioner',
      'Attached Bathroom',
      'Daily Housekeeping',
      'RO Drinking Water',
      'Bike Parking'
    ],
    description: 'Serene single bedroom overlooking lush green park in Koramangala 1st Block. Quiet residential neighborhood close to Wipro Park and top startup offices.',
    houseRules: [
      'Quiet hours after 11 PM',
      'Clean common areas'
    ],
    owner: {
      id: 'user-owner-1',
      name: 'Vikram Mehta',
      role: 'Property Owner (Superhost)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98450 12890',
      whatsapp: '+919845012890',
      responseTime: 'Under 15 mins',
      memberSince: 'March 2023',
      verifiedId: true
    },
    createdAt: '2026-02-10T12:00:00.000Z'
  }
];

export const SEED_FLATMATES = [
  {
    id: 'mate-1',
    name: 'Aarav Patel',
    age: 25,
    gender: 'Male',
    occupation: 'Software Engineer @ Swiggy',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    budget: '₹12,000 - ₹18,000 / mo',
    targetLocality: 'Koramangala / HSR Layout',
    moveInDate: 'Next 2 Weeks',
    about: 'Techie by day, guitarist on weekends. Looking for an energetic flatmate to share a 2 or 3 BHK flat. Value cleanliness, personal space, and occasional board game nights.',
    tags: ['Non-Smoker', 'Pet Friendly', 'Early Riser', 'WFH 3 Days/wk', 'Cooks Food', 'Fitness Fanatic'],
    preferences: {
      roomType: 'Private Room in Shared Flat',
      diet: 'Any',
      smoking: 'Non-Smoker',
      drinking: 'Socially'
    },
    contact: {
      phone: '+91 98765 43210',
      whatsapp: '+919876543210',
      email: 'aarav.patel@example.com'
    },
    createdAt: '2026-02-01T10:00:00.000Z'
  },
  {
    id: 'mate-2',
    name: 'Pooja Hegde',
    age: 24,
    gender: 'Female',
    occupation: 'Product Designer @ CRED',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    budget: '₹15,000 - ₹22,000 / mo',
    targetLocality: 'Indiranagar / Koramangala',
    moveInDate: 'Immediate',
    about: 'Design fanatic looking for a chilled-out female flatmate. Love plants, art, and exploring specialty coffee places. Keep the common space very neat and organized.',
    tags: ['Female Only', 'Vegetarian Friendly', 'Plant Lover', 'Coffee Enthusiast', 'Quiet After 11PM'],
    preferences: {
      roomType: 'Master Bedroom / 2 BHK',
      diet: 'Vegetarian / Eggetarian',
      smoking: 'No Smoking',
      drinking: 'Occasional'
    },
    contact: {
      phone: '+91 97890 12345',
      whatsapp: '+919789012345',
      email: 'pooja.hegde@example.com'
    },
    createdAt: '2026-02-05T12:00:00.000Z'
  },
  {
    id: 'mate-3',
    name: 'Kabir & Siddharth',
    age: 26,
    gender: 'Male',
    occupation: 'Founders @ AI Startup',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    budget: '₹10,000 - ₹16,000 / mo',
    targetLocality: 'HSR Layout Sector 1-4',
    moveInDate: 'Within a Month',
    about: 'Two college friends running an early-stage startup looking for a 3rd flatmate for a spacious 3 BHK villa in HSR. We have a shared cook and high-speed multi-WAN Wi-Fi.',
    tags: ['Startup Life', 'Night Owls', 'Cook Available', 'Fast Internet', 'Work From Home'],
    preferences: {
      roomType: 'Private Room in 3 BHK',
      diet: 'Any',
      smoking: 'Balcony Only',
      drinking: 'Chill weekends'
    },
    contact: {
      phone: '+91 91234 56789',
      whatsapp: '+919123456789',
      email: 'founders@hsrstartup.com'
    },
    createdAt: '2026-02-10T14:00:00.000Z'
  },
  {
    id: 'mate-4',
    name: 'Meera Nambiar',
    age: 27,
    gender: 'Female',
    occupation: 'Financial Analyst @ Goldman Sachs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    budget: '₹18,000 - ₹25,000 / mo',
    targetLocality: 'Indiranagar / Domlur / EGL',
    moveInDate: '1st of Next Month',
    about: 'Working near EGL tech park. Seeking a relaxed, clean, and modern 2 BHK setup with an attached balcony. Easygoing, love yoga and indie movies.',
    tags: ['Gated Society', 'Balcony Required', 'Gym Enthusiast', 'Professional', 'Non-Smoker'],
    preferences: {
      roomType: '2 BHK Sharing',
      diet: 'Any',
      smoking: 'Strictly No',
      drinking: 'Social'
    },
    contact: {
      phone: '+91 99887 66554',
      whatsapp: '+919988766554',
      email: 'meera.nambiar@example.com'
    },
    createdAt: '2026-02-12T16:00:00.000Z'
  }
];

export const SEED_VISITS = [
  {
    id: 'visit-1',
    userId: 'user-seeker-1',
    roomId: 'room-1',
    roomTitle: 'Sunny Studio with Balcony & High-Speed Wi-Fi',
    visitType: 'in_person',
    visitDate: 'Tomorrow',
    visitTimeSlot: '4:00 PM - 6:00 PM',
    visitorName: 'Rahul Sharma',
    visitorPhone: '+91 98765 43210',
    status: 'confirmed',
    notes: 'Looking forward to viewing the balcony and study setup.',
    createdAt: '2026-02-18T10:00:00.000Z'
  },
  {
    id: 'visit-2',
    userId: 'user-seeker-1',
    roomId: 'room-4',
    roomTitle: 'Premium Executive Single Room in Tech Gated Society',
    visitType: 'video_tour',
    visitDate: 'This Saturday',
    visitTimeSlot: '11:00 AM - 1:00 PM',
    visitorName: 'Rahul Sharma',
    visitorPhone: '+91 98765 43210',
    status: 'pending',
    notes: 'Please schedule Google Meet or WhatsApp video tour.',
    createdAt: '2026-02-20T14:30:00.000Z'
  }
];

export const SEED_LOCALITIES = [
  {
    id: 'koramangala',
    name: 'Koramangala, Bangalore',
    lat: 12.9352,
    lng: 77.6245,
    tag: 'Tech & Cafe Hub',
    avgRent: '₹14,000'
  },
  {
    id: 'hsr',
    name: 'HSR Layout, Bangalore',
    lat: 12.9121,
    lng: 77.6446,
    tag: 'Startups & Greenery',
    avgRent: '₹16,500'
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar, Bangalore',
    lat: 12.9784,
    lng: 77.6408,
    tag: 'Nightlife & Metro',
    avgRent: '₹19,000'
  },
  {
    id: 'whitefield',
    name: 'Whitefield, Bangalore',
    lat: 12.9698,
    lng: 77.7500,
    tag: 'IT Parks & Malls',
    avgRent: '₹13,500'
  },
  {
    id: 'btm',
    name: 'BTM Layout, Bangalore',
    lat: 12.9166,
    lng: 77.6101,
    tag: 'Budget & Student Friendly',
    avgRent: '₹10,500'
  },
  {
    id: 'powai',
    name: 'Powai, Mumbai',
    lat: 19.1176,
    lng: 72.9060,
    tag: 'Lake Views & IIT',
    avgRent: '₹22,000'
  },
  {
    id: 'cybercity',
    name: 'Cyber City, Gurgaon',
    lat: 28.4905,
    lng: 77.0898,
    tag: 'Corporate & Metro',
    avgRent: '₹18,000'
  }
];

export const SEED_LANDMARKS = [
  { name: 'Sony World Junction', lat: 12.9382, lng: 77.6285 },
  { name: 'Koramangala 5th Block Metro', lat: 12.9348, lng: 77.6190 },
  { name: 'Forum South Mall', lat: 12.9350, lng: 77.6100 },
  { name: 'HSR BDA Complex', lat: 12.9110, lng: 77.6385 },
  { name: 'Indiranagar 100ft Road', lat: 12.9719, lng: 77.6412 },
  { name: 'RMZ Ecospace Tech Park', lat: 12.9260, lng: 77.6830 }
];
