import React, { useState } from 'react';
import { ShopProfile, RoadmapStep, ViewTab } from '../types';
import { ROADMAP_STEPS, ASSETS } from '../data/mockData';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Download, 
  QrCode, 
  PhoneCall, 
  MapPin, 
  ExternalLink, 
  ChevronRight,
  Sparkles,
  Building2,
  Share2,
  Printer,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoadmapViewProps {
  profile: ShopProfile;
  onNavigate: (tab: ViewTab) => void;
  onOpenCertificateModal: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  profile,
  onNavigate,
  onOpenCertificateModal
}) => {
  const [steps, setSteps] = useState<RoadmapStep[]>(ROADMAP_STEPS);
  const [activeStepModal, setActiveStepModal] = useState<RoadmapStep | null>(null);
  const [tradeLicensePaid, setTradeLicensePaid] = useState(false);

  // Calculate completed percentage
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const percentage = Math.round((completedCount / steps.length) * 100);

  const handleSimulateTradeLicense = () => {
    setTradeLicensePaid(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    setSteps(prev => prev.map(s => {
      if (s.id === 3) {
        return {
          ...s,
          status: 'completed',
          certificateName: 'PMC Trade License #BR-PAT-2026-901',
          certificateNumber: 'PMC-TL-8849102'
        };
      }
      if (s.id === 4) {
        return {
          ...s,
          status: 'in_progress',
          actionLabel: 'Confirm Exemption Declaration'
        };
      }
      if (s.id === 5) {
        return {
          ...s,
          status: 'upcoming'
        };
      }
      return s;
    }));
    setActiveStepModal(null);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Shop Progress Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Patna Municipal Corporation • Ward 34
              </span>
              <span className="text-xs text-stone-500 font-medium">
                ID: BR-PAT-KIRANA-4091
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {profile.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Proprietor: <strong>{profile.ownerName}</strong> • {profile.categoryLabel} • {profile.address}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenCertificateModal}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Storefront QR Certificate</span>
              </button>

              <button
                onClick={() => onNavigate('vault')}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-stone-500" />
                <span>Document Vault (4 of 6 Verified)</span>
              </button>

              <button
                onClick={() => onNavigate('ai-mentor')}
                className="px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Ask Saathi AI Mentor</span>
              </button>
            </div>
          </div>

          {/* Progress Radial / Metrics */}
          <div className="lg:col-span-4 bg-stone-50 rounded-2xl p-5 border border-stone-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Formalization Score
              </div>
              <div className="text-3xl sm:text-4xl font-black text-stone-900">
                {tradeLicensePaid ? '60%' : `${percentage}%`}
              </div>
              <div className="text-xs font-semibold text-emerald-700">
                {tradeLicensePaid ? '3 of 5 Steps Complete' : '2 of 5 Steps Complete'}
              </div>
              <div className="text-[11px] text-stone-500">
                {tradeLicensePaid ? 'Trade license issued!' : 'Municipal license in progress'}
              </div>
            </div>

            {/* Circular progress representation */}
            <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#e2e8f0"
                  strokeWidth="7"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#059669"
                  strokeWidth="7"
                  fill="transparent"
                  strokeDasharray="201"
                  strokeDashoffset={201 - (201 * (tradeLicensePaid ? 60 : percentage)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-xs font-black text-stone-800">
                {tradeLicensePaid ? '60%' : `${percentage}%`}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Roadmap & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 5 Steps Stepper */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              Sequential Compliance Milestones
            </h2>
            <span className="text-xs text-stone-500">Official Government Path</span>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = step.status === 'completed';
              const isInProgress = step.status === 'in_progress';
              const isLocked = step.status === 'locked';
              const isUpcoming = step.status === 'upcoming';

              return (
                <div
                  key={step.id}
                  className={`rounded-2xl border transition-all p-5 sm:p-6 ${
                    isCompleted
                      ? 'bg-white border-emerald-200/80 shadow-2xs'
                      : isInProgress
                      ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-400/20 shadow-xs'
                      : 'bg-stone-50/70 border-stone-200 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    
                    <div className="flex items-start gap-3.5">
                      {/* Status Icon */}
                      <div className="mt-0.5 flex-shrink-0">
                        {isCompleted && (
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                        {isInProgress && (
                          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center animate-pulse shadow-xs">
                            <Clock className="w-5 h-5" />
                          </div>
                        )}
                        {isUpcoming && (
                          <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center">
                            <span className="text-xs font-bold">{step.id}</span>
                          </div>
                        )}
                        {isLocked && (
                          <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                            Step 0{step.id}
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="text-xs font-medium text-stone-500">
                            {step.department}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-xs font-medium text-emerald-800">
                          {step.titleHi}
                        </p>

                        <p className="text-xs text-stone-600 leading-relaxed pt-1">
                          {step.description}
                        </p>

                        {/* Requirements checklist */}
                        <div className="pt-2">
                          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                            Key Prerequisites:
                          </div>
                          <ul className="text-xs text-stone-600 space-y-1">
                            {step.requirements.map((req, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  isCompleted ? 'bg-emerald-600' : 'bg-stone-400'
                                }`} />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* If certificate is ready */}
                        {step.certificateNumber && (
                          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                                {step.certificateName}
                              </div>
                              <div className="text-xs font-mono font-bold text-stone-900">
                                {step.certificateNumber}
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveStepModal(step)}
                              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Certificate</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step Right Meta & Actions */}
                    <div className="text-right space-y-2 flex-shrink-0">
                      <div className="text-xs font-semibold text-stone-700">
                        {step.cost}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {step.estimatedTime}
                      </div>

                      {isInProgress && (
                        <button
                          onClick={() => setActiveStepModal(step)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>{step.actionLabel || 'Action Required'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approved</span>
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Storefront QR Card & CSC Desk */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Provisional Certificate Card */}
          <div className="bg-gradient-to-br from-emerald-950 to-stone-900 text-white rounded-3xl p-6 shadow-xl space-y-5 border border-emerald-700/40">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Storefront QR Sticker</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                Government Verified
              </span>
            </div>

            {/* QR Simulation Visual */}
            <div className="bg-white p-4 rounded-2xl text-stone-900 text-center space-y-2 shadow-inner">
              <div className="w-32 h-32 mx-auto bg-stone-900 rounded-xl p-2 flex items-center justify-center">
                {/* Visual SVG QR */}
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                  <rect x="10" y="10" width="30" height="30" fill="white" />
                  <rect x="15" y="15" width="20" height="20" fill="black" />
                  <rect x="20" y="20" width="10" height="10" fill="white" />
                  <rect x="60" y="10" width="30" height="30" fill="white" />
                  <rect x="65" y="15" width="20" height="20" fill="black" />
                  <rect x="70" y="20" width="10" height="10" fill="white" />
                  <rect x="10" y="60" width="30" height="30" fill="white" />
                  <rect x="15" y="65" width="20" height="20" fill="black" />
                  <rect x="20" y="70" width="10" height="10" fill="white" />
                  <rect x="45" y="45" width="10" height="10" fill="white" />
                  <rect x="60" y="60" width="15" height="15" fill="white" />
                  <rect x="80" y="75" width="10" height="15" fill="white" />
                  <rect x="45" y="15" width="10" height="15" fill="white" />
                  <rect x="45" y="70" width="10" height="15" fill="white" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-extrabold text-stone-900">{profile.name}</p>
                <p className="text-[10px] text-stone-500 font-mono">UDYAM-BR-01-0089241</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-300">
              <p>Display this QR at your shop counter. Customers, bank officers, and municipal inspectors can scan to confirm your lawful registered status.</p>
            </div>

            <button
              onClick={onOpenCertificateModal}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res Print (A4)</span>
            </button>
          </div>

          {/* CSC In-Person Help Center */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">Need In-Person Help?</h4>
                <p className="text-[10px] text-stone-500">Free Government CSC Assistance</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                <img src={ASSETS.amitVerma} alt="Amit Verma CSC" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">Amit Verma (CSC VLE)</p>
                <p className="text-[11px] text-stone-500 truncate">Center #182 • Kankarbagh Road</p>
                <p className="text-[10px] text-emerald-700 font-bold">600m from your shop</p>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="tel:9871234567"
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                <span>Call Center: +91 98712-34567</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate('video-call')}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Or Connect Online via Video Call</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Step Action / Certificate Modal */}
      {activeStepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Compliance Milestone Detail
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  {activeStepModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveStepModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
              <p>{activeStepModal.description}</p>
              
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Department:</span>
                  <span className="font-semibold text-stone-900">{activeStepModal.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Government Fee:</span>
                  <span className="font-semibold text-stone-900">{activeStepModal.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Processing SLA:</span>
                  <span className="font-semibold text-stone-900">{activeStepModal.estimatedTime}</span>
                </div>
              </div>

              {activeStepModal.id === 3 && !tradeLicensePaid && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Action Required for Trade License:</span>
                  </div>
                  <p className="text-[11px]">
                    PMC requires landlord's 2024 signed rental addendum or Holding Tax Receipt #PMC-2026-H49. Once paid, license issue is instantaneous.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveStepModal(null)}
                className="px-4 py-2 rounded-xl text-stone-600 text-xs font-semibold hover:bg-stone-100 cursor-pointer"
              >
                Close
              </button>

              {activeStepModal.id === 3 && !tradeLicensePaid && (
                <button
                  onClick={handleSimulateTradeLicense}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Pay ₹1,200 Statutory Fee & Submit
                </button>
              )}

              {activeStepModal.certificateNumber && (
                <button
                  onClick={() => {
                    setActiveStepModal(null);
                    onOpenCertificateModal();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Stamped Copy</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
