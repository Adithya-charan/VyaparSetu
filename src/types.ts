export type LanguageCode = 
  | 'hi' 
  | 'en' 
  | 'mr' 
  | 'ta' 
  | 'te' 
  | 'bn' 
  | 'gu' 
  | 'kn' 
  | 'pa' 
  | 'ml';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  tagline: string;
  sampleAudioText: string;
}

export type ViewTab = 
  | 'home' 
  | 'intake' 
  | 'roadmap' 
  | 'vault' 
  | 'cost-benefit' 
  | 'ai-mentor' 
  | 'video-call'
  | 'land-map'
  | 'owner-dashboard';

export type BusinessCategory = 
  | 'kirana' 
  | 'textile' 
  | 'hardware' 
  | 'eatery' 
  | 'electronics' 
  | 'pharmacy' 
  | 'other';

export interface ShopProfile {
  name: string;
  ownerName: string;
  category: BusinessCategory;
  categoryLabel: string;
  address: string;
  ward: string;
  city: string;
  state: string;
  pinCode: string;
  annualTurnoverRange: string;
  hasAadhaar: boolean;
  hasPan: boolean;
  hasElectricityBill: boolean;
  hasRentalAgreement: boolean;
  hasFssai: boolean;
  status: 'draft' | 'in_progress' | 'formalized';
}

export type StepStatus = 'completed' | 'in_progress' | 'upcoming' | 'locked';

export interface RoadmapStep {
  id: number;
  title: string;
  titleHi: string;
  department: string;
  status: StepStatus;
  estimatedTime: string;
  cost: string;
  description: string;
  requirements: string[];
  certificateName?: string;
  certificateNumber?: string;
  actionLabel?: string;
}

export type DocumentVerificationStatus = 'verified' | 'action_needed' | 'in_review' | 'pending';

export interface VaultDocument {
  id: string;
  name: string;
  nameHi: string;
  type: string;
  status: DocumentVerificationStatus;
  uploadedDate?: string;
  fileSize?: string;
  notes: string;
  verifiedBy?: string;
  previewUrl?: string;
  requiredFor: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor' | 'system';
  text: string;
  hindiText?: string;
  timestamp: string;
  hasAudio?: boolean;
  adviceCards?: {
    title: string;
    description: string;
    badge?: string;
  }[];
}

export type BusinessSuitabilityFactor = {
  factor: string;
  score: number;
  reason: string;
  reasonHi?: string;
  reasonTe?: string;
};

export interface LandParcel {
  id: string;
  parcelId: string;
  latitude: number;
  longitude: number;
  area: number;
  landUse: 'commercial' | 'industrial' | 'mixed' | 'agricultural';
  district: string;
  city: string;
  locality: string;
  price?: number;
  rent?: number;
  listingType: 'sale' | 'lease';
  availabilityStatus: 'available' | 'unavailable' | 'pending';
  roadDistance: number;
  marketDistance: number;
  businessSuitabilityScore: number;
  suitabilityFactors?: BusinessSuitabilityFactor[];
  verifiedStatus: 'verified' | 'unverified';
  source: string;
  lastVerifiedAt: string;
  ownerName: string;
  ownerContact?: string;
}

export interface ContactRequest {
  id: string;
  landId: string;
  requesterId: string;
  requesterName: string;
  requesterBusiness: string;
  status: 'pending' | 'accepted' | 'declined';
  requestedAt: string;
}
