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
  Database,
  Activity,
  History,
  Clock,
  Filter,
  MoreVertical,
  Mail,
  Calendar,
  Lock,
  Globe,
  Settings,
  Cpu,
  BarChart3,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { products } from "@/data/products";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: products.length,
    totalClicks: 1240,
    activeAdmins: 0,
    systemHealth: 98.4
  });
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const { data, count, error } = await supabase
        .from("profiles")
        .select("*", { count: 'exact' })
        .order('id', { ascending: false });

      if (data && !error) {
        setAllUsers(data);
        setStats(prev => ({ 
          ...prev, 
          totalUsers: count || 0,
          activeAdmins: data.filter(u => u.role === 'admin').length
        }));
      }
    } catch (err) {
      console.error("Error fetching admin stats", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdminRole = async (userId: string, currentRole: string) => {
    setIsUpdating(userId);
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;
      await fetchUsers();
    } catch (err: any) {
      alert("Error al actualizar rol: " + err.message);
    } finally {
      setIsUpdating(null);
    }
  };

  if (profile?.role !== "admin") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/40 border border-red-500/20 p-12 rounded-[3rem] text-center max-w-md backdrop-blur-2xl shadow-2xl shadow-red-500/5"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <AlertTriangle className="text-red-500 animate-pulse" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white uppercase italic mb-4 tracking-tighter">Acceso Denegado</h1>
          <p className="text-zinc-500 mb-8 leading-relaxed font-medium">No tienes permisos de administrador para ver este panel. Contacta con el equipo técnico de Hacoo Elite si crees que esto es un error.</p>
          <a href="/" className="inline-flex bg-white text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.1em] hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
            Volver al inicio
          </a>
        </motion.div>
      </div>
    );
  }

  const filteredUsers = allUsers.filter(u => 
    u.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topProducts = [...products]
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 5);

  const systemLogs = [
    { id: 1, event: "Backup automático completado", time: "Hace 2 horas", type: "success" },
    { id: 2, event: "Nuevo usuario registrado: Maria G.", time: "Hace 3 horas", type: "info" },
    { id: 3, event: "Actualización de catálogo exitosa", time: "Hace 5 horas", type: "success" },
    { id: 4, event: "Intento de login fallido (IP: 192.168.1.1)", time: "Hace 12 horas", type: "warning" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-md">
                <Cpu size={14} className="text-blue-400" />
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center backdrop-blur-md">
                <Globe size={14} className="text-emerald-400" />
              </div>
            </div>
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.25em]">
              Central Intelligence Dashboard v3.0
            </span>
          </div>
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
              Admin <span className="text-blue-500">Core</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium mt-4 max-w-2xl leading-relaxed">
              Sistema de control maestro para <span className="text-white">Hacoo Elite</span>. Gestiona usuarios, analiza el rendimiento y supervisa la base de datos en tiempo real.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-3 transition-all uppercase tracking-widest backdrop-blur-xl group">
            <Database size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
            Snapshot DB
          </button>
          <button className="flex-1 xl:flex-none bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-600/20 uppercase tracking-widest active:scale-95">
            <Settings size={18} className="animate-spin-slow" />
            Configuración
          </button>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-zinc-900/50 border border-white/5 rounded-2xl mb-10 w-fit backdrop-blur-xl">
        {[
          { id: "overview", label: "Vista General", icon: BarChart3 },
          { id: "users", label: "Usuarios", icon: Users },
          { id: "products", label: "Rendimiento", icon: ShoppingBag },
          { id: "system", label: "Sistema", icon: Cpu },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: "Usuarios Activos", value: stats.totalUsers, icon: Users, color: "blue", trend: "+12%" },
                    { label: "Catálogo Total", value: stats.totalProducts, icon: ShoppingBag, color: "emerald", trend: "Estable" },
                    { label: "Interacción 24h", value: stats.totalClicks, icon: TrendingUp, color: "orange", trend: "+8%" },
                    { label: "Salud del Sistema", value: `${stats.systemHealth}%`, icon: Activity, color: "purple", trend: "Óptimo" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] p-8 rounded-[2rem] group hover:border-blue-500/20 transition-all relative overflow-hidden shadow-2xl shadow-black/20"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <stat.icon size={48} className={`text-${stat.color}-500/10`} />
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                          <stat.icon size={28} />
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg bg-${stat.color}-500/5 text-${stat.color}-400 border border-${stat.color}-500/10`}>
                          {stat.trend}
                        </span>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                        <p className="text-5xl font-black text-white tracking-tighter italic">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Top Products detailed list */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/20">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Rendimiento de Productos</h3>
                      <p className="text-zinc-500 text-sm mt-1">Los artículos con mayor tracción en el catálogo.</p>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-zinc-400">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {topProducts.map((product, idx) => (
                      <div key={product.id} className="group bg-black/20 hover:bg-white/5 border border-white/[0.03] p-4 rounded-2xl transition-all flex items-center gap-6">
                        <div className="text-zinc-700 font-black italic text-2xl w-8 text-center">{idx + 1}</div>
                        <div className="w-14 h-14 rounded-xl bg-zinc-800 overflow-hidden border border-white/5 shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="text-white font-bold truncate text-sm uppercase tracking-wide">{product.name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-zinc-500 text-[10px] font-black uppercase">{product.category}</span>
                            <span className="text-blue-500 text-[10px] font-black uppercase flex items-center gap-1">
                              <Star size={10} fill="currentColor" /> {product.reviews} Reseñas
                            </span>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-white font-black text-lg italic">{product.price.toFixed(2)}€</p>
                          <p className="text-zinc-500 text-[10px] font-black uppercase">Precio Activo</p>
                        </div>
                        <a href={product.affiliateUrl} target="_blank" className="p-3 bg-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:bg-blue-600 transition-all active:scale-90">
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Gestión de Usuarios</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-zinc-500 text-sm">Control total sobre accesos y roles de la plataforma.</p>
                        <span className="h-4 w-px bg-white/10 hidden sm:block"></span>
                        <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
                          <ShieldCheck size={12} /> {stats.activeAdmins} Admins
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input 
                        type="text" 
                        placeholder="BUSCAR POR NOMBRE O EMAIL..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-2xl pl-12 pr-6 py-4 text-xs font-black text-white focus:outline-none w-full md:w-80 transition-all uppercase tracking-widest backdrop-blur-md"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/[0.04]">
                          <th className="pb-6 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">Perfil</th>
                          <th className="pb-6 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">Contacto</th>
                          <th className="pb-6 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">Rol / Estatus</th>
                          <th className="pb-6 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] text-right">Control Maestro</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                          <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-800 overflow-hidden border border-white/5 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                  {u.photo_url ? (
                                    <img src={u.photo_url} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 font-black">
                                      {u.display_name?.charAt(0) || "U"}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <span className="text-white font-black text-sm uppercase tracking-wide block">{u.display_name || "Usuario Anónimo"}</span>
                                  <span className="text-zinc-600 text-[10px] font-bold mt-1 block">ID: {u.id.substring(0, 8)}...</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                                  <Mail size={12} className="text-zinc-600" />
                                  {u.email}
                                </div>
                                <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-bold">
                                  <Calendar size={12} />
                                  Registrado: {new Date(u.created_at || Date.now()).toLocaleDateString('es-ES')}
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <div className="flex flex-col items-start gap-2">
                                <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-lg border flex items-center gap-2 ${
                                  u.role === 'admin' 
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                    : 'bg-zinc-800/50 text-zinc-500 border-white/5'
                                }`}>
                                  {u.role === 'admin' && <ShieldCheck size={12} />}
                                  {u.role}
                                </span>
                                <span className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  Activo
                                </span>
                              </div>
                            </td>
                            <td className="py-6 text-right">
                              <button 
                                onClick={() => toggleAdminRole(u.id, u.role)}
                                disabled={isUpdating === u.id}
                                className={`text-[10px] font-black uppercase px-6 py-3 rounded-xl transition-all ${
                                  u.role === 'admin' 
                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white shadow-lg shadow-red-600/10' 
                                    : 'bg-blue-500/10 text-blue-500 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600/10'
                                } disabled:opacity-50 active:scale-95`}
                              >
                                {isUpdating === u.id ? (
                                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto"></div>
                                ) : (
                                  u.role === 'admin' ? "Quitar Privilegios" : "Promover a Admin"
                                )}
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={4} className="py-20 text-center">
                              <Search size={48} className="mx-auto text-zinc-800 mb-4" />
                              <p className="text-zinc-500 font-black uppercase tracking-widest text-sm">No se encontraron usuarios con ese criterio</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar / Auxiliary Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats Sidebar Card */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2rem] p-8 shadow-2xl shadow-black/20">
            <h3 className="text-lg font-black text-white uppercase italic mb-6 flex items-center gap-3">
              <Activity className="text-blue-500" size={18} />
              Estado del Servidor
            </h3>
            <div className="space-y-6">
              {[
                { label: "CPU Usage", value: 24, color: "blue" },
                { label: "Memory", value: 68, color: "purple" },
                { label: "Database Latency", value: 12, color: "emerald", suffix: "ms" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    <span className={`text-${item.color}-400 text-xs font-black`}>{item.value}{item.suffix || "%"}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full bg-${item.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-5 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1 text-center">Próxima Optimización</p>
              <div className="flex items-center justify-center gap-2 text-white font-black italic text-xl">
                <Clock size={18} />
                04:22:15
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-[2rem] p-8 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-white uppercase italic flex items-center gap-3">
                <History className="text-emerald-500" size={18} />
                Registros de Eventos
              </h3>
              <button className="text-zinc-600 hover:text-white transition-colors">
                <Filter size={16} />
              </button>
            </div>
            <div className="space-y-6">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex gap-4 group">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    log.type === 'success' ? 'bg-emerald-500' : 
                    log.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  } group-hover:scale-150 transition-transform`} />
                  <div>
                    <p className="text-white text-xs font-bold leading-tight group-hover:text-blue-400 transition-colors">{log.event}</p>
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-tighter mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 rounded-xl text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
              Ver Historial Completo
            </button>
          </div>

          {/* Quick Access Guide */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/20 rounded-full blur-3xl" />
            
            <h3 className="text-white font-black text-xl uppercase italic mb-4 relative z-10">Control Externo</h3>
            <p className="text-blue-100/70 text-xs font-medium mb-8 leading-relaxed relative z-10 uppercase tracking-wide">
              Si necesitas realizar operaciones masivas o cambios de esquema, utiliza la consola oficial de Supabase.
            </p>
            
            <div className="space-y-3 relative z-10">
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank"
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all active:scale-95"
              >
                Consola Principal
                <ExternalLink size={14} />
              </a>
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-black uppercase">
                  <Lock size={12} /> SSL Secure
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-black uppercase">
                  <ShieldCheck size={12} /> Trusted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}
