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
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-black text-white px-4 py-2 rounded"
      >
        Skip to content
      </a>
      <Navbar />
      <main className={clsx(className)}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
