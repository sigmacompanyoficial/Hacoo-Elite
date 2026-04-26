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
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic">
          Mi <span className="text-blue-500">Perfil</span>
        </h1>
        <p className="text-zinc-500 text-lg">Gestiona tu cuenta, preferencias y seguridad de Hacoo Elite.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Avatar & Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#111111] border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col items-center text-center">
            <div className="relative group mb-6">
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
            <h2 className="text-xl font-black text-white mb-1 uppercase tracking-tight">{user.displayName || "Usuario"}</h2>
            <p className="text-zinc-500 text-sm mb-6 truncate w-full px-4">{user.email}</p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
              {profile?.role === "admin" ? "Administrador Elite" : "Miembro Elite"}
            </div>
          </div>

          <div className="bg-[#111111] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-zinc-800/50">
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-2">Mi Actividad</span>
            </div>
            <button className="w-full flex items-center justify-between p-5 text-zinc-400 hover:bg-zinc-800 transition-all group">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-blue-500" />
                <span className="font-bold">Mis Pedidos</span>
              </div>
              <span className="bg-zinc-800 text-zinc-500 text-[10px] px-2 py-0.5 rounded-full font-black">0</span>
            </button>
            <button className="w-full flex items-center justify-between p-5 text-zinc-400 hover:bg-zinc-800 transition-all group border-b border-zinc-800/50">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-purple-500" />
                <span className="font-bold">Favoritos</span>
              </div>
              <ChevronRight size={18} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => logout()}
              className="w-full flex items-center justify-between p-5 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all group border-b border-zinc-800/50"
            >
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <span className="font-bold">Cerrar sesión</span>
              </div>
              <ChevronRight size={18} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="w-full flex items-center justify-between p-5 text-red-500/60 hover:bg-red-900/10 hover:text-red-500 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Trash2 size={20} />
                <span className="font-bold">Eliminar cuenta</span>
              </div>
              <ChevronRight size={18} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right: Settings Form */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* General Settings */}
          <section className="bg-[#111111] border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Settings size={22} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Ajustes Generales</h3>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Nombre Completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      type="text" 
                      defaultValue={user.displayName || ""}
                      className="w-full bg-[#080808] border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Email (Solo lectura)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
                    <input 
                      type="email" 
                      value={user.email || ""}
                      disabled
                      className="w-full bg-[#080808]/50 border border-zinc-900 rounded-2xl py-4 pl-12 pr-6 text-zinc-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Biografía / Notas</label>
                <textarea 
                  className="w-full bg-[#080808] border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all min-h-[100px]"
                  placeholder="Algo sobre ti..."
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-xs font-bold text-green-500">
                  {successMsg}
                </div>
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  {isUpdating ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
                </button>
              </div>
            </form>
          </section>

          {/* Preferences */}
          <section className="bg-[#111111] border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Globe size={22} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Preferencias</h3>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#080808] border border-zinc-800/50 rounded-3xl">
                <div>
                  <h4 className="text-white font-bold mb-1">Idioma del Interfaz</h4>
                  <p className="text-zinc-500 text-xs">Selecciona tu idioma preferido para navegar.</p>
                </div>
                <div className="flex gap-2">
                  {[
                    { code: "es", label: "ESP" },
                    { code: "en", label: "ENG" },
                    { code: "fr", label: "FRA" }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${language === l.code ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#080808] border border-zinc-800/50 rounded-3xl">
                <div>
                  <h4 className="text-white font-bold mb-1">Notificaciones</h4>
                  <p className="text-zinc-500 text-xs">Recibe avisos de nuevas ofertas y chollos.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Info */}
          <section className="bg-[#111111] border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Shield size={22} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Seguridad y Ayuda</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="#" 
                className="flex items-center justify-between p-5 bg-[#080808] border border-zinc-800/50 rounded-3xl hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center gap-3 text-zinc-300 group-hover:text-white">
                  <AlertTriangle size={20} className="text-zinc-500" />
                  <span className="font-bold">Cambiar contraseña</span>
                </div>
                <ExternalLink size={16} className="text-zinc-700" />
              </a>
              <a 
                href="https://t.me/HacooLinksElite" 
                target="_blank"
                className="flex items-center justify-between p-5 bg-[#080808] border border-zinc-800/50 rounded-3xl hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center gap-3 text-zinc-300 group-hover:text-white">
                  <Globe size={20} className="text-zinc-500" />
                  <span className="font-bold">Comunidad Telegram</span>
                </div>
                <ExternalLink size={16} className="text-zinc-700" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
