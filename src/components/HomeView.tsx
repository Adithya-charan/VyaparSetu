import React, { useState } from 'react';
import { ViewTab, ShopProfile, LanguageCode } from '../types';
import { ASSETS, SUCCESS_STORIES } from '../data/mockData';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  FileCheck, 
  Banknote, 
  Zap, 
  Headphones, 
  MapPin, 
  CheckCircle, 
  Calculator, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Building2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HomeViewProps {
  onNavigate: (tab: ViewTab) => void;
  shopProfile: ShopProfile;
  currentLanguage: LanguageCode;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  shopProfile,
  currentLanguage
}) => {
  const { t } = useTranslation();
  // GST self-check tool state
  const [turnoverLakhs, setTurnoverLakhs] = useState<number>(18);
  const [sellingType, setSellingType] = useState<'goods' | 'services'>('goods');
  const [isInterstate, setIsInterstate] = useState<boolean>(false);

  const isGstExempt = turnoverLakhs <= (sellingType === 'goods' ? 40 : 20) && !isInterstate;

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-emerald-950 to-teal-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sovereign Retail Formalization Initiative</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Formalize your shop, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                step by step, in your language.
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Unlock 8.5% Mudra bank loans, commercial power bill subsidies, and complete legal protection for your dukaan. 100% free, zero middlemen.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('roadmap')}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer group"
              >
                <span>Continue Sharma Kirana Progress</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('intake')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all cursor-pointer"
              >
                Start New Shop Profile
              </button>

              <button
                onClick={() => onNavigate('cost-benefit')}
                className="px-4 py-3.5 rounded-xl hover:bg-white/10 text-emerald-300 font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" />
                <span>See ₹42,000/yr Benefit</span>
              </button>
            </div>

            {/* Quick stats badges */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-300">₹0</div>
                <div className="text-xs text-stone-400">Zero Middlemen Fee</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-300">8.5%</div>
                <div className="text-xs text-stone-400">Mudra Loan Rate</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-300">12+</div>
                <div className="text-xs text-stone-400">Indian Languages</div>
              </div>
            </div>
          </div>

          {/* Saathi Terminal Simulation preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-stone-900/90 border border-emerald-500/30 p-5 shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-stone-400 ml-1">saathi-terminal: patna-urban-34</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
              </div>

              {/* Shop snapshot */}
              <div className="p-3.5 rounded-xl bg-stone-800/60 border border-stone-700/60 flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-stone-700">
                  <img src={ASSETS.profile} alt="Shopkeeper" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{shopProfile.name}</h4>
                  <p className="text-[11px] text-stone-400 truncate">{shopProfile.categoryLabel} • {shopProfile.ward}</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-1 rounded-md">
                  40% Ready
                </span>
              </div>

              {/* Progress items */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Udyam Aadhaar (MSME ID)</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300">VERIFIED</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>SBI Dedicated Current A/c</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300">ACTIVE</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-200">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <span>Patna Municipal Trade License</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-300">ACTION NEEDED</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('roadmap')}
                className="w-full py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Inspect Compliance Roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Smart Land Map CTA */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
          <Building2 className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-lg space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-emerald-50 text-[11px] font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('landMap.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
            {t('landMap.subtitle')}
          </h2>
          <p className="text-emerald-100/90 text-sm">
            Discover verified commercial properties, calculate business suitability scores based on location, and request contact with owners safely.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => onNavigate('land-map')}
              className="bg-white text-emerald-900 hover:bg-emerald-50 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Land Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900">Government Aligned</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Strictly follows MSME Development Act, state municipal bye-laws, and RBI Priority Sector Lending guidelines.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900">12 Indian Languages</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Voice explanations, text transcription, and official paperwork simplified in your native mother tongue.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Banknote className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900">100% Free & Private</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Zero commission, zero agent fees. All papers remain encrypted in your Sovereign Digital Locker vault.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900">Human Escalation</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Connected to 5,00,000+ Common Service Centers (CSC) for in-person desk help if you get stuck.
          </p>
        </div>
      </section>

      {/* 3-Step Simple Path */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Simple 3-Step Journey</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
              How FormalSaathi Works for Your Shop
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            No complex legal knowledge needed. We guide every form in plain language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center">
                1
              </span>
              <span className="text-[11px] font-medium text-stone-500">2 Minutes</span>
            </div>
            <h3 className="text-base font-bold text-stone-900">Quick Profile Intake</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tell us your shop name, trade category, and location. We figure out which laws apply to you and which ones you are exempt from.
            </p>
            <button 
              onClick={() => onNavigate('intake')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Fill Shop Intake</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center">
                2
              </span>
              <span className="text-[11px] font-medium text-stone-500">3-5 Days</span>
            </div>
            <h3 className="text-base font-bold text-stone-900">Guided Paperwork</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Upload photos on WhatsApp or web vault. We auto-generate your Udyam Certificate, SBI Zero Balance CA form, and Municipal Trade Permit.
            </p>
            <button 
              onClick={() => onNavigate('vault')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View Document Vault</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center">
                3
              </span>
              <span className="text-[11px] font-medium text-stone-500">Instant Access</span>
            </div>
            <h3 className="text-base font-bold text-stone-900">Subsidies & 8.5% Loans</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Claim ₹1.5/unit power rebate and apply for collateral-free Mudra credit up to ₹10 Lakhs. Say goodbye to 36% moneylenders forever.
            </p>
            <button 
              onClick={() => onNavigate('cost-benefit')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Calculate Savings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive GST Self-Check Tool */}
      <section className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Compliance Check</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Do I Need GST for My Shop? (जीएसटी स्व-जांच टूल)
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Most neighborhood retail shops do NOT need GST! Test your shop turnover below to see your legal exemption status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          <div className="lg:col-span-7 bg-white/10 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-5">
            
            {/* Turnover slider */}
            <div>
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-semibold text-stone-200">Estimated Annual Turnover / साल की कुल बिक्री:</span>
                <span className="text-base font-extrabold text-emerald-300">₹{turnoverLakhs} Lakhs</span>
              </div>
              <input
                type="range"
                min="3"
                max="80"
                step="1"
                value={turnoverLakhs}
                onChange={(e) => setTurnoverLakhs(Number(e.target.value))}
                className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>₹3 Lakhs</span>
                <span className="text-emerald-300 font-bold">₹40 Lakh Exemption Threshold</span>
                <span>₹80 Lakhs</span>
              </div>
            </div>

            {/* Business type buttons */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-300 mb-1 font-medium">Business Activity:</label>
                <div className="flex rounded-lg overflow-hidden border border-white/20">
                  <button
                    type="button"
                    onClick={() => setSellingType('goods')}
                    className={`flex-1 py-2 font-semibold cursor-pointer ${
                      sellingType === 'goods' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-stone-300'
                    }`}
                  >
                    Goods (किराना/कपड़ा)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSellingType('services')}
                    className={`flex-1 py-2 font-semibold cursor-pointer ${
                      sellingType === 'services' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-stone-300'
                    }`}
                  >
                    Services (सेवाएं)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-medium">Sales Location:</label>
                <div className="flex rounded-lg overflow-hidden border border-white/20">
                  <button
                    type="button"
                    onClick={() => setIsInterstate(false)}
                    className={`flex-1 py-2 font-semibold cursor-pointer ${
                      !isInterstate ? 'bg-emerald-600 text-white' : 'bg-white/5 text-stone-300'
                    }`}
                  >
                    In-State Only (बिहार)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsInterstate(true)}
                    className={`flex-1 py-2 font-semibold cursor-pointer ${
                      isInterstate ? 'bg-emerald-600 text-white' : 'bg-white/5 text-stone-300'
                    }`}
                  >
                    Other States
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Verdict Card */}
          <div className="lg:col-span-5">
            <div className={`rounded-2xl p-6 border transition-all ${
              isGstExempt 
                ? 'bg-emerald-950/90 border-emerald-400/50 text-white shadow-xl' 
                : 'bg-amber-950/90 border-amber-400/50 text-white shadow-xl'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  isGstExempt ? 'bg-emerald-500 text-stone-950' : 'bg-amber-500 text-stone-950'
                }`}>
                  {isGstExempt ? '✓' : '!'}
                </span>
                <div>
                  <h4 className="text-base font-bold">
                    {isGstExempt ? '100% GST EXEMPT (छूट प्राप्त)' : 'GST REGISTRATION REQUIRED'}
                  </h4>
                  <p className="text-[11px] text-stone-300">
                    As per Section 22 of the CGST Act
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-stone-200 mb-4">
                {isGstExempt 
                  ? `Your turnover of ₹${turnoverLakhs} Lakhs is well below the statutory ₹40 Lakh limit for goods. You do not need to file monthly returns or hire an accountant!`
                  : `Because your turnover exceeds the exemption limit or involves interstate commerce, you should register for GST (or opt for the 1% flat Composition Scheme).`
                }
              </p>

              <div className="p-3 rounded-xl bg-black/30 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Statutory Filing:</span>
                  <span className="font-bold text-emerald-300">{isGstExempt ? 'None (₹0 Cost)' : 'Quarterly CMP-08'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Trade License Needed:</span>
                  <span className="font-bold text-white">Yes (Municipal Only)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Shopkeeper Testimonials */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Real Impact Stories</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Trusted by Over 45,000 Indian Retailers
          </h2>
          <p className="text-xs text-stone-600">
            Hear how small business owners formalized their dukaans and doubled their profit margins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-200 flex-shrink-0">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{story.name}</h4>
                    <p className="text-[11px] text-stone-500">{story.shop}</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 italic leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  {story.savings}
                </span>
                <span className="text-amber-600 font-bold">★ {story.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg">
          <Award className="w-6 h-6" />
        </div>
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to formalize your shop today?
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Join thousands of smart retailers. Safe, paperless, and backed by government MSME provisions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('roadmap')}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Check Sharma Kirana Roadmap
          </button>
          <button
            onClick={() => onNavigate('ai-mentor')}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>Speak with AI Advisor Vipin</span>
          </button>
        </div>
      </section>

    </div>
  );
};
