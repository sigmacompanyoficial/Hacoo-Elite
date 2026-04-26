"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  Trash2, 
  Bell, 
  Globe, 
  Shield, 
  ExternalLink,
  ChevronRight,
  LogOut,
  AlertTriangle,
  ShoppingBag,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfileSettings() {
  const { user, profile, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!user) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    // Simulate update
    setTimeout(() => {
      setIsUpdating(false);
      setSuccessMsg("Perfil actualizado correctamente");
      setTimeout(() => setSuccessMsg(""), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic leading-none">
          Mi <span className="text-blue-500">Perfil</span>
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl">Gestiona tu cuenta, preferencias y seguridad de Hacoo Elite.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Avatar & Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-32">
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl">
            <div className="relative group mb-8">
              <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-900 overflow-hidden flex items-center justify-center text-zinc-500 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-full h-full object-cover" />
                ) : (
                  <User size={48} />
                )}
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-[#111111] hover:bg-blue-500 transition-colors shadow-lg">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight leading-none">{user.displayName || "Usuario"}</h2>
            <p className="text-zinc-500 text-sm mb-8 truncate w-full px-4">{user.email}</p>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">
              {profile?.role === "admin" ? "Administrador Elite" : "Miembro Elite"}
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/[0.04]">
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] px-2">Mi Actividad</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              <button className="w-full flex items-center justify-between p-6 text-zinc-400 hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center gap-4">
                  <ShoppingBag size={20} className="text-blue-500" />
                  <span className="font-bold text-sm uppercase tracking-wide">Mis Pedidos</span>
                </div>
                <span className="bg-zinc-800 text-zinc-400 text-[10px] px-3 py-1 rounded-full font-black">0</span>
              </button>
              <button className="w-full flex items-center justify-between p-6 text-zinc-400 hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center gap-4">
                  <Shield size={20} className="text-purple-500" />
                  <span className="font-bold text-sm uppercase tracking-wide">Favoritos</span>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => logout()}
                className="w-full flex items-center justify-between p-6 text-zinc-400 hover:bg-red-500/5 hover:text-red-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <LogOut size={20} />
                  <span className="font-bold text-sm uppercase tracking-wide">Cerrar sesión</span>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-6 text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <Trash2 size={20} />
                  <span className="font-bold text-sm uppercase tracking-wide">Eliminar cuenta</span>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Settings Form */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* General Settings */}
          <section className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] p-8 md:p-14 shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Settings size={28} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Ajustes Generales</h3>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Nombre Completo</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      defaultValue={user.displayName || ""}
                      className="w-full bg-[#080808] border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Email (Solo lectura)</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700" size={20} />
                    <input 
                      type="email" 
                      value={user.email || ""}
                      disabled
                      className="w-full bg-[#080808]/50 border border-zinc-900 rounded-2xl py-5 pl-14 pr-6 text-zinc-600 cursor-not-allowed font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Biografía / Notas</label>
                <textarea 
                  className="w-full bg-[#080808] border border-zinc-800 rounded-2xl py-5 px-6 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all min-h-[120px] resize-none"
                  placeholder="Algo sobre ti..."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.04]">
                <div className="text-sm font-bold text-green-500 flex items-center gap-2">
                  {successMsg && <Shield size={16} />}
                  {successMsg}
                </div>
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-600/20"
                >
                  <Save size={20} />
                  {isUpdating ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
                </button>
              </div>
            </form>
          </section>

          {/* Preferences */}
          <section className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] p-8 md:p-14 shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Globe size={28} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Preferencias</h3>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#080808] border border-zinc-800/50 rounded-3xl">
                <div>
                  <h4 className="text-white font-black text-lg mb-1 uppercase italic">Idioma del Interfaz</h4>
                  <p className="text-zinc-500 text-sm">Selecciona tu idioma preferido para navegar.</p>
                </div>
                <div className="flex gap-3 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800">
                  {[
                    { code: "es", label: "ESP" },
                    { code: "en", label: "ENG" },
                    { code: "fr", label: "FRA" }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code as any)}
                      className={`px-6 py-3 rounded-xl text-xs font-black transition-all ${language === l.code ? 'bg-white text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#080808] border border-zinc-800/50 rounded-3xl">
                <div>
                  <h4 className="text-white font-black text-lg mb-1 uppercase italic">Notificaciones</h4>
                  <p className="text-zinc-500 text-sm">Recibe avisos de nuevas ofertas y chollos en tiempo real.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-7 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Info */}
          <section className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] p-8 md:p-14 shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Shield size={28} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Seguridad y Ayuda</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a 
                href="#" 
                className="flex items-center justify-between p-7 bg-[#080808] border border-zinc-800/50 rounded-3xl hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center gap-4 text-zinc-300 group-hover:text-white">
                  <AlertTriangle size={24} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                  <span className="font-black uppercase text-sm tracking-widest">Cambiar contraseña</span>
                </div>
                <ExternalLink size={18} className="text-zinc-700 group-hover:text-blue-500 transition-colors" />
              </a>
              <a 
                href="https://t.me/HacooLinksElite" 
                target="_blank"
                className="flex items-center justify-between p-7 bg-[#080808] border border-zinc-800/50 rounded-3xl hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center gap-4 text-zinc-300 group-hover:text-white">
                  <Globe size={24} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
                  <span className="font-black uppercase text-sm tracking-widest">Comunidad Telegram</span>
                </div>
                <ExternalLink size={18} className="text-zinc-700 group-hover:text-blue-500 transition-colors" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
