import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("romania");

export default function JobsInRomaniaPage() {
  return <CountryJobPage country="romania" />;
}
