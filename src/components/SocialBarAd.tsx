"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SocialBarAd() {
  const pathname = usePathname();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//pl26141334.highperformanceformat.com/56/67/7a/56677aa42d45b14e542566c759086f68.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // It's hard to clean up these types of scripts sometimes, but we try
      try {
        const ad = document.getElementById("socialbar-ad");
        if (ad) ad.remove();
      } catch (e) {}
    };
  }, [pathname]);

  return null;
}
