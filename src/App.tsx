import React, { useState } from 'react';
import { ViewTab, LanguageCode, ShopProfile } from './types';
import { INITIAL_SHOP_PROFILE, ASSETS } from './data/mockData';
import { Header } from './components/Header';
import { LanguageModal } from './components/LanguageModal';
import { CertificateModal } from './components/CertificateModal';
import { HomeView } from './components/HomeView';
import { ProfileIntakeView } from './components/ProfileIntakeView';
import { RoadmapView } from './components/RoadmapView';
import { VaultView } from './components/VaultView';
import { CostBenefitView } from './components/CostBenefitView';
import { AIMentorView } from './components/AIMentorView';
import { VideoCallView } from './components/VideoCallView';
import { LandMapView } from './components/LandMapView';
import { OwnerDashboardView } from './components/OwnerDashboardView';
import { 
  ShieldCheck, 
  PhoneCall, 
  Building2, 
  CheckCircle2, 
  Heart, 
  Lock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function App() {
  const { t, i18n } = useTranslation();
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('hi');
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [shopProfile, setShopProfile] = useState<ShopProfile>(INITIAL_SHOP_PROFILE);

  // Sync initial state if needed
  React.useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fa] text-[#191c1e] selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLanguage={currentLanguage}
        onOpenLanguageModal={() => setLanguageModalOpen(true)}
        shopProfile={shopProfile}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            shopProfile={shopProfile}
            currentLanguage={currentLanguage}
          />
        )}

        {currentTab === 'intake' && (
          <ProfileIntakeView
            profile={shopProfile}
            onUpdateProfile={(updated) => setShopProfile(updated)}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapView
            profile={shopProfile}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCertificateModal={() => setCertificateModalOpen(true)}
          />
        )}

        {currentTab === 'vault' && (
          <VaultView />
        )}

        {currentTab === 'cost-benefit' && (
          <CostBenefitView
            profile={shopProfile}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'ai-mentor' && (
          <AIMentorView
            profile={shopProfile}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'video-call' && (
          <VideoCallView
            profile={shopProfile}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'land-map' && (
          <LandMapView
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'owner-dashboard' && (
          <OwnerDashboardView />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-8 px-4 sm:px-6 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-emerald-700 flex items-center justify-center">
              <img src={ASSETS.logo} alt="FormalSaathi Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">
                FormalSaathi (फॉर्मलसाथी)
              </div>
              <p className="text-[11px] text-stone-500">
                A public service platform empowering small retail shops across India
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Free & Open
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              AES-256 DigiLocker Vault
            </span>
            <span className="text-stone-300">•</span>
            <a href="tel:18008892555" className="hover:text-emerald-700 font-bold text-emerald-800">
              Toll Free: 1800-889-2555
            </a>
          </div>

          <div className="text-[11px] text-stone-400 text-center md:text-right">
            Aligned with Ministry of MSME & State Urban Municipalities.<br />
            No broker commissions, no middleman fees.
          </div>

        </div>
      </footer>

      {/* Language Modal */}
      <LanguageModal
        isOpen={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
        selectedLanguage={currentLanguage}
        onSelectLanguage={(code) => {
          setCurrentLanguage(code);
          i18n.changeLanguage(code);
        }}
      />

      {/* Provisional Certificate Modal */}
      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        profile={shopProfile}
      />

    </div>
  );
}

export default App;
