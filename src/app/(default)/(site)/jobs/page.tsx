import JobsPage from "@/app/[lang]/(site)/jobs/page";
import { siteConfig } from "@/constants/site";

export default function DefaultJobsPage() {
  return (
    <JobsPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
    />
  );
}
