import React, { useState } from 'react';
import { ViewTab, ShopProfile } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  DollarSign, 
  Zap, 
  Banknote, 
  Download, 
  ArrowRight, 
  FileSpreadsheet, 
  Calculator, 
  Sparkles,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface CostBenefitViewProps {
  profile: ShopProfile;
  onNavigate: (tab: ViewTab) => void;
}

export const CostBenefitView: React.FC<CostBenefitViewProps> = ({
  profile,
  onNavigate
}) => {
  // Working capital simulation
  const [loanAmount, setLoanAmount] = useState<number>(100000);

  const moneylenderInterest = Math.round(loanAmount * 0.36); // 36% annual
  const mudraInterest = Math.round(loanAmount * 0.085); // 8.5% annual
  const interestSaved = moneylenderInterest - mudraInterest;
  const powerRebateSavings = 18000; // estimated yearly commercial tariff discount
  const municipalFee = 1200; // one-time / yearly trade license
  const netAnnualUpside = interestSaved + powerRebateSavings - municipalFee;

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Financial Viability & Ledger Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Informal vs. Formal Business Reality for {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              A transparent, rupee-for-rupee comparison showing how formalizing protects your margins, eliminates illegal extortion, and unlocks sovereign banking credit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadReport}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span>Download PDF Statement</span>
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Resume Formalization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top 2 High-Contrast Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 mt-6 border-t border-stone-100">
          
          <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                Operating Informal (Unregistered)
              </span>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-red-900">
              -₹{loanAmount > 0 ? (moneylenderInterest + 6000).toLocaleString('en-IN') : '27,500'}/yr
            </div>
            <p className="text-xs text-red-800">
              Hidden leakage: 36% moneylender interest, zero power subsidies, and vulnerability to harassment fines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Formalized with FormalSaathi
              </span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-900">
              +₹{netAnnualUpside.toLocaleString('en-IN')}/yr
            </div>
            <p className="text-xs text-emerald-800">
              Net retained surplus: 8.5% Mudra credit, ₹1,500/mo electricity rebate, and 30-day distributor credit.
            </p>
          </div>

        </div>
      </div>

      {/* Two-Column Side-by-Side Reality Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Informal Disadvantages */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-red-200/90 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-red-100">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Informal / Unregistered Dukaan
              </h3>
              <p className="text-xs text-stone-500">How informal shops silently lose wealth</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <div className="font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Credit: Moneylenders at 24% to 36%</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Paying ₹3,000 per month interest on just ₹1,00,000 inventory credit. The moneylender eats up your entire grocery net margin.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <div className="font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Electricity: Full Domestic / High Tariff</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Zero entitlement to state commercial rebates. Paying up to ₹8.50 per unit on refrigerators, deep-freezers, and display lighting.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <div className="font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Distributor Terms: 100% Cash Upfront</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                FMCG distributors (HUL, ITC, Nestlé) refuse 21-day credit terms to unregistered shops, forcing you to freeze your own cash.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <div className="font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Regulatory Risk & Sealing Fines</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Municipal inspectors can issue notice or confiscate goods. Shopkeepers pay periodic informal "settlements" of ₹5,000 - ₹10,000/yr.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Formalized Advantages */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-300 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Formalized with FormalSaathi
              </h3>
              <p className="text-xs text-stone-500">Legally protected, profitable business</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-emerald-700" />
                <span>Mudra Institutional Loan at 8.5% p.a.</span>
              </div>
              <p className="text-stone-700 leading-relaxed">
                State Bank of India collateral-free working capital loan. On ₹1,00,000, you pay only ~₹708/mo interest instead of ₹3,000/mo!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-700" />
                <span>Commercial Power Rebate (₹1.5/unit)</span>
              </div>
              <p className="text-stone-700 leading-relaxed">
                Under Bihar Urban Energy Scheme, registered trade license holders get ₹1.5 discount per unit, saving ~₹1,500 every single month!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Patna Municipal Corporation Form 4B</span>
              </div>
              <p className="text-stone-700 leading-relaxed">
                For a statutory one-time fee of ₹1,200, you receive official legal immunity against arbitrary eviction and municipal seizure.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>30-Day Revolving Supplier Credit</span>
              </div>
              <p className="text-stone-700 leading-relaxed">
                FMCG distributors furnish verified Udyam shops with credit terms. Restock your shelves without depleting daily cash counters.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Credit & Interest Savings Calculator */}
      <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Working Capital Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How much interest will your shop save?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Slide the loan amount below to see the dramatic difference between local moneylenders and Mudra institutional credit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          <div className="lg:col-span-7 bg-white/10 rounded-2xl p-6 border border-white/10 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-stone-300 font-semibold">Inventory Loan Amount Needed:</span>
                <span className="text-xl font-extrabold text-emerald-300 font-mono">
                  ₹{loanAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="25000"
                max="500000"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>₹25,000 (Shishu)</span>
                <span>₹2,00,000 (Kishore)</span>
                <span>₹5,00,000 (Tarun)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 space-y-1">
                <div className="text-red-300 font-bold">Moneylender (36% p.a.)</div>
                <div className="text-xl font-bold font-mono text-red-200">
                  ₹{moneylenderInterest.toLocaleString('en-IN')}/yr
                </div>
                <div className="text-[10px] text-stone-400">₹{Math.round(moneylenderInterest / 12)} per month</div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/60 space-y-1">
                <div className="text-emerald-300 font-bold">Mudra Bank (8.5% p.a.)</div>
                <div className="text-xl font-bold font-mono text-emerald-300">
                  ₹{mudraInterest.toLocaleString('en-IN')}/yr
                </div>
                <div className="text-[10px] text-emerald-200/80">₹{Math.round(mudraInterest / 12)} per month</div>
              </div>
            </div>
          </div>

          {/* Direct Cash Saved Highlight */}
          <div className="lg:col-span-5 bg-emerald-950/90 rounded-2xl p-6 border border-emerald-400/40 text-center space-y-3 shadow-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Direct In-Pocket Savings
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              ₹{interestSaved.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-emerald-100">
              Money kept in your family and shop every year just on interest difference!
            </p>

            <div className="pt-2 border-t border-emerald-800/60 text-xs text-stone-300 space-y-1 text-left">
              <div className="flex justify-between">
                <span>+ Power Subsidy:</span>
                <span className="font-bold text-white">+₹18,000/yr</span>
              </div>
              <div className="flex justify-between">
                <span>- One-time Trade License:</span>
                <span className="font-bold text-red-300">-₹1,200</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-emerald-800/40 text-emerald-300 font-bold">
                <span>Total Net Upside:</span>
                <span>+₹{netAnnualUpside.toLocaleString('en-IN')}/yr</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
