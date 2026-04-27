"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SocialBarAd() {
  const pathname = usePathname();

  useEffect(() => {
    // Only load the script after a short delay or user interaction
    // to prevent aggressive popunders on page load/scroll
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//pl26141334.highperformanceformat.com/56/67/7a/56677aa42d45b14e542566c759086f68.js";
      script.async = true;
      script.id = "socialbar-script";

      document.body.appendChild(script);
    }, 2000); // 2 second delay

    return () => {
      clearTimeout(timer);
      try {
        const script = document.getElementById("socialbar-script");
        if (script) script.remove();
        
        // Remove the actual bar if possible
        const ad = document.getElementById("socialbar-ad");
        if (ad) ad.remove();
      } catch (e) {}
    };
  }, [pathname]);

  return null;
}
