import React, { useState } from 'react';
import { ShopProfile, BusinessCategory, ViewTab } from '../types';
import { ASSETS } from '../data/mockData';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Shirt, 
  Wrench, 
  Utensils, 
  Smartphone, 
  Pill, 
  Store,
  Info,
  Zap,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ProfileIntakeViewProps {
  profile: ShopProfile;
  onUpdateProfile: (updated: ShopProfile) => void;
  onNavigate: (tab: ViewTab) => void;
}

export const ProfileIntakeView: React.FC<ProfileIntakeViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate
}) => {
  const [formData, setFormData] = useState<ShopProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const categories: { id: BusinessCategory; label: string; hindi: string; icon: any }[] = [
    { id: 'kirana', label: 'Grocery / Kirana', hindi: 'किराना एवं जनरल स्टोर', icon: ShoppingBag },
    { id: 'textile', label: 'Apparel & Textiles', hindi: 'कपड़ा व परिधान', icon: Shirt },
    { id: 'hardware', label: 'Hardware & Electrical', hindi: 'हार्डवेयर व बिजली', icon: Wrench },
    { id: 'eatery', label: 'Restaurant & Eatery', hindi: 'होटल व खानपान', icon: Utensils },
    { id: 'electronics', label: 'Mobile & Electronics', hindi: 'मोबाइल व इलेक्ट्रॉनिक्स', icon: Smartphone },
    { id: 'pharmacy', label: 'Pharmacy / Chemist', hindi: 'दवा दुकान', icon: Pill },
    { id: 'other', label: 'Other Retail', hindi: 'अन्य खुदरा दुकान', icon: Store }
  ];

  const turnoverRanges = [
    { value: 'Below ₹10,00,000', label: 'Below ₹10 Lakhs', desc: 'Micro Retailer • Zero tax paperwork required' },
    { value: '₹10,00,000 - ₹20,00,000', label: '₹10 Lakhs - ₹20 Lakhs', desc: 'Eligible for Mudra Kishore loan up to ₹5 Lakhs' },
    { value: '₹20,00,000 - ₹40,00,000', label: '₹20 Lakhs - ₹40 Lakhs', desc: 'Maximized power subsidy & bank line of credit' },
    { value: 'Above ₹40,00,000', label: 'Above ₹40 Lakhs', desc: 'Standard GST threshold applies' }
  ];

  const handleCategorySelect = (catId: BusinessCategory) => {
    const selected = categories.find(c => c.id === catId);
    setFormData(prev => ({
      ...prev,
      category: catId,
      categoryLabel: selected ? `${selected.label} (${selected.hindi})` : 'Retail'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      onNavigate('roadmap');
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Stage 01 • Business Profile Intake</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Tell us about your shop / अपनी दुकान की जानकारी
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            We use these details to prepare your official Udyam, Trade License, and Mudra Bank applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
            Status: <span className="font-bold text-emerald-700">Verified MSME Intake</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Category Selection */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900">1. Select Shop Trade Category</h3>
                <p className="text-xs text-stone-500">Different categories unlock specific state subsidies and compliance waivers</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                Required
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 leading-snug">{cat.label}</div>
                      <div className="text-[10px] text-stone-500">{cat.hindi}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Shop & Owner Names */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">2. Shop & Proprietor Identification</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Shop Name (दुकान का नाम) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sharma Kirana Store"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-white"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Exact name as shown on shop sign board</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Proprietor Full Name (दुकानदार का नाम) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-white"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Must match Aadhaar Card exactly</span>
              </div>
            </div>
          </div>

          {/* 3. Location & Address */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900">3. Shop Physical Location</h3>
              <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>Patna Municipal Corporation</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Street Address & Shop Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Shop 14, Main Market Road, Kankarbagh"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">Ward / Circle</label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                    placeholder="Ward 34"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Patna"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Bihar"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">PIN Code</label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    placeholder="800020"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Turnover Range */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">4. Estimated Annual Turnover (सालाना कारोबार)</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {turnoverRanges.map((range) => {
                const isSelected = formData.annualTurnoverRange === range.value;
                return (
                  <div
                    key={range.value}
                    onClick={() => setFormData({ ...formData, annualTurnoverRange: range.value })}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">{range.label}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{range.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Existing Paperwork Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">5. Existing Documents Already with You</h3>
            <p className="text-xs text-stone-500">Check what you have ready. Don't worry if you are missing some, we help you procure them.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasAadhaar}
                  onChange={(e) => setFormData({ ...formData, hasAadhaar: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">Aadhaar Card (Linked to Mobile OTP)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasPan}
                  onChange={(e) => setFormData({ ...formData, hasPan: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">PAN Card of Proprietor</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasElectricityBill}
                  onChange={(e) => setFormData({ ...formData, hasElectricityBill: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">Electricity Bill (Commercial Meter)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasRentalAgreement}
                  onChange={(e) => setFormData({ ...formData, hasRentalAgreement: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">Rental Agreement / Property Holding Tax</span>
              </label>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{savedSuccess ? 'Saved! Redirecting...' : 'Save & Generate Custom Roadmap'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-stone-500">Takes less than 30 seconds</span>
          </div>

        </div>

        {/* Right Saathi AI Companion Advice */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Saathi AI Companion Advice</h4>
                <p className="text-[10px] text-emerald-200">Personalized for {formData.categoryLabel}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Commercial Power Rebate</span>
                </div>
                <p className="text-stone-200 text-[11px]">
                  Kirana shops in Patna qualify for a ₹1.5/unit electricity rebate upon submitting Trade License Form 4B.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>GST Exemption Guaranteed</span>
                </div>
                <p className="text-stone-200 text-[11px]">
                  Turnover {formData.annualTurnoverRange} is fully exempt from GST under Section 22. No chartered accountant fees required.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>SBI Mudra Pre-Qualification</span>
                </div>
                <p className="text-stone-200 text-[11px]">
                  Zero-balance Current Account at SBI Kankarbagh pre-qualifies {formData.name} for ₹1.5 Lakh collateral-free loan at 8.5%.
                </p>
              </div>
            </div>

            {/* In-person help CTA */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-stone-300">Need CSC visit?</span>
              <button
                type="button"
                onClick={() => onNavigate('roadmap')}
                className="text-emerald-300 font-bold hover:underline cursor-pointer"
              >
                Center #182 (600m away) →
              </button>
            </div>
          </div>

          {/* Quick shop card preview */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Live Intake Snapshot</h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0">
                <img src={ASSETS.profile} alt="Shopkeeper" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-stone-900 truncate">{formData.name}</p>
                <p className="text-[11px] text-stone-500 truncate">{formData.ownerName} • {formData.ward}</p>
                <p className="text-[10px] text-emerald-700 font-semibold">{formData.annualTurnoverRange}</p>
              </div>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
};
