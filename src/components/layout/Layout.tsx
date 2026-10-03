"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import clsx from "clsx";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-neutral-950 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:ring-2 focus:ring-brand focus:outline-none"
      >
        Skip to content
      </a>
      <Navbar />
      {/* scroll-mt: when the skip link jumps here, the sticky navbar must not cover the start */}
      <main
        id="main-content"
        className={clsx("scroll-mt-16 xl:scroll-mt-20", className)}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
