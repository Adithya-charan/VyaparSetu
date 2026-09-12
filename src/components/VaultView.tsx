import React, { useState } from 'react';
import { VaultDocument, DocumentVerificationStatus } from '../types';
import { VAULT_DOCUMENTS, ASSETS } from '../data/mockData';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UploadCloud, 
  Lock, 
  ShieldCheck, 
  Eye, 
  Download, 
  Smartphone, 
  Camera, 
  Image as ImageIcon, 
  X,
  FileCheck2,
  ExternalLink,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const VaultView: React.FC = () => {
  const [docs, setDocs] = useState<VaultDocument[]>(VAULT_DOCUMENTS);
  const [selectedDocForUpload, setSelectedDocForUpload] = useState<VaultDocument | null>(null);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [simulatedFile, setSimulatedFile] = useState<string | null>(null);

  const verifiedCount = docs.filter(d => d.status === 'verified').length;
  const totalCount = docs.length;
  const readinessPercent = Math.round((verifiedCount / totalCount) * 100);

  const handleUploadSimulate = () => {
    if (!selectedDocForUpload) return;
    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });

      setDocs(prev => prev.map(d => {
        if (d.id === selectedDocForUpload.id) {
          return {
            ...d,
            status: 'verified',
            uploadedDate: 'Just Now',
            fileSize: '1.9 MB',
            notes: 'Verified successfully via Automated OCR & Sovereign validation.',
            verifiedBy: 'AI Document Verifier'
          };
        }
        return d;
      }));
      setSelectedDocForUpload(null);
      setSimulatedFile(null);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      
      {/* Vault Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>DigiLocker Integrated • Sovereign AES-256 Cloud Vault</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Document Checklist & Sovereign Vault
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
              Your official business paperwork repository. Encrypted, government-audited, and protected from third-party broker exposure.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                UIDAI / NSDL API Synced
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                Zero Physical Stamping Needed
              </span>
            </div>
          </div>

          {/* Readiness gauge */}
          <div className="lg:col-span-4 bg-stone-50 rounded-2xl p-5 border border-stone-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Sovereign Readiness
              </div>
              <div className="text-3xl sm:text-4xl font-black text-stone-900">
                {readinessPercent}%
              </div>
              <div className="text-xs font-semibold text-emerald-700">
                {verifiedCount} of {totalCount} Verified
              </div>
              <div className="text-[11px] text-stone-500">
                {totalCount - verifiedCount} documents require action
              </div>
            </div>

            <div className="relative w-18 h-18 flex items-center justify-center flex-shrink-0">
              <svg className="w-18 h-18 transform -rotate-90">
                <circle cx="36" cy="36" r="28" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                <circle
                  cx="36"
                  cy="36"
                  r="28"
                  stroke="#059669"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="175"
                  strokeDashoffset={175 - (175 * readinessPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-xs font-black text-stone-800">
                {readinessPercent}%
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Immediate Attention Callout */}
      {verifiedCount < totalCount && (
        <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white flex-shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Action Required on {totalCount - verifiedCount} Documents
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Upload your latest commercial electricity bill to activate the ₹1.5/unit power rebate and complete Patna Trade License approval.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedDocForUpload(docs.find(d => d.status === 'action_needed') || docs[0])}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex-shrink-0 shadow-xs transition-colors cursor-pointer"
          >
            Upload Needed Documents
          </button>
        </div>
      )}

      {/* Document List Table / Cards */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              Verified Records & Submissions
            </h3>
            <p className="text-xs text-stone-500">
              Directly referenced during municipal and banking loan inspections
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDocForUpload(docs[3])}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload New Document</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-stone-100">
          {docs.map((doc) => {
            const isVerified = doc.status === 'verified';
            const isActionNeeded = doc.status === 'action_needed';
            const isInReview = doc.status === 'in_review';

            return (
              <div key={doc.id} className="p-5 sm:p-6 hover:bg-stone-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isVerified ? 'bg-emerald-100 text-emerald-700' :
                    isActionNeeded ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {isVerified ? <CheckCircle2 className="w-5 h-5" /> :
                     isActionNeeded ? <AlertCircle className="w-5 h-5" /> :
                     <Clock className="w-5 h-5" />}
                  </div>

                  {/* Document details */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-900">{doc.name}</h4>
                      <span className="text-xs text-stone-400 font-normal">({doc.nameHi})</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isVerified ? 'bg-emerald-100 text-emerald-800' :
                        isActionNeeded ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {isVerified ? 'Verified' : isActionNeeded ? 'Action Needed' : 'In Review'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500">{doc.notes}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 pt-0.5">
                      <span>Used for: <strong>{doc.requiredFor}</strong></span>
                      <span>•</span>
                      <span>Updated: {doc.uploadedDate}</span>
                      {doc.verifiedBy && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-700 font-medium">Verified by: {doc.verifiedBy}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {doc.previewUrl && (
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Preview Document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}

                  {isActionNeeded ? (
                    <button
                      onClick={() => setSelectedDocForUpload(doc)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Copy</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Two Help Columns: WhatsApp Scan Bot & Photo Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Bot Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold">FormalSaathi WhatsApp Bot</h4>
              <p className="text-xs text-emerald-200">Send photos directly from your phone camera</p>
            </div>
          </div>

          <p className="text-xs text-stone-200 leading-relaxed">
            Take a picture of your electricity bill or rental agreement on your phone camera and send it to our WhatsApp helpline. Our automated AI bot reads the meter number and uploads it to your vault automatically.
          </p>

          <div className="p-3 rounded-xl bg-black/20 text-xs font-mono flex items-center justify-between">
            <span className="text-stone-300">WhatsApp Scanner:</span>
            <span className="font-bold text-emerald-300">+91 98765-43210</span>
          </div>

          <a
            href="https://wa.me/919876543210?text=Namaste%20FormalSaathi%20I%20want%20to%20upload%20my%20Kirana%20documents"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open in WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Framing Guidelines */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-700" />
            <h4 className="text-base font-bold text-stone-900">How to Capture Clean Photos</h4>
          </div>

          <ul className="text-xs text-stone-600 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span><strong>Shop Frontage Photo:</strong> Stand across the street so the complete shop signboard with Hindi & English lettering and neighboring shops are visible.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span><strong>Electricity Bill:</strong> Make sure Consumer ID (CA Number), tariff category ("LT Commercial"), and meter reading address are clear without glare.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span><strong>Daylight Preferred:</strong> Take photos in daylight to ensure GPS geotags automatically register for Patna Municipal Corporation audit.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Upload Modal */}
      {selectedDocForUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Secure Document Ingestion
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  Upload: {selectedDocForUpload.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocForUpload(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag & drop dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                setSimulatedFile('document_scanned_copy_2026.pdf (1.9 MB)');
              }}
              className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
                dragActive ? 'border-emerald-600 bg-emerald-50/60' : 'border-stone-300 hover:border-emerald-500 bg-stone-50'
              }`}
              onClick={() => setSimulatedFile('electricity_bill_patna_2026.pdf (1.9 MB)')}
            >
              <UploadCloud className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-stone-800">
                {simulatedFile ? simulatedFile : 'Click to select file or drag & drop here'}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">
                Supports JPG, PNG, PDF up to 15MB. Encrypted directly with your UIDAI key.
              </p>
            </div>

            {/* Simulation controls */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-stone-500">
                {simulatedFile ? '✓ File loaded ready for OCR verification' : 'Select sample document above'}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDocForUpload(null)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleUploadSimulate}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {uploading ? 'Verifying with Government API...' : 'Verify & Store in Vault'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-start justify-between pb-2 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900">{previewDoc.name}</h3>
                <p className="text-xs text-stone-500">{previewDoc.type} • {previewDoc.uploadedDate}</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewDoc.previewUrl ? (
              <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 max-h-[380px]">
                <img 
                  src={previewDoc.previewUrl} 
                  alt={previewDoc.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
                <FileText className="w-12 h-12 text-stone-400 mx-auto" />
                <p className="text-xs font-bold text-stone-800">{previewDoc.name}</p>
                <p className="text-[11px] text-stone-500 font-mono">DigiLocker Doc Ref: #DL-2026-IN-90821</p>
                <p className="text-xs text-stone-600">{previewDoc.notes}</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
