import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/** Tag on every CMS read, so /api/revalidate can show new content at once. */
export const CMS_CACHE_TAG = "cms";

const url = process.env.CMS_SUPABASE_URL;
const key = process.env.CMS_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  throw new Error("Set CMS_SUPABASE_URL and CMS_SUPABASE_PUBLISHABLE_KEY");
}

/**
 * Read-only client for the CMS tables (eu_*). The publishable key only ever sees published
 * content: Row Level Security hides drafts and scheduled items, and refuses every write.
 */
export const cms = createClient<Database>(url, key, {
  // A visitor that never logs in
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
  // Keep each answer in the Next.js data cache for 5 minutes, tagged for /api/revalidate
  global: {
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        next: { revalidate: 300, tags: [CMS_CACHE_TAG] },
      }),
  },
});
