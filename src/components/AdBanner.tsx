"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AdBanner() {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !adContainerRef.current) return;

    const container = adContainerRef.current;
    const isMobile = window.innerWidth < 768;
    
    // Exact keys and dimensions from user
    const key = isMobile ? "534c2749a1e80c53680bdb612dd9827e" : "c889558826c41418bf9a7d083a6f739f";
    const height = isMobile ? 50 : 90;
    const width = isMobile ? 320 : 728;

    // Reset container
    container.innerHTML = "";

    // Set atOptions on window object as required by Adsterra
    (window as any).atOptions = {
      'key' : key,
      'format' : 'iframe',
      'height' : height,
      'width' : width,
      'params' : {}
    };

    // Create and append the invoke script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    script.async = true;

    // Optional: Add some error handling to script loading
    script.onerror = () => {
      console.warn(`Could not load ad for key: ${key}. This is common on localhost or with ad-blockers.`);
    };

    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [pathname]);

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full bg-[#050505] border-y border-zinc-900/30 overflow-hidden">
      <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-4">Publicidad</p>
      <div 
        ref={adContainerRef} 
        className="min-h-[50px] md:min-h-[90px] w-full flex justify-center items-center"
      />
    </div>
  );
}
