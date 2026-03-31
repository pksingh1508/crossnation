import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";

interface DefaultSiteLayoutProps {
  children: ReactNode;
}

export default function DefaultSiteLayout({
  children,
}: DefaultSiteLayoutProps) {
  return <Layout className="flex-1">{children}</Layout>;
}
