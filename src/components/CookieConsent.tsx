"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[2000]"
        >
          <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="text-blue-500" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1 tracking-tight">Aviso de Cookies</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Utilizamos cookies para mejorar tu experiencia y analizar el tráfico de forma anónima. Al continuar, aceptas nuestra <Link href="/legal#privacidad" className="text-blue-500 hover:underline font-bold">política de privacidad</Link>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptCookies}
                className="flex-grow bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-[0.98]"
              >
                Aceptar todo
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="px-6 py-4 rounded-xl bg-zinc-800 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
