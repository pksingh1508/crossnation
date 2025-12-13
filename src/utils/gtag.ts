export const trackConversion = (
  conversionLabel: string,
  value?: number,
  currency: string = "PLN"
) => {
  try {
    if (typeof window === "undefined") {
      // console.warn("⚠️ Server-side - gtag not available");
      return false;
    }

    if (!window.gtag) {
      // console.warn("⚠️ gtag function not loaded yet");
      return false;
    }

    window.gtag("event", "conversion", {
      send_to: `AW-17774544099/${conversionLabel}`,
      value: value || 1.0,
      currency: currency,
    });

    // console.log("✅ Conversion tracked:", conversionLabel);
    return true;
  } catch (error) {
    // console.error("❌ Error tracking conversion:", error);
    return false;
  }
};
