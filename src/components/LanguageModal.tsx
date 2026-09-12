import React from 'react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../data/mockData';
import { Globe, Volume2, Check, PhoneCall, X } from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (code: LanguageCode) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage
}) => {
  const [activeVoice, setActiveVoice] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handlePlayAudio = (langCode: LanguageCode, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      // Try setting language code
      utterance.lang = langCode === 'hi' ? 'hi-IN' : langCode === 'en' ? 'en-IN' : `${langCode}-IN`;
      utterance.rate = 0.9;
      setActiveVoice(langCode);
      utterance.onend = () => setActiveVoice(null);
      utterance.onerror = () => setActiveVoice(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentLangObj = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                अपनी भाषा चुनें / Choose Your Language
              </h2>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                All voice guidance, forms, and WhatsApp updates will adapt to your language
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            const isPlaying = activeVoice === lang.code;

            return (
              <div
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`relative p-3.5 rounded-xl border transition-all cursor-pointer text-left flex items-start justify-between gap-2 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-stone-900 leading-tight">
                      {lang.nativeName}
                    </span>
                    <span className="text-xs font-medium text-stone-500">
                      ({lang.name})
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-1 font-normal">
                    {lang.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio(lang.code, lang.sampleAudioText, e)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isPlaying 
                        ? 'bg-emerald-600 text-white animate-pulse' 
                        : 'text-stone-400 hover:text-emerald-700 hover:bg-stone-100'
                    }`}
                    title="सुनें (Listen sample audio)"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-emerald-600 text-white' : 'border border-stone-300 text-transparent'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info & Confirmation */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <PhoneCall className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Need phone voice help? Dial <strong>1800-889-2555</strong></span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            {currentLangObj.code === 'hi' ? 'पुष्टि करें और आगे बढ़ें' : `Confirm in ${currentLangObj.name}`}
          </button>
        </div>
      </div>
    </div>
  );
};
