"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/states";

export default function LangError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="We hit a snag"
      description="An unexpected error occurred. You can try again."
      onRetry={reset}
    />
  );
}
