import React, { useState, useEffect } from 'react';
import { MapPin, Zap, Truck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface PincodeCheckerProps {
  onPincodeValidated?: (pincode: string) => void;
}

export const PincodeChecker: React.FC<PincodeCheckerProps> = ({ onPincodeValidated }) => {
  const [pincode, setPincode] = useState(() => {
    return localStorage.getItem('sravanthi_bakery_pincode') || '';
  });
  const [status, setStatus] = useState<'idle' | 'hyderabad' | 'panIndia' | 'invalid'>('idle');

  const checkPincode = (code: string) => {
    const clean = code.trim();
    if (!/^\d{6}$/.test(clean)) {
      setStatus('invalid');
      return;
    }

    localStorage.setItem('sravanthi_bakery_pincode', clean);
    if (onPincodeValidated) {
      onPincodeValidated(clean);
    }

    if (clean.startsWith('500') || clean.startsWith('501') || clean.startsWith('502')) {
      setStatus('hyderabad');
    } else {
      setStatus('panIndia');
    }
  };

  useEffect(() => {
    if (pincode && pincode.length === 6) {
      checkPincode(pincode);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkPincode(pincode);
  };

  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 md:p-5 shadow-xs my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-bakery-burgundy/10 text-bakery-burgundy flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-signika font-bold text-base text-bakery-burgundy flex items-center gap-2">
              <span>Check Delivery Speed to Your Doorstep</span>
              <span className="text-[10px] bg-bakery-amber/20 text-bakery-amberDark font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Daily 5 AM Dispatch
              </span>
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Enter your 6-digit postal pincode to view real-time delivery slots and carrier transit time.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setPincode(val);
                if (val.length === 6) checkPincode(val);
                else if (val.length === 0) setStatus('idle');
              }}
              placeholder="e.g. 500081 or 560001"
              className="w-full text-xs font-mono tracking-wider py-2.5 px-3.5 pr-8 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-bakery-burgundy focus:ring-1 focus:ring-bakery-burgundy transition-all"
            />
            {status !== 'idle' && (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
                {status === 'invalid' ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-warm transition-all"
          >
            <span>Check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Result Badges */}
      {status === 'hyderabad' && (
        <div className="mt-3.5 pt-3 border-t border-stone-200/60 flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">Hyderabad Metropolitan Express:</span>
          <span>⚡ Same-day 2-hour express delivery active for pincode <b>{pincode}</b> via Porter/Dunzo! Free delivery on orders ₹499+.</span>
        </div>
      )}

      {status === 'panIndia' && (
        <div className="mt-3.5 pt-3 border-t border-stone-200/60 flex items-center gap-2 text-xs text-blue-900 bg-blue-50/80 px-3 py-2 rounded-xl border border-blue-200">
          <Truck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold">Pan-India Express Air Cargo:</span>
          <span>🚚 Ships via BlueDart/Delhivery Express in vacuum-sealed food-grade packs. Estimated delivery 24–48 hours for <b>{pincode}</b>.</span>
        </div>
      )}

      {status === 'invalid' && (
        <div className="mt-3.5 pt-3 border-t border-stone-200/60 flex items-center gap-2 text-xs text-red-800 bg-red-50/80 px-3 py-2 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>Please enter a valid 6-digit Indian postal pincode (e.g. 500081, 560001, 110001).</span>
        </div>
      )}
    </div>
  );
};
