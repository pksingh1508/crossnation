"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedPath } from "@/lib/locale-paths";

// Shown (with a 404 status) for a slug that is unknown or not published
export default function NewsArticleNotFound() {
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Article Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The requested article could not be found.
        </p>
        <Link href={getLocalizedPath(locale, "/immigration-news")}>
          <Button className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Button>
        </Link>
      </div>
    </div>
  );
}
