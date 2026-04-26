"use client";

import { useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Loader2, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ShoppingBag,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!name) throw new Error("Por favor, introduce tu nombre");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      router.push("/");
    } catch (err: any) {
      let message = "Ocurrió un error inesperado";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = "Credenciales incorrectas";
      } else if (err.code === 'auth/email-already-in-use') {
        message = "Este correo ya está registrado";
      } else if (err.code === 'auth/weak-password') {
        message = "La contraseña debe tener al menos 6 caracteres";
      } else {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden px-4 py-20 selection:bg-blue-500/30">
      {/* Dynamic Background Grid & Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/[0.03] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/[0.03] blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
      </div>
      
      <div className="w-full max-w-[460px] relative z-10">
        {/* Minimalist Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <Link href="/" className="group flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center shadow-2xl group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-all duration-500">
              <ShoppingBag className="text-blue-500 group-hover:scale-110 transition-transform duration-500" size={24} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-white tracking-tight">HacooElite</span>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mt-1">Premium Deals</span>
            </div>
          </Link>
        </motion.div>

        {/* Premium Auth Card */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/40 backdrop-blur-3xl border border-white/[0.06] rounded-[2.5rem] p-10 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]"
        >
          <div className="text-center mb-10">
            <motion.h1 
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight"
            >
              {isLogin ? "Bienvenido de nuevo" : "Crea una cuenta"}
            </motion.h1>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
              {isLogin 
                ? "Accede a tu panel y gestiona tus chollos favoritos" 
                : "Únete a +10,000 usuarios ahorrando cada día"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-500/[0.03] border border-red-500/20 text-red-400 text-xs font-semibold p-4 rounded-2xl mb-8 flex items-center gap-3 backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={16} />
                </div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form id="auth-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="input-group">
                      <label className="input-label">Nombre completo</label>
                      <div className="input-wrapper">
                        <UserIcon size={18} className="icon" />
                        <input
                          type="text"
                          placeholder="Tu nombre"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="input-group">
                <label className="input-label">Email</label>
                <div className="input-wrapper">
                  <Mail size={18} className="icon" />
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="flex justify-between items-center mb-2.5 ml-1">
                  <label className="input-label mb-0">Contraseña</label>
                  {isLogin && (
                    <button type="button" className="text-[10px] font-bold text-blue-500/60 hover:text-blue-400 transition-colors uppercase tracking-widest">
                      ¿Olvidaste?
                    </button>
                  )}
                </div>
                <div className="input-wrapper">
                  <Lock size={18} className="icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: '3.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors p-1.5 z-10"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="form-footer">
            <button
              type="submit"
              form="auth-form"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="uppercase tracking-[0.1em] text-sm">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</span>
                  <ChevronRight size={18} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="footer-text">
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="ml-2 text-white hover:text-blue-400 transition-colors font-bold underline underline-offset-4 decoration-blue-500/30"
              >
                {isLogin ? "Regístrate ahora" : "Inicia sesión"}
              </button>
            </div>

            <div className="divider">
              <span>o continuar con</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn btn-google w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-lg active:scale-[0.98]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <Link 
              href="/" 
              className="footer-link-secondary mt-2"
            >
              <ArrowLeft size={14} />
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
