import { redirect } from "next/navigation";
import { siteConfig } from "@/constants/site";

export default function RootPage() {
  redirect(`/${siteConfig.defaultLanguage}`);
}
