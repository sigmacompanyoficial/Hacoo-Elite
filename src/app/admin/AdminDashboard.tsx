"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  Search,
  ExternalLink,
  Plus,
  Database
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 53, // Mock based on data
    totalClicks: 1240,
    activeAdmins: 1
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, count, error } = await supabase
          .from("profiles")
          .select("*", { count: 'exact' })
          .limit(5)
          .order('id', { ascending: false });

        if (data && !error) {
          setRecentUsers(data.map(u => ({
            id: u.id,
            displayName: u.display_name,
            email: u.email,
            photoURL: u.photo_url,
            role: u.role
          })));
          setStats(prev => ({ ...prev, totalUsers: count || 0 }));
        }
      } catch (err) {
        console.error("Error fetching admin stats", err);
      }
    };
    fetchStats();
  }, []);

  if (profile?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080808] p-6">
        <div className="bg-zinc-900/40 border border-red-500/20 p-12 rounded-[2.5rem] text-center max-w-md">
          <AlertTriangle className="text-red-500 mx-auto mb-6" size={48} />
          <h1 className="text-2xl font-black text-white uppercase italic mb-4">Acceso Denegado</h1>
          <p className="text-zinc-500 mb-8">No tienes permisos de administrador para ver este panel. Contacta con el equipo técnico de Hacoo Elite.</p>
          <a href="/" className="inline-block bg-white text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
      >
        <div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic leading-none">
            Panel <span className="text-blue-500">Admin</span>
          </h1>
          <p className="text-zinc-500 text-lg">Control total sobre la plataforma Hacoo Elite.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest">
          <Plus size={20} />
          Añadir Producto
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Usuarios Totales", value: stats.totalUsers, icon: Users, color: "blue" },
          { label: "Productos Activos", value: stats.totalProducts, icon: ShoppingBag, color: "emerald" },
          { label: "Clics en Enlaces", value: stats.totalClicks, icon: TrendingUp, color: "orange" },
          { label: "Admins Activos", value: stats.activeAdmins, icon: ShieldCheck, color: "purple" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] p-8 rounded-3xl"
          >
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Users Table */}
        <div className="lg:col-span-8 bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white uppercase italic">Usuarios Recientes</h3>
            <button className="text-blue-500 text-xs font-black uppercase tracking-widest hover:underline">Ver todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="pb-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Usuario</th>
                  <th className="pb-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Email</th>
                  <th className="pb-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Rol</th>
                  <th className="pb-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentUsers.map((u) => (
                  <tr key={u.id} className="group">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                          {u.photoURL && <img src={u.photoURL} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <span className="text-white font-bold text-sm">{u.displayName || "Sin nombre"}</span>
                      </div>
                    </td>
                    <td className="py-4 text-zinc-500 text-sm">{u.email}</td>
                    <td className="py-4">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${u.role === 'admin' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-zinc-800 text-zinc-500'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Quick Info */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-8">
            <h3 className="text-lg font-black text-white uppercase italic mb-6">Estado del Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">API Supabase</span>
                <span className="text-emerald-500 text-xs font-black uppercase tracking-widest">Activo</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">PostgreSQL DB</span>
                <span className="text-blue-500 text-xs font-black uppercase tracking-widest">Conectado</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-600/20">
            <h3 className="text-white font-black uppercase italic mb-2">Ayuda Técnica</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">¿Necesitas añadir más administradores? Debes hacerlo desde la consola de Supabase modificando el campo 'role' en la tabla 'profiles'.</p>
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank"
              className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors"
            >
              Consola Supabase
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
