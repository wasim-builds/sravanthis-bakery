import React, { useState } from 'react';
import { QrCode, Copy, Check, Smartphone, ShieldCheck } from 'lucide-react';

interface UpiPaymentWidgetProps {
  amount: number;
  orderId: string;
}

export const UpiPaymentWidget: React.FC<UpiPaymentWidgetProps> = ({ amount, orderId }) => {
  const [copied, setCopied] = useState(false);
  const upiId = 'sravanthisbakery@icici';
  const payeeName = "Sravanthi's Artisanal Bakery";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=Order_${orderId}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center space-y-3 mt-3 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
          <QrCode className="w-4 h-4 text-bakery-burgundy" />
          <span>Zero-Fee Instant UPI QR Payment</span>
        </span>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" /> NPCI Verified
        </span>
      </div>

      {/* Simulated High-Res Crisp QR Code with SVG */}
      <div className="flex justify-center my-2">
        <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs inline-block relative">
          <svg className="w-36 h-36 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Corner Markers */}
            <rect x="5" y="5" width="26" height="26" rx="4" stroke="#56150E" strokeWidth="4" fill="none"/>
            <rect x="11" y="11" width="14" height="14" rx="2" fill="#56150E"/>

            <rect x="69" y="5" width="26" height="26" rx="4" stroke="#56150E" strokeWidth="4" fill="none"/>
            <rect x="75" y="11" width="14" height="14" rx="2" fill="#56150E"/>

            <rect x="5" y="69" width="26" height="26" rx="4" stroke="#56150E" strokeWidth="4" fill="none"/>
            <rect x="11" y="75" width="14" height="14" rx="2" fill="#56150E"/>

            {/* Simulated Data Grid Elements */}
            <rect x="36" y="8" width="5" height="5" fill="#56150E" />
            <rect x="44" y="8" width="5" height="5" fill="#56150E" />
            <rect x="56" y="8" width="5" height="5" fill="#56150E" />

            <rect x="36" y="18" width="5" height="8" fill="#56150E" />
            <rect x="46" y="22" width="6" height="5" fill="#56150E" />
            <rect x="56" y="18" width="5" height="5" fill="#56150E" />

            <rect x="10" y="38" width="6" height="5" fill="#56150E" />
            <rect x="22" y="44" width="6" height="6" fill="#56150E" />
            <rect x="34" y="36" width="6" height="6" fill="#56150E" />
            <rect x="44" y="36" width="6" height="6" fill="#56150E" />
            <rect x="54" y="44" width="6" height="6" fill="#56150E" />
            <rect x="66" y="36" width="6" height="6" fill="#56150E" />
            <rect x="78" y="38" width="6" height="5" fill="#56150E" />

            <rect x="38" y="54" width="6" height="6" fill="#56150E" />
            <rect x="50" y="54" width="6" height="6" fill="#56150E" />
            <rect x="62" y="54" width="6" height="6" fill="#56150E" />

            <rect x="38" y="68" width="6" height="6" fill="#56150E" />
            <rect x="48" y="74" width="6" height="6" fill="#56150E" />
            <rect x="62" y="68" width="6" height="6" fill="#56150E" />
            <rect x="74" y="68" width="6" height="6" fill="#56150E" />
            <rect x="84" y="74" width="6" height="6" fill="#56150E" />

            {/* Center Bakery Emblem */}
            <circle cx="50" cy="50" r="11" fill="#FCF7F0" stroke="#56150E" strokeWidth="2"/>
            <text x="50" y="53" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#56150E" fontFamily="sans-serif">SB</text>
          </svg>
          <div className="text-[10px] text-stone-500 font-mono mt-1 font-bold">
            Scan with any UPI App
          </div>
        </div>
      </div>

      {/* Copy UPI ID */}
      <div className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs">
        <span className="font-mono text-stone-700 font-semibold">{upiId}</span>
        <button
          type="button"
          onClick={handleCopyUpi}
          className="text-bakery-burgundy hover:text-bakery-burgundyDark flex items-center gap-1 font-bold text-[11px] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy UPI ID</span>
            </>
          )}
        </button>
      </div>

      {/* Direct App Launchers on Mobile */}
      <div className="pt-1">
        <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold mb-1.5 flex items-center justify-center gap-1">
          <Smartphone className="w-3 h-3 text-bakery-amber" /> Or Pay Directly Via App:
        </div>
        <div className="grid grid-cols-3 gap-2">
          <a
            href={upiUrl}
            className="py-1.5 px-2 rounded-lg bg-white border border-stone-200 text-stone-800 text-[11px] font-bold hover:bg-stone-100 transition-colors shadow-2xs"
          >
            Google Pay
          </a>
          <a
            href={upiUrl}
            className="py-1.5 px-2 rounded-lg bg-white border border-stone-200 text-[#5f259f] text-[11px] font-bold hover:bg-stone-100 transition-colors shadow-2xs"
          >
            PhonePe
          </a>
          <a
            href={upiUrl}
            className="py-1.5 px-2 rounded-lg bg-white border border-stone-200 text-blue-700 text-[11px] font-bold hover:bg-stone-100 transition-colors shadow-2xs"
          >
            Paytm / BHIM
          </a>
        </div>
      </div>
    </div>
  );
};
