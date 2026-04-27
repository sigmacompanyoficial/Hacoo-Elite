import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNavbar";
import PromoToast from "@/components/PromoToast";
import AdBanner from "@/components/AdBanner";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import SocialBarAd from "@/components/SocialBarAd";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HacooElite — Ofertas Exclusivas y Cupones de Descuento",
  description:
    "Descubre los mejores productos de Hacoo con hasta un 90% de descuento. Usa el código POLE14 para un 15% extra. +100 enlaces diarios en nuestro canal de Telegram.",
  icons: {
    icon: "/LOGO.png",
    apple: "/LOGO.png",
  },
  keywords: [
    "Hacoo",
    "ofertas",
    "cupones",
    "descuentos",
    "POLE14",
    "afiliados",
  ],
  openGraph: {
    title: "HacooElite — Ofertas Exclusivas",
    description:
      "Los mejores productos de Hacoo al precio más bajo. Código POLE14: 15% OFF.",
    type: "website",
    images: ["/LOGO.png"],
  },
  verification: {
    google: "2jHpnfOH-dy0mc6c6VkefIaXKW1YkmFfvC5kVyKylMs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" className={`${inter.variable}`} suppressHydrationWarning={true}>
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <LanguageProvider>
              <ThemeProvider>
                <div className="main-wrapper">
                  <Header />
                  <main id="main-content" className="pb-24 md:pb-0">
                    {children}
                  </main>
                  <AdBanner />
                  <Footer />
                  <MobileNavbar />
                  <PromoToast />
                </div>
              </ThemeProvider>
            </LanguageProvider>
          </CartProvider>
        </AuthProvider>
        <Analytics />
        <SocialBarAd />
        <CookieConsent />
      </body>
    </html>
  );
}
