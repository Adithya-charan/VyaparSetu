import React from 'react';
import { ViewTab, LanguageCode, ShopProfile } from '../types';
import { ASSETS, LANGUAGES } from '../data/mockData';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  Headphones, 
  Video, 
  Menu, 
  X,
  Compass,
  Map as MapIcon,
  LayoutDashboard
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  currentLanguage: LanguageCode;
  onOpenLanguageModal: () => void;
  shopProfile: ShopProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentLanguage,
  onOpenLanguageModal,
  shopProfile
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const langObj = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  const navItems = [
    { id: 'home' as ViewTab, label: t('nav.home'), icon: Compass },
    { id: 'intake' as ViewTab, label: t('nav.intake'), icon: Building2 },
    { id: 'roadmap' as ViewTab, label: t('nav.roadmap'), icon: CheckCircle2, badge: '40%' },
    { id: 'vault' as ViewTab, label: t('nav.vault'), icon: FileText, badge: '4/6' },
    { id: 'cost-benefit' as ViewTab, label: t('nav.costBenefit'), icon: TrendingUp },
    { id: 'ai-mentor' as ViewTab, label: t('nav.aiMentor'), icon: Headphones, highlight: true },
    { id: 'video-call' as ViewTab, label: t('nav.videoCall'), icon: Video, badge: 'Active' },
    { id: 'land-map' as ViewTab, label: t('nav.landMap'), icon: MapIcon },
    { id: 'owner-dashboard' as ViewTab, label: t('nav.ownerDashboard'), icon: LayoutDashboard }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 shadow-xs">
      {/* Top micro-bar: Sovereign commitment & emergency helpline */}
      <div className="bg-[#1e3a2b] text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-[10px] text-white font-bold">✓</span>
            <span className="font-medium text-white">भारत सरकार MSME संरेखित</span>
            <span className="hidden sm:inline text-emerald-300/80">• Official MSME Formalization Guidance Initiative</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:18008892555" 
              className="flex items-center gap-1.5 hover:text-white transition-colors text-emerald-200"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Toll Free: <strong>1800-889-2555</strong> (8 AM - 8 PM)</span>
            </a>
            <span className="hidden md:inline text-emerald-400/40">|</span>
            <span className="hidden md:inline text-emerald-300">CSC Village Level Helpdesk Ready</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* Brand logo & tagline */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 p-0.5 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  src={ASSETS.logo} 
                  alt="FormalSaathi Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized SVG icon if image blocked
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900">
                    Formal<span className="text-emerald-700">Saathi</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    साथी
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                  Your Business Formalization Partner
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                  } ${item.highlight && !isActive ? 'text-emerald-700 bg-emerald-50/50' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Language picker & Profile badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle button */}
            <button
              onClick={onOpenLanguageModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-white text-stone-700 hover:text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold text-stone-900">{langObj.nativeName}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider hidden sm:inline">
                ({langObj.name})
              </span>
            </button>

            {/* Shop badge */}
            <div 
              onClick={() => onSelectTab('roadmap')}
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-stone-200 bg-stone-50/80 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center overflow-hidden">
                <img 
                  src={ASSETS.profile} 
                  alt={shopProfile.ownerName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-stone-800 leading-tight truncate max-w-[130px]">
                  {shopProfile.name}
                </div>
                <div className="text-[10px] text-stone-500 flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 text-emerald-600 inline" />
                  <span>{shopProfile.city} • {shopProfile.ward}</span>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-stone-200 space-y-1">
            <div className="px-3 py-2 bg-stone-50 rounded-lg mb-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-600">
                <img src={ASSETS.profile} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">{shopProfile.name}</p>
                <p className="text-[11px] text-stone-500">{shopProfile.ownerName} • {shopProfile.city}, {shopProfile.state}</p>
              </div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
