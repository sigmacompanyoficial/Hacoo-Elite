"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Tag, Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}


export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      addToCart(product);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-[#141416] border border-[#27272a] rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors shadow-xl"
    >
      <Link href={`/producto/${product.slug}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-[#111111]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={priority}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isExclusive && (
              <span className="bg-white text-black text-[10px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                <Tag size={10} />
                Exclusivo
              </span>
            )}
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-lg">
              -{discount}%
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col">
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">
                {product.category}
              </span>
              <span className="text-zinc-500 text-[9px] font-bold uppercase">
                {product.brand}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-yellow-500 text-yellow-500" />
              <span className="text-xs text-zinc-400 font-bold">{product.rating}</span>
            </div>
          </div>

          <h3 className="text-white font-bold text-base leading-tight mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-white text-xl font-black">
              {product.price.toFixed(2)}€
            </span>
            <span className="text-zinc-500 text-sm line-through font-medium">
              {product.originalPrice.toFixed(2)}€
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300 ${
              user 
                ? "bg-zinc-800/50 border border-zinc-700/50 text-white hover:bg-blue-600 hover:border-blue-500" 
                : "bg-zinc-900/50 border border-zinc-800 text-zinc-600 cursor-default"
            }`}
          >
            {user ? (
              <>
                <Star size={14} className="fill-current" />
                <span>Guardar favorito</span>
              </>
            ) : (
              <>
                <span>Ver detalles</span>
                <ExternalLink size={14} />
              </>
            )}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
