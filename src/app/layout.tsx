import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNavbar";
import PromoToast from "@/components/PromoToast";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HacooElite — Los Mejores Enlaces y Cupones Hacoo 2026",
    template: "%s | Hacoo Elite"
  },
  description:
    "Descubre los mejores productos de Hacoo con enlaces actualizados diariamente. Cupones de descuento exclusivos, ofertas flash y guía de compra para Hacoo. Usa el código POLE14 para un 15% extra.",
  metadataBase: new URL("https://hacoo-elite.vercel.app/"), // Ajustar si el dominio es diferente
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/LOGO.png",
  },
  keywords: [
    "Hacoo",
    "Hacoo links",
    "Hacoo elite",
    "enlaces Hacoo",
    "cupones Hacoo",
    "descuentos Hacoo",
    "Hacoo 2026",
    "Hacoo España",
    "POLE14",
    "Hacoo app links",
  ],
  authors: [{ name: "Hacoo Elite Team" }],
  creator: "Hacoo Elite",
  openGraph: {
    title: "HacooElite — Los Mejores Enlaces y Cupones Hacoo",
    description: "Los mejores productos de Hacoo al precio más bajo. Actualizado diariamente con nuevos enlaces y cupones exclusivos.",
    url: "https://hacooelite.com",
    siteName: "Hacoo Elite",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/LOGO.png",
        width: 1200,
        height: 630,
        alt: "Hacoo Elite Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HacooElite — Enlaces y Cupones Hacoo",
    description: "Accede a los mejores links de Hacoo y ahorra con nuestros cupones exclusivos.",
    images: ["/LOGO.png"],
  },
  verification: {
    google: "2jHpnfOH-dy0mc6c6VkefIaXKW1YkmFfvC5kVyKylMs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hacoo Elite",
  "url": "https://hacooelite.com",
  "description": "Plataforma líder en enlaces y cupones para Hacoo.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hacooelite.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" className={`${inter.variable}`} suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

                  <Footer />
                  <MobileNavbar />
                  <PromoToast />
                </div>
              </ThemeProvider>
            </LanguageProvider>
          </CartProvider>
        </AuthProvider>
        <Analytics />

        <CookieConsent />
      </body>
    </html>
  );
}
