"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface LayoutProps {
  children: ReactNode;
  /**
   * When true, wraps the main content in a centered container with default paddings
   */
  container?: boolean;
  /**
   * Optional className applied to the main element
   */
  className?: string;
}

export function Layout({
  children,
  container = false,
  className,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-black text-white px-4 py-2 rounded"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className={className}>
        {container ? (
          <div className="container mx-auto px-4 py-6">{children}</div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
