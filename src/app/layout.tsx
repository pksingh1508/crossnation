import type { Metadata } from "next";
import { fontSans, fontMono } from "@/fonts";
import "./globals.css";
import { siteConfig } from "@/constants/site";
import { Toaster } from "react-hot-toast";
import { ReactLenis } from "@/utils/lenis";
import { LenisOptions } from "lenis";

const fonts = `${fontSans.variable} ${fontMono.variable}`;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: { icon: [{ url: "/favicon.ico" }] },
};

const lenisOptions: Partial<LenisOptions> = {
  // smoothing controls
  duration: 1.2, // how long the programmatic scroll takes
  // custom easing (same default from Lenis)
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  // input multipliers & behavior
  wheelMultiplier: 1, // mouse wheel sensitivity
  touchMultiplier: 2, // touch/trackpad sensitivity (this replaces `smoothTouch`)
  syncTouch: false, // whether to mimic native touch inertia (experimental / optional)
  // autoRaf: true // if you rely on automatic RAF (Lenis autoRaf is default behavior)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.defaultLanguage}>
      <ReactLenis root options={lenisOptions}>
        <body className={fonts}>
          {children}
          <Toaster />
        </body>
      </ReactLenis>
    </html>
  );
}
