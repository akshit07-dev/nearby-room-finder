/**
 * Rich, verified room and flat listings with high-res photos and real coordinates
 */

export const INITIAL_ROOMS = [
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
      name: 'Vikram Mehta',
      role: 'Property Owner (Superhost)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98450 12890',
      whatsapp: '+919845012890',
      responseTime: 'Under 15 mins',
      memberSince: 'March 2023',
      verifiedId: true
    }
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
        { name: 'Koramangala Sony Signal', distance: '2.3 km', time: '8 min drive' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioner',
      'Attached Bathroom',
      '3 Times Homely Meals (Included)',
      'Community Lounge & Pool Table',
      'Rooftop Gym & Yoga Deck',
      'Bi-weekly Linen Change',
      'Biometric Keyless Entry',
      'Refrigerator & Microwave'
    ],
    description: 'All-inclusive co-living experience designed for young professionals and startup founders. Includes 3 daily chef-prepared meals, daily cleaning, high-speed fiber internet, and access to rooftop co-working lounge.',
    houseRules: [
      'No loud music in common corridors after 11 PM',
      'Visitors registered at security gate',
      'No indoor smoking'
    ],
    owner: {
      name: 'Ananya Sharma',
      role: 'Community Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      phone: '+91 97401 55219',
      whatsapp: '+919740155219',
      responseTime: 'Under 10 mins',
      memberSince: 'Jan 2024',
      verifiedId: true
    }
  },
  {
    id: 'room-3',
    title: 'Spacious 1 BHK Flat near Metro Station',
    type: '1 BHK',
    category: '1bhk',
    gender: 'Any',
    furnishing: 'Semi-Furnished',
    rent: 18500,
    deposit: 40000,
    maintenance: 1500,
    electricityRule: 'Government BESCOM bill',
    rating: 4.7,
    reviewCount: 19,
    isVerified: true,
    isNoBrokerage: false,
    isInstantMoveIn: false,
    availableFrom: '1st of Next Month',
    areaSqFt: 550,
    floor: '3rd of 5 floors (Lift available)',
    location: {
      address: '12th Main, HAL 2nd Stage, Indiranagar',
      city: 'Bangalore',
      locality: 'Indiranagar',
      lat: 12.9735,
      lng: 77.6432,
      landmarks: [
        { name: 'Indiranagar Metro Station', distance: '300m', time: '4 min walk' },
        { name: '100ft Road Food Street', distance: '250m', time: '3 min walk' },
        { name: 'EGL Business Tech Park', distance: '2.8 km', time: '10 min drive' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee1a2b37803e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Modular Kitchen with Chimney',
      'Covered Car & Bike Parking',
      '24/7 Elevator & Lift',
      'Geyser in Bathroom',
      'Security Guard & CCTV',
      'Wardrobe with Mirror',
      '24/7 Cauvery Water Supply'
    ],
    description: 'Beautiful 1 BHK residential apartment in tree-lined Indiranagar. Just 4 minutes walk from the Purple Line Metro station. Features large windows, modular kitchen, separate utility area, and 24/7 security guard.',
    houseRules: [
      'Family or working professionals preferred',
      'Maintenance due on 5th of each month'
    ],
    owner: {
      name: 'K. R. Venkat',
      role: 'Direct Owner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      phone: '+91 94480 33412',
      whatsapp: '+919448033412',
      responseTime: 'Under 1 hour',
      memberSince: 'May 2022',
      verifiedId: true
    }
  },
  {
    id: 'room-4',
    title: 'Premium Girls PG with Food, AC & CCTV Security',
    type: 'Shared / PG',
    category: 'pg',
    gender: 'Female',
    furnishing: 'Furnished',
    rent: 8500,
    deposit: 10000,
    maintenance: 0,
    electricityRule: 'Included in rent',
    rating: 4.9,
    reviewCount: 64,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 180,
    floor: '2nd of 4 floors',
    location: {
      address: '7th Main, 4th Block, Koramangala',
      city: 'Bangalore',
      locality: 'Koramangala',
      lat: 12.9320,
      lng: 77.6288,
      landmarks: [
        { name: 'Koramangala Club', distance: '200m', time: '3 min walk' },
        { name: 'Oasis Centre Mall', distance: '750m', time: '9 min walk' },
        { name: 'St. John’s Hospital', distance: '1.2 km', time: '5 min drive' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      '3 Times Nutritious North & South Indian Meals',
      'Female Security Guard & 24/7 CCTV',
      'High-Speed Wi-Fi',
      'Air Conditioner',
      'Attached Bathroom',
      'Washing Machine & Drying Area',
      'Daily Housekeeping & Dusting',
      'Individual Lockers & Cupboards'
    ],
    description: 'Safe, hygienic, and comforting PG accommodation exclusively for female students and working executives. Includes high-speed Wi-Fi, delicious home-style food, power backup, and round-the-clock security surveillance.',
    houseRules: [
      'Strict female only property',
      'Gate closing at 10:30 PM (extension on request)',
      'No male visitors permitted inside rooms'
    ],
    owner: {
      name: 'Sunita Rao',
      role: 'Host & Caretaker',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      phone: '+91 99002 81765',
      whatsapp: '+919900281765',
      responseTime: 'Within 5 mins',
      memberSince: 'Aug 2021',
      verifiedId: true
    }
  },
  {
    id: 'room-5',
    title: 'Cozy Private Room in 3 BHK Shared Flat',
    type: 'Single Room',
    category: 'single',
    gender: 'Male',
    furnishing: 'Furnished',
    rent: 9800,
    deposit: 18000,
    maintenance: 800,
    electricityRule: 'Split equally among flatmates',
    rating: 4.6,
    reviewCount: 14,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 200,
    floor: '4th of 6 floors (Elevator)',
    location: {
      address: '27th Main, Sector 1, HSR Layout',
      city: 'Bangalore',
      locality: 'HSR Layout',
      lat: 12.9100,
      lng: 77.6520,
      landmarks: [
        { name: 'NIFT College', distance: '500m', time: '6 min walk' },
        { name: 'Cult.Fit Gym HSR', distance: '300m', time: '4 min walk' },
        { name: 'Outer Ring Road (ORR)', distance: '1.0 km', time: '12 min walk' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Attached Washroom with Geyser',
      '100 Mbps Wi-Fi',
      'Fully Equipped Shared Kitchen',
      'Washing Machine & Fridge',
      'Gym & Swimming Pool in Society',
      'Balcony with City View',
      'Gated Society with 24/7 Security'
    ],
    description: 'Looking for a chill male flatmate to occupy a private master bedroom in a plush gated society in HSR Sector 1. Flatmates are software engineers at Amazon & Flipkart. Cook and maid already set up.',
    houseRules: [
      'Chill vibes, bachelor friendly',
      'Equal split of cook and maid bills (~₹2,500/mo)',
      'Smoking on balcony only'
    ],
    owner: {
      name: 'Rohan Deshmukh',
      role: 'Current Flatmate',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98860 41299',
      whatsapp: '+919886041299',
      responseTime: 'Under 20 mins',
      memberSince: 'Nov 2023',
      verifiedId: true
    }
  },
  {
    id: 'room-6',
    title: 'Luxury 2 BHK Serviced Apartment near Tech Parks',
    type: '2 BHK',
    category: '2bhk',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 28000,
    deposit: 50000,
    maintenance: 2500,
    electricityRule: 'Actual meter charges',
    rating: 4.9,
    reviewCount: 41,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: false,
    availableFrom: 'Within 7 Days',
    areaSqFt: 1100,
    floor: '7th of 12 floors',
    location: {
      address: 'Outer Ring Road, Bellandur / Marathahalli',
      city: 'Bangalore',
      locality: 'Koramangala',
      lat: 12.9275,
      lng: 77.6780,
      landmarks: [
        { name: 'Ecospace Business Park', distance: '400m', time: '5 min walk' },
        { name: 'Central Mall Bellandur', distance: '900m', time: '11 min walk' },
        { name: 'Cessna Business Park', distance: '1.8 km', time: '6 min drive' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Central AC in All Rooms',
      '55" 4K Smart OLED TV',
      'Swimming Pool & Clubhouse Access',
      'Fully Outfitted Modular Kitchen',
      '2 Covered Reserved Car Parkings',
      '24/7 Concierge & Power Backup',
      'High-Speed 500 Mbps Fiber Internet',
      'Dishwasher & Washing Machine'
    ],
    description: 'Ultra-luxurious fully furnished 2 BHK apartment inside a premier high-rise community right opposite RMZ Ecospace. Ideal for tech executives seeking walk-to-work convenience and resort-style living.',
    houseRules: [
      'Corporate & family friendly',
      'Pets welcomed',
      'No commercial use'
    ],
    owner: {
      name: 'Preeti Singhania',
      role: 'Property Owner',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98110 99882',
      whatsapp: '+919811099882',
      responseTime: 'Under 30 mins',
      memberSince: 'Feb 2023',
      verifiedId: true
    }
  },
  {
    id: 'room-7',
    title: 'Budget-Friendly Single Room for Students',
    type: 'Single Room',
    category: 'single',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 7500,
    deposit: 10000,
    maintenance: 500,
    electricityRule: 'Fixed ₹600/month',
    rating: 4.5,
    reviewCount: 22,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 160,
    floor: 'Ground floor',
    location: {
      address: '2nd Stage, BTM Layout',
      city: 'Bangalore',
      locality: 'BTM Layout',
      lat: 12.9140,
      lng: 77.6110,
      landmarks: [
        { name: 'Udupi Garden Signal', distance: '300m', time: '4 min walk' },
        { name: 'BTM Lake Park', distance: '500m', time: '6 min walk' },
        { name: 'Vega City Mall', distance: '1.4 km', time: '6 min ride' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Single Bed & Mattress',
      'Study Table & Chair',
      'Attached Bathroom with Geyser',
      'Wi-Fi Included',
      'Drinking RO Water',
      'Bike Parking'
    ],
    description: 'Clean and quiet budget private room close to coaching institutes and colleges in BTM Layout. Walkable to bus terminus, supermarkets, and food joints.',
    houseRules: [
      'Student friendly',
      'No smoking inside premises'
    ],
    owner: {
      name: 'Ramesh Gowda',
      role: 'Building Owner',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98441 77210',
      whatsapp: '+919844177210',
      responseTime: 'Under 1 hour',
      memberSince: 'Jul 2022',
      verifiedId: true
    }
  },
  {
    id: 'room-8',
    title: 'Chic Furnished Studio with Rooftop Terrace Access',
    type: 'Studio Apartment',
    category: 'studio',
    gender: 'Any',
    furnishing: 'Furnished',
    rent: 16000,
    deposit: 25000,
    maintenance: 1000,
    electricityRule: 'Sub-meter reading',
    rating: 4.85,
    reviewCount: 33,
    isVerified: true,
    isNoBrokerage: true,
    isInstantMoveIn: true,
    availableFrom: 'Immediate',
    areaSqFt: 360,
    floor: '4th floor (Rooftop View)',
    location: {
      address: '6th Main, Defense Colony, Indiranagar',
      city: 'Bangalore',
      locality: 'Indiranagar',
      lat: 12.9770,
      lng: 77.6380,
      landmarks: [
        { name: 'Toit Brewpub / 100ft Rd', distance: '450m', time: '5 min walk' },
        { name: 'Swami Vivekananda Metro', distance: '850m', time: '10 min walk' },
        { name: 'Manipal Hospital', distance: '2.1 km', time: '8 min drive' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Queen Size Storage Bed',
      'Air Conditioner',
      'Attached Modern Washroom',
      'Private Terrace Seating',
      'Modular Kitchenette with Induction',
      'High-Speed Wi-Fi',
      'Smart Door Lock'
    ],
    description: 'Designer studio space in the peaceful Defense Colony of Indiranagar. Features rooftop wooden deck access, serene natural lighting, and proximity to the city’s best cafes and breweries.',
    houseRules: [
      'Respectful of neighbors',
      'No illegal substances'
    ],
    owner: {
      name: 'Tanya Kapoor',
      role: 'Owner & Architect',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      phone: '+91 99160 44551',
      whatsapp: '+919916044551',
      responseTime: 'Under 15 mins',
      memberSince: 'Oct 2023',
      verifiedId: true
    }
  }
];
