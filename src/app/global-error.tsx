"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/states";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorState
          title="Something went wrong"
          description="A global error occurred. Please try again."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
