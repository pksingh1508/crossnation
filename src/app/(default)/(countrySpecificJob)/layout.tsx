import { ReactNode } from "react";

interface DefaultCountrySpecificJobLayoutProps {
  children: ReactNode;
}

export default function DefaultCountrySpecificJobLayout({
  children,
}: DefaultCountrySpecificJobLayoutProps) {
  return <main className="flex-1">{children}</main>;
}
