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
    const key = isMobile ? "534c2749a1e80c53680bdb612dd9827e" : "c889558826c41418bf9a7d083a6f739f";
    const height = isMobile ? 50 : 90;
    const width = isMobile ? 320 : 728;

    // Clear previous ad if any
    container.innerHTML = "";

    const scriptConfig = document.createElement("script");
    scriptConfig.type = "text/javascript";
    scriptConfig.innerHTML = `
      atOptions = {
        'key' : '${key}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const scriptInvoke = document.createElement("script");
    scriptInvoke.type = "text/javascript";
    scriptInvoke.src = `https://www.highperformanceformat.com/${key}/invoke.js`;

    container.appendChild(scriptConfig);
    container.appendChild(scriptInvoke);
  }, [pathname]);

  return (
    <div className="flex justify-center items-center py-6 w-full bg-[#080808] overflow-hidden">
      <div 
        ref={adContainerRef} 
        className="min-h-[50px] md:min-h-[90px] w-full flex justify-center"
      />
    </div>
  );
}
