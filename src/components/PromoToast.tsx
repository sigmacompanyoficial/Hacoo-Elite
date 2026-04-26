"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Copy, CheckCircle2 } from "lucide-react";

export default function PromoToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const PROMO_CODE = "POLE14";
  const INTERVAL_TIME = 4 * 60 * 1000; // 4 minutes

  useEffect(() => {
    // Initial delay before showing the first toast (e.g., 30 seconds)
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    // Regular interval
    const interval = setInterval(() => {
      setIsVisible(true);
    }, INTERVAL_TIME);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          className="fixed bottom-24 left-6 z-[1000] w-[320px] bg-[#111111] border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden"
        >
          <div className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Zap size={16} className="fill-current" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase tracking-widest">Oferta Exclusiva</h4>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">Válido hoy</p>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-zinc-600 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-zinc-300 text-sm font-medium leading-relaxed">
              ¡No olvides usar el código <span className="text-blue-500 font-black">POLE14</span> para un <span className="text-white font-black italic">15% EXTRA</span> de descuento en tu compra!
            </p>

            <button
              onClick={handleCopy}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all ${
                copied 
                ? "bg-green-600 text-white" 
                : "bg-blue-600/10 text-blue-500 border border-blue-500/20 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              {copied ? "¡COPIADO!" : "COPIAR CÓDIGO"}
            </button>
          </div>
          
          {/* Progress bar for the interval? No, just a static line */}
          <div className="h-1 bg-zinc-900 w-full overflow-hidden">
             <motion.div 
               initial={{ width: "100%" }}
               animate={{ width: "0%" }}
               transition={{ duration: 10, ease: "linear" }}
               onAnimationComplete={() => setIsVisible(false)}
               className="h-full bg-blue-500"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
