import { ReactNode } from "react";

interface CountrySpecificJobLayoutProps {
  children: ReactNode;
}

export default function CountrySpecificJobLayout({
  children,
}: CountrySpecificJobLayoutProps) {
  return <main className="flex-1">{children}</main>;
}
