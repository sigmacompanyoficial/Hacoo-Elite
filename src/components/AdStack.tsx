"use client";

import AdBanner from "./AdBanner";

export default function AdStack() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <AdBanner />
      <AdBanner />
      <AdBanner />
      <AdBanner />
      <AdBanner />
    </div>
  );
}
