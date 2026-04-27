"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Send, User, LogOut, Settings, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const { cartCount } = useCart();
  const { t, language, setLanguage } = useLanguage();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: t("nav.start"), href: "/" },
    { name: t("nav.catalog"), href: "/products" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[1000]">
      <div className="site-header h-[var(--header-height-mobile)] md:h-[var(--header-height)] bg-[#080808]/85 backdrop-blur-xl border-b border-zinc-900">
        <div className="container header-container h-full flex justify-between items-center">
          {/* Left: Logo */}
          <Link href="/" className="logo-link flex items-center h-full py-2">
            <img
              src="/LOGO.png"
              alt="Hacoo Elite Logo"
              className="h-full w-auto max-h-[40px] md:max-h-[50px] object-contain"
            />
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="nav-links hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item text-zinc-400 hover:text-white transition-colors ${pathname === link.href ? "text-blue-500 font-bold" : ""}`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://t.me/HacooLinksElite"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Telegram
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Admin Link (Only for admins) */}
            {profile?.role === "admin" && (
              <Link 
                href="/admin" 
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/5"
              >
                <ShieldCheck size={14} />
                Admin
              </Link>
            )}

            {/* Configuration Button */}
            <div className="relative group">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-900">
                <Settings size={22} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>

              {/* Config Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-zinc-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[1100] p-2">
                <div className="text-[10px] font-black uppercase text-zinc-500 px-3 py-2 tracking-widest">Configuración</div>
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-2 text-xs font-bold text-zinc-300">Idioma</div>
                  <div className="grid grid-cols-5 gap-1 p-1">
                    {[
                      { code: "es", flag: "🇪🇸" },
                      { code: "en", flag: "🇺🇸" },
                      { code: "fr", flag: "🇫🇷" },
                      { code: "de", flag: "🇩🇪" },
                      { code: "pt", flag: "🇵🇹" }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm hover:bg-zinc-800 transition-colors ${language === lang.code ? 'bg-blue-600/20 border border-blue-500/50' : ''}`}
                        title={lang.code.toUpperCase()}
                      >
                        {lang.flag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-zinc-400 hover:text-white transition-colors group">
              <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center shadow-lg border-2 border-[#080808] transform scale-100 group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            <div className="hidden md:block">
              {user ? (
                <Link href="/profile" className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex flex-col items-end">
                    <span className="text-white text-xs font-bold group-hover:text-blue-500 transition-colors">{profile?.displayName || "Usuario"}</span>
                    <button
                      onClick={(e) => { e.preventDefault(); logout(); }}
                      className="text-zinc-500 text-[10px] uppercase font-black tracking-widest hover:text-red-500 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 overflow-hidden group-hover:border-blue-500/50 transition-all shadow-xl">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt={profile.displayName || ""} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                </Link>
              ) : (
                <Link href="/auth" className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold border border-zinc-800 hover:bg-zinc-800 transition-all">
                  Iniciar Sesión
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle md:hidden text-white p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[2000] flex flex-col p-8 bg-[#080808] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="logo-link flex items-center h-10 py-1" onClick={() => setIsMenuOpen(false)}>
                <img
                  src="/LOGO.png"
                  alt="Hacoo Elite Logo"
                  className="h-full w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 mb-12">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`text-5xl font-black italic uppercase tracking-tighter transition-colors ${pathname === link.href ? "text-blue-500" : "text-white hover:text-blue-400"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
              >
                <a
                  href="https://t.me/HacooLinksElite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-5xl font-black italic uppercase tracking-tighter text-white flex items-center gap-4 hover:text-blue-400 transition-colors"
                >
                  Telegram
                  <Send size={32} className="text-blue-500" />
                </a>
              </motion.div>

              {profile?.role === "admin" && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (navLinks.length + 1) * 0.1 }}
                >
                  <Link
                    href="/admin"
                    className="text-5xl font-black italic uppercase tracking-tighter text-blue-500 flex items-center gap-4 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                    <ShieldCheck size={32} />
                  </Link>
                </motion.div>
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto"
            >
              {user ? (
                <Link 
                  href="/profile" 
                  className="flex items-center gap-4 p-5 bg-zinc-900 rounded-2xl border border-zinc-800 group active:scale-[0.98] transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 overflow-hidden group-hover:border-blue-500/50 transition-all">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt={profile.displayName || ""} className="w-full h-full object-cover" />
                    ) : (
                      <User size={28} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-black uppercase text-sm tracking-tight group-hover:text-blue-500 transition-colors">{profile?.displayName || "Usuario"}</span>
                    <button
                      onClick={(e) => { e.preventDefault(); logout(); setIsMenuOpen(false); }}
                      className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] text-left mt-1"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-blue-600/30 active:scale-[0.98] transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={24} />
                  INICIAR SESIÓN
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
