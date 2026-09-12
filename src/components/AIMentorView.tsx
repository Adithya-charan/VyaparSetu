import React, { useState } from 'react';
import { ShopProfile, ViewTab } from '../types';
import { ASSETS } from '../data/mockData';
import { StopCircle, Bot, Video } from 'lucide-react';

interface AIMentorViewProps {
  profile: ShopProfile;
  onNavigate: (tab: ViewTab) => void;
}

export const AIMentorView: React.FC<AIMentorViewProps> = ({ profile, onNavigate }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'te' | 'hi' | 'ta'>('hi');
  const [showIframe, setShowIframe] = useState(false);

  const handleStartConversation = () => {
    setShowIframe(true);
  };

  const handleEndConversation = () => {
    setShowIframe(false);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-1 text-stone-800">
          VYAPARA SETU
        </h2>
        <h3 className="text-xl font-bold mb-6 text-emerald-700">AI BUSINESS MENTOR</h3>

        {!showIframe && (
          <>
            <div className="w-40 h-40 mb-6 rounded-2xl overflow-hidden bg-stone-800 border-4 border-emerald-400/50 shadow-2xl">
              <img
                src={ASSETS.vipinPathakAvatar}
                alt="AI Mentor Avatar"
                className="w-full h-full object-cover filter grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-base text-stone-600 mb-6 italic max-w-md">
              "Hello! I am your Vyapara Setu Business Mentor. Ask me about GST registration, Udyam,
              FSSAI, shop licences, and more."
            </p>
          </>
        )}

        {showIframe && (
          <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-emerald-200 shadow-2xl bg-black">
            <iframe
              src="https://bey.chat/5c6056d5-f414-4c3f-862e-9b009c2ed5e1"
              title="Vyapara Setu AI Business Mentor"
              className="w-full h-[650px] md:h-[700px] border-0"
              allow="camera; microphone; fullscreen"
              allowFullScreen
            />
          </div>
        )}

        <div className="mb-6 flex flex-col items-center">
          <span className="text-sm font-bold text-stone-500 mb-2">Choose Language / भाषा चुनें:</span>
          <div className="flex gap-2 flex-wrap justify-center">
            {(['en', 'te', 'hi', 'ta'] as const).map((lang) => {
              const labels: Record<string, string> = { en: 'English', te: 'తెలుగు', hi: 'हिन्दी', ta: 'தமிழ்' };
              return (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedLanguage === lang
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                >
                  {labels[lang]}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-stone-400 mt-2">
            Note: Language inside the AI mentor is controlled by its own configuration.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {showIframe ? (
            <button
              onClick={handleEndConversation}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-sm shadow-xl transition-all cursor-pointer"
            >
              <StopCircle className="w-5 h-5" />
              End Conversation
            </button>
          ) : (
            <button
              onClick={handleStartConversation}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xl transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              Talk to AI Business Mentor
            </button>
          )}
          <button
            onClick={() => onNavigate('video-call')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-sm shadow-xl transition-all cursor-pointer border border-stone-300"
          >
            <Video className="w-4 h-4" />
            Connect with Property Agent
          </button>
        </div>
      </div>
    </div>
  );
};
