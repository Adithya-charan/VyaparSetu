import React from 'react';
import { ShopProfile } from '../types';
import { ASSETS } from '../data/mockData';
import { X, Printer, Download, Share2, ShieldCheck, QrCode, Award } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ShopProfile;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Top actions bar */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
          <span className="font-bold text-stone-700 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Provisional Storefront Certificate (दुकानदार प्रमाण पत्र)</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-8 sm:p-10 bg-[#fbfaf8] text-stone-900 relative">
          
          {/* Ornate border */}
          <div className="border-4 border-double border-emerald-800 p-6 sm:p-8 rounded-2xl relative bg-white shadow-xs">
            
            {/* Watermark subtle seal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <ShieldCheck className="w-96 h-96 text-emerald-950" />
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 pb-6 border-b border-stone-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 mx-auto p-0.5 shadow-md flex items-center justify-center">
                <img src={ASSETS.logo} alt="FormalSaathi" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
              </div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800">
                GOVERNMENT OF INDIA MSME INITIATIVE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                Certificate of Formalized Retail Entity
              </h2>
              <p className="text-xs text-stone-500 italic">
                Issued under the National Small Enterprise Formalization & Protection Framework
              </p>
            </div>

            {/* Certificate Body */}
            <div className="py-6 text-center space-y-4">
              <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                This is to certify that the commercial establishment
              </p>
              
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">
                {profile.name}
              </div>

              <div className="text-xs text-stone-700 max-w-lg mx-auto leading-relaxed">
                Operated by Proprietor: <strong>{profile.ownerName}</strong><br />
                Premises: <strong>{profile.address}, {profile.ward}, {profile.city}, {profile.state} - {profile.pinCode}</strong>
              </div>

              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Has initiated statutory registration, complies with municipal trade parameters, and is officially eligible for Priority Sector Banking Credit and Energy Tariff Subsidies.
              </p>
            </div>

            {/* Bottom details & QR Seal */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 items-end text-left text-xs">
              
              <div className="space-y-1">
                <div className="text-[10px] text-stone-400 uppercase font-bold">Udyam Identifier</div>
                <div className="font-mono font-bold text-stone-900 text-[11px]">UDYAM-BR-01-0089241</div>
                <div className="text-[10px] text-stone-500">Date: 15 August 2026</div>
              </div>

              {/* QR verification */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-stone-900 p-1.5 rounded-lg shadow-sm">
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
                  </svg>
                </div>
                <span className="text-[9px] text-stone-500 uppercase font-bold block mt-1">
                  Scan to Authenticate
                </span>
              </div>

              <div className="space-y-1 text-right">
                <div className="w-24 border-b border-stone-800 ml-auto pb-6 text-right">
                  <span className="font-serif italic text-xs text-stone-700">Vipin Pathak</span>
                </div>
                <div className="text-[10px] text-stone-500 font-bold">Authorized Officer</div>
                <div className="text-[9px] text-stone-400">Patna Urban MSME Cell</div>
              </div>

            </div>

          </div>

          <p className="text-[10px] text-center text-stone-400 mt-4">
            Display this QR at your shop billing counter to assure customers and inspectors of official legal registration.
          </p>

        </div>

      </div>
    </div>
  );
};
