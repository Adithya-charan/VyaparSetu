import { LandParcel, ContactRequest } from '../types';

export const DEMO_LAND_PARCELS: LandParcel[] = [
  {
    id: 'l1',
    parcelId: 'AP1024',
    latitude: 17.385044,
    longitude: 78.486671,
    area: 2400,
    landUse: 'commercial',
    district: 'Hyderabad',
    city: 'Hyderabad',
    locality: 'Koti',
    rent: 45000,
    listingType: 'lease',
    availabilityStatus: 'available',
    roadDistance: 50,
    marketDistance: 200,
    businessSuitabilityScore: 92,
    suitabilityFactors: [
      {
        factor: 'Location',
        score: 95,
        reason: 'Excellent main road access suitable for retail.',
        reasonHi: 'खुदरा बिक्री के लिए उपयुक्त उत्कृष्ट मुख्य सड़क पहुंच।',
        reasonTe: 'రిటైల్ కోసం అద్భుతమైన ప్రధాన రహదారి ప్రాప్యత.'
      },
      {
        factor: 'Budget',
        score: 90,
        reason: 'Rent is within average market rate.',
        reasonHi: 'किराया औसत बाजार दर के भीतर है।',
        reasonTe: 'అద్దె సగటు మార్కెట్ రేటులో ఉంది.'
      }
    ],
    verifiedStatus: 'verified',
    source: 'Municipal Corporation (Demo)',
    lastVerifiedAt: '2026-08-15',
    ownerName: 'Demo Property Owner A',
  },
  {
    id: 'l2',
    parcelId: 'TS2048',
    latitude: 17.440081,
    longitude: 78.348915,
    area: 1500,
    landUse: 'mixed',
    district: 'Rangareddy',
    city: 'Hyderabad',
    locality: 'Gachibowli',
    price: 15000000,
    listingType: 'sale',
    availabilityStatus: 'available',
    roadDistance: 300,
    marketDistance: 800,
    businessSuitabilityScore: 75,
    suitabilityFactors: [
      {
        factor: 'Area',
        score: 80,
        reason: 'Good size for a small bakery or pharmacy.',
        reasonHi: 'छोटी बेकरी या फार्मेसी के लिए अच्छा आकार।',
        reasonTe: 'చిన్న బేకరీ లేదా ఫార్మసీకి మంచి పరిమాణం.'
      }
    ],
    verifiedStatus: 'unverified',
    source: 'Owner Listing (Demo)',
    lastVerifiedAt: '2026-09-01',
    ownerName: 'Demo Property Owner B',
  },
  {
    id: 'l3',
    parcelId: 'UP3059',
    latitude: 17.3999,
    longitude: 78.4760,
    area: 800,
    landUse: 'commercial',
    district: 'Hyderabad',
    city: 'Hyderabad',
    locality: 'Abids',
    rent: 20000,
    listingType: 'lease',
    availabilityStatus: 'available',
    roadDistance: 10,
    marketDistance: 50,
    businessSuitabilityScore: 98,
    suitabilityFactors: [
      {
        factor: 'Footfall',
        score: 100,
        reason: 'High footfall area, perfect for a kirana store.',
        reasonHi: 'अधिक लोगों की आवाजाही वाला क्षेत्र, किराना स्टोर के लिए एकदम सही।',
        reasonTe: 'కిరాణా దుకాణానికి సరైన రద్దీ ఉన్న ప్రాంతం.'
      }
    ],
    verifiedStatus: 'verified',
    source: 'Verified Agent (Demo)',
    lastVerifiedAt: '2026-09-10',
    ownerName: 'Demo Property Owner C',
  },
  {
    id: 'l4',
    parcelId: 'BR4091',
    latitude: 17.4326,
    longitude: 78.4071,
    area: 5000,
    landUse: 'industrial',
    district: 'Hyderabad',
    city: 'Hyderabad',
    locality: 'Jubilee Hills',
    rent: 120000,
    listingType: 'lease',
    availabilityStatus: 'available',
    roadDistance: 500,
    marketDistance: 2000,
    businessSuitabilityScore: 60,
    suitabilityFactors: [
      {
        factor: 'Zoning',
        score: 60,
        reason: 'Industrial zone, not suitable for retail shops.',
        reasonHi: 'औद्योगिक क्षेत्र, खुदरा दुकानों के लिए उपयुक्त नहीं है।',
        reasonTe: 'పారిశ్రామిక ప్రాంతం, రిటైల్ దుకాణాలకు తగినది కాదు.'
      }
    ],
    verifiedStatus: 'verified',
    source: 'State Industrial Corp (Demo)',
    lastVerifiedAt: '2026-08-20',
    ownerName: 'Demo Property Owner D',
  }
];

export const INITIAL_CONTACT_REQUESTS: ContactRequest[] = [
  {
    id: 'req1',
    landId: 'l1',
    requesterId: 'user1',
    requesterName: 'Rajesh Kumar',
    requesterBusiness: 'Sharma Kirana Store',
    status: 'pending',
    requestedAt: '2026-09-11T10:00:00Z'
  }
];
