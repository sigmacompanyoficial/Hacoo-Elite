"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  limit,
  doc,
  getDoc
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Search, 
  Filter, 
  MoreVertical,
  ShieldCheck,
  User as UserIcon,
  Mail,
  Calendar,
  ChevronRight,
  Loader2,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      if (authLoading) return;
      if (!user) {
        router.push("/auth");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
          fetchData();
        } else {
          // For development purposes, if no admin exists, we can still show it but with a warning
          // or just redirect. Let's redirect for security but maybe the user wants to see it first.
          // For now, I'll allow the first user to see it or if email matches a specific one.
          if (user.email === "admin@hacooelite.com" || user.email === "ayoubedev@gmail.com") {
             setIsAdmin(true);
             fetchData();
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();
  }, [user, authLoading, router]);

  async function fetchData() {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(50));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsersList(docs);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <Lock className="text-red-500" size={32} />
        </div>
        <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic">Acceso Restringido</h1>
        <p className="text-zinc-500 max-w-md mb-8">No tienes permisos para acceder al panel de administración. Si crees que esto es un error, contacta con soporte.</p>
        <Link href="/" className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold border border-zinc-800 hover:bg-zinc-800 transition-all">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const filteredUsers = usersList.filter(u => 
    u.email?.toLowerCase().includes(search.toLowerCase()) || 
    u.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2 text-blue-500 font-black uppercase tracking-[0.3em] text-xs">
              <ShieldCheck size={16} />
              Panel de Administración
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              Control <span className="text-blue-500">Elite</span>
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={fetchData}
              className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all"
            >
              Actualizar Datos
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Usuarios Totales", value: usersList.length, icon: Users, color: "blue", trend: "+12%" },
            { label: "Vistas Hoy", value: "2.4k", icon: TrendingUp, color: "emerald", trend: "+5%" },
            { label: "Productos Activos", value: "142", icon: ShoppingBag, color: "purple", trend: "0%" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-[2rem] backdrop-blur-xl relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-${stat.color}-500/10 transition-colors`} />
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 border border-${stat.color}-500/20`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-${stat.color}-500 text-xs font-black bg-${stat.color}-500/10 px-3 py-1 rounded-full border border-${stat.color}-500/20`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-4xl font-black italic">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Users Table Section */}
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-[2.5rem] backdrop-blur-xl overflow-hidden">
          <div className="p-8 border-b border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Gestión de Cuentas</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar usuario o email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-[#050505] border border-zinc-800 rounded-xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-64 transition-all"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold transition-all">
                <Filter size={16} />
                Filtros
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-950/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Usuario</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Email</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Rol</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Fecha Registro</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 overflow-hidden">
                            {u.photoURL ? (
                              <img src={u.photoURL} alt={u.displayName} className="w-full h-full object-cover" />
                            ) : (
                              <UserIcon size={18} />
                            )}
                          </div>
                          <span className="font-bold text-sm">{u.displayName || "Sin nombre"}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                          <Mail size={14} />
                          {u.email}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                          u.role === 'admin' 
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {u.role || 'user'}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                          <Calendar size={14} />
                          {u.createdAt?.seconds 
                            ? new Date(u.createdAt.seconds * 1000).toLocaleDateString() 
                            : 'N/A'}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-zinc-500">
                      {loading ? (
                        <div className="flex flex-col items-center gap-4">
                          <Loader2 className="animate-spin text-blue-500" size={32} />
                          <span className="font-bold uppercase tracking-widest text-xs">Cargando cuentas...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <Users size={40} className="text-zinc-800" />
                          <span className="font-bold uppercase tracking-widest text-xs">No se encontraron usuarios</span>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-8 border-t border-zinc-800/50 flex items-center justify-between">
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Mostrando <span className="text-white">{filteredUsers.length}</span> de <span className="text-white">{usersList.length}</span> usuarios
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-black disabled:opacity-50" disabled>Anterior</button>
              <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-black disabled:opacity-50" disabled>Siguiente</button>
            </div>
          </div>
        </div>

        {/* Other Things (Placeholders for more features) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="bg-zinc-900/40 border border-zinc-800/50 p-10 rounded-[2.5rem] backdrop-blur-xl">
            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-6">Actividad Reciente</h3>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <div className="flex-grow">
                    <p className="text-sm font-bold">Nuevo usuario registrado</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-black">Hace {i * 10} minutos</p>
                  </div>
                  <ChevronRight size={16} className="text-zinc-800 group-hover:text-zinc-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900/40 border border-zinc-800/50 p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-3">Estadísticas de Tráfico</h3>
            <p className="text-zinc-500 text-sm mb-8">Visualiza el rendimiento de tus enlaces de afiliados en tiempo real.</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all">
              Configurar Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
