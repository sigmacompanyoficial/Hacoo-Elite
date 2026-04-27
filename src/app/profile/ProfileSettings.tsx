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
  ChevronRight,
  LogOut,
  AlertTriangle,
  Settings,
  Lock,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

export default function ProfileSettings() {
  const { user, profile, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  if (!user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    // Sync to profiles table
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: (e.target as any).display_name.value
        })
        .eq("id", user.id);
      
      if (error) throw error;
      setSuccessMsg("Perfil actualizado correctamente");
    } catch (err: any) {
      setSuccessMsg("Error al actualizar");
    } finally {
      setIsUpdating(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });
      if (error) throw error;
      setSuccessMsg("Enlace de restablecimiento enviado");
    } catch (err: any) {
      setSuccessMsg("Error al enviar enlace");
    } finally {
      setIsUpdating(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      setSuccessMsg("Confirma el cambio en tu nuevo email");
      setShowEmailDialog(false);
    } catch (err: any) {
      setSuccessMsg(err.message);
    } finally {
      setIsUpdating(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("¿ESTÁS SEGURO? Esta acción es irreversible y perderás todos tus datos.");
    if (!confirm) return;
    
    setIsUpdating(true);
    try {
      // Note: Supabase doesn't allow deleting self directly via client SDK easily for security
      // Usually requires an Edge Function or RPC, but we can try to sign out and tell user to contact support
      // or if RLS allows, delete from profiles.
      const { error } = await supabase.from("profiles").delete().eq("id", user.id);
      if (error) throw error;
      await logout();
      window.location.href = "/";
    } catch (err: any) {
      setSuccessMsg("Error al eliminar cuenta");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/[0.04] blur-[140px] pointer-events-none rounded-full z-0" />
      
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 w-full"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 border border-blue-500/20 shadow-lg shadow-blue-500/5">
            Security & Profile
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.8]">
            TU <span className="text-blue-500">PERFIL</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto leading-relaxed">Configura tu cuenta Elite y mantén tus datos protegidos.</p>
        </motion.div>

        <div className="w-full space-y-24 px-6 pb-24">
          {/* Section 1: Top Profile Bubble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/20 backdrop-blur-3xl border border-white/[0.05] rounded-[4rem] p-12 md:p-16 text-center shadow-2xl flex flex-col items-center"
          >
            <div className="relative group mb-10">
              <div className="w-44 h-44 rounded-full bg-[#080808] border-[8px] border-zinc-900/80 overflow-hidden flex items-center justify-center text-zinc-500 shadow-2xl transition-all duration-700 group-hover:border-blue-500/40 group-hover:scale-[1.05]">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt={profile.displayName || ""} className="w-full h-full object-cover" />
                ) : (
                  <User size={80} className="text-zinc-800" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-4 border-[#0d0d0d] hover:bg-blue-500 hover:rotate-90 transition-all shadow-xl">
                <Camera size={22} />
              </button>
            </div>
            
            <h2 className="text-4xl font-black text-white mb-3 uppercase tracking-tighter italic">{profile?.displayName || "USUARIO ÉLITE"}</h2>
            <div className="flex items-center gap-3 bg-zinc-800/30 px-6 py-2 rounded-full border border-white/[0.03] mb-12">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{user.email}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
              <button className="h-20 px-8 bg-zinc-800/20 hover:bg-zinc-800/40 text-white rounded-[2rem] font-black text-sm tracking-widest flex items-center justify-center gap-4 transition-all border border-white/[0.02]">
                MIS FAVORITOS
                <Shield size={20} className="text-blue-500" />
              </button>
              <button 
                onClick={() => logout()}
                className="h-20 px-8 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-[2rem] font-black text-sm tracking-widest flex items-center justify-center gap-4 transition-all border border-red-500/10"
              >
                CERRAR SESIÓN
                <LogOut size={20} />
              </button>
            </div>
          </motion.div>

          {/* Section 2: Personal Data Bubble - HEAVILY SPACED */}
          <section className="w-full pt-12">
            <div className="bg-zinc-900/20 backdrop-blur-3xl border border-white/[0.05] rounded-[4rem] p-12 md:p-20 shadow-2xl flex flex-col items-center">
              <div className="text-center mb-16">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto mb-6">
                  <Settings size={32} />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Datos Personales</h3>
              </div>

              <form onSubmit={handleUpdateProfile} className="w-full space-y-12 flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                  <div className="space-y-4 w-full">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] px-2 text-center w-full block">Nombre Público</label>
                    <div className="relative group w-full">
                      <User className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        name="display_name"
                        type="text" 
                        defaultValue={profile?.displayName || ""}
                        className="w-full h-20 bg-[#080808] border border-zinc-800/50 rounded-3xl pl-20 pr-8 text-white font-black focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-center"
                        placeholder="Tu nombre de Élite"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 w-full">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] px-2 text-center w-full block">Email Actual</label>
                    <div className="relative w-full">
                      <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-800" size={20} />
                      <input 
                        type="email" 
                        value={user.email || ""}
                        disabled
                        className="w-full h-20 bg-[#080808]/50 border border-transparent rounded-3xl pl-20 pr-8 text-zinc-700 cursor-not-allowed font-black text-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-10 w-full pt-8">
                  <AnimatePresence>
                    {successMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-black text-emerald-500 bg-emerald-500/5 px-8 py-4 rounded-full border border-emerald-500/10 uppercase tracking-widest"
                      >
                        {successMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button 
                    type="submit"
                    disabled={isUpdating}
                    className="w-full h-24 bg-white text-black hover:bg-zinc-200 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-2xl"
                  >
                    <Save size={28} />
                    {isUpdating ? "PROCESANDO..." : "GUARDAR CAMBIOS"}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Section 3: Advanced Options Bubble */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full pt-12">
            {/* Security Actions */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900/20 backdrop-blur-3xl border border-white/[0.05] rounded-[4rem] p-14 flex flex-col items-center text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-orange-500/10 flex items-center justify-center text-orange-500 mb-10">
                <Lock size={32} />
              </div>
              <h4 className="text-2xl font-black text-white mb-10 uppercase italic">Seguridad</h4>
              
              <div className="w-full space-y-6">
                <button 
                  onClick={handlePasswordReset}
                  className="w-full h-20 bg-[#080808] hover:bg-zinc-900 border border-zinc-800/80 text-white rounded-3xl font-black text-xs tracking-widest flex items-center justify-center gap-4 transition-all"
                >
                  <RefreshCw size={20} className="text-orange-500" />
                  RESETEAR CONTRASEÑA
                </button>
                <button 
                  onClick={() => setShowEmailDialog(!showEmailDialog)}
                  className="w-full h-20 bg-[#080808] hover:bg-zinc-900 border border-zinc-800/80 text-white rounded-3xl font-black text-xs tracking-widest flex items-center justify-center gap-4 transition-all"
                >
                  <Mail size={20} className="text-blue-500" />
                  CAMBIAR CORREO
                </button>
                
                <AnimatePresence>
                  {showEmailDialog && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-4"
                    >
                      <input 
                        type="email"
                        placeholder="Nuevo email..."
                        className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 text-white text-center font-bold"
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <button 
                        onClick={handleChangeEmail}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
                      >
                        CONFIRMAR NUEVO EMAIL
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Account Management */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900/20 backdrop-blur-3xl border border-white/[0.05] rounded-[4rem] p-14 flex flex-col items-center text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-red-500/10 flex items-center justify-center text-red-500 mb-10">
                <AlertTriangle size={32} />
              </div>
              <h4 className="text-2xl font-black text-white mb-10 uppercase italic">Zona Peligrosa</h4>
              
              <div className="w-full space-y-6">
                <div className="bg-[#080808] p-8 rounded-3xl border border-red-500/10 mb-6">
                  <p className="text-zinc-600 text-xs font-bold leading-relaxed mb-8">
                    Si eliminas tu cuenta, se borrarán todos tus pedidos guardados, favoritos y configuración personal de forma inmediata.
                  </p>
                  <button 
                    onClick={handleDeleteAccount}
                    className="w-full h-20 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-3xl font-black text-xs tracking-widest flex items-center justify-center gap-4 transition-all"
                  >
                    <Trash2 size={20} />
                    ELIMINAR MI CUENTA
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
