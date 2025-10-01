"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Event tracking functions
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Page view tracking
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Conversion tracking
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionId,
      value: value,
      currency: "EUR",
    });
  }
};

// Form submission tracking
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent(
    success ? "form_submit_success" : "form_submit_error",
    "engagement",
    formName
  );
};

// Download tracking
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("file_download", "engagement", `${fileName}.${fileType}`);
};

// External link tracking
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent("external_link_click", "engagement", `${linkText} - ${url}`);
};

// Search tracking
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent("search", "engagement", searchTerm, resultsCount);
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
