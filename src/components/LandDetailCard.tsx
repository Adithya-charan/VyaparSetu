import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LandParcel, ViewTab } from '../types';
import { 
  X, 
  MapPin, 
  IndianRupee, 
  Ruler, 
  Navigation, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  AlertTriangle,
  Building
} from 'lucide-react';

interface LandDetailCardProps {
  parcel: LandParcel;
  onClose: () => void;
  onNavigate: (tab: ViewTab) => void;
}

export const LandDetailCard: React.FC<LandDetailCardProps> = ({ parcel, onClose, onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [requestSent, setRequestSent] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleRequestContact = () => {
    setRequestSent(true);
    // In a real app, you would make an API call here.
  };

  return (
    <div className="flex flex-col h-full bg-white relative animate-in slide-in-from-right-4 duration-300">
      
      {/* Header Image Area */}
      <div className="h-48 bg-stone-200 relative shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={`https://source.unsplash.com/800x600/?empty,plot,${parcel.landUse}`}
          alt="Property" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500">
              {parcel.listingType === 'sale' ? t('landMap.sale') : t('landMap.lease')}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
              parcel.verifiedStatus === 'verified' ? 'bg-blue-500' : 'bg-stone-500'
            }`}>
              {parcel.verifiedStatus === 'verified' && <ShieldCheck className="w-3 h-3" />}
              {parcel.verifiedStatus === 'verified' ? t('landMap.verified') : t('landMap.unverified')}
            </span>
          </div>
          <h2 className="text-xl font-bold leading-tight">Property #{parcel.parcelId}</h2>
          <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {parcel.locality}, {parcel.city}
          </p>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 overflow-y-auto flex-1 space-y-6">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Ruler className="w-3 h-3" />
              {t('landMap.area')}
            </div>
            <div className="font-bold text-stone-900">{parcel.area.toLocaleString()} sq.ft</div>
          </div>
          
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <IndianRupee className="w-3 h-3" />
              {t('landMap.estimatedPrice')}
            </div>
            <div className="font-bold text-emerald-700">
              {parcel.listingType === 'sale' ? formatCurrency(parcel.price || 0) : `${formatCurrency(parcel.rent || 0)}/mo`}
            </div>
          </div>

          <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              {t('landMap.roadDistance')}
            </div>
            <div className="font-bold text-stone-900">{parcel.roadDistance}m</div>
          </div>
          
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Building className="w-3 h-3" />
              {t('landMap.marketDistance')}
            </div>
            <div className="font-bold text-stone-900">{parcel.marketDistance}m</div>
          </div>
        </div>

        {/* AI Suitability Score Section */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/30 overflow-hidden">
          <div className="p-4 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-700 text-sm">{parcel.businessSuitabilityScore}%</span>
              </div>
              {t('landMap.suitabilityScore')}
            </div>
            <div className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              AI Match
            </div>
          </div>
          
          <div className="p-4 space-y-3 bg-white/50">
            {parcel.suitabilityFactors?.map((factor, idx) => {
              // Select appropriate localized reason
              let reasonText = factor.reason;
              if (i18n.language === 'hi' && factor.reasonHi) reasonText = factor.reasonHi;
              if (i18n.language === 'te' && factor.reasonTe) reasonText = factor.reasonTe;

              return (
                <div key={idx} className="flex gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800 mr-1">{factor.factor}:</span>
                    <span className="text-stone-600">{reasonText}</span>
                  </div>
                </div>
              );
            })}
            
            <div className="mt-3 flex items-start gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100 text-[10px] text-amber-800 leading-relaxed">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <p>{t('landMap.disclaimer')}</p>
            </div>
          </div>
        </div>

        {/* Verification Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-stone-900 text-sm">Property Details</h3>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">{t('landMap.source')}:</span>
              <span className="font-medium text-stone-900">{parcel.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">{t('landMap.lastVerified')}:</span>
              <span className="font-medium text-stone-900">{new Date(parcel.lastVerifiedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">{t('landMap.owner')}:</span>
              <span className="font-medium text-stone-900">
                {parcel.verifiedStatus === 'verified' ? parcel.ownerName : 'Information Unavailable'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Action */}
      <div className="p-4 bg-white border-t border-stone-200 shrink-0">
        {!requestSent ? (
          <button 
            onClick={handleRequestContact}
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {t('common.requestContact')}
          </button>
        ) : (
          <div className="w-full py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Request Sent
          </div>
        )}
      </div>

    </div>
  );
};
