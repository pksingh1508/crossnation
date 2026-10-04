import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface CountrySpecificJobLayoutProps {
  children: ReactNode;
}

/**
 * The country jobs pages: landing pages without the site's navigation, written in
 * English. They are in English at every address (/pl/jobs-in-poland too), so the shared
 * parts they use (the enquiry form, the testimonials, the footer's links) are as well.
 */
export default async function CountrySpecificJobLayout({
  children,
}: CountrySpecificJobLayoutProps) {
  const { footer, testimonials, pages } = await getMessages({ locale: "en" });
  const { myForm } = pages as { myForm: object };

  return (
    <NextIntlClientProvider
      locale="en"
      messages={{ footer, testimonials, pages: { myForm } }}
    >
      <div lang="en" className="flex flex-1 flex-col">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
