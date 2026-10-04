import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("czech-republic");

export default function JobsInCzechRepublicPage() {
  return <CountryJobPage country="czech-republic" />;
}
