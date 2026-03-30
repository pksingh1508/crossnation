import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return <Layout className="flex-1">{children}</Layout>;
}
