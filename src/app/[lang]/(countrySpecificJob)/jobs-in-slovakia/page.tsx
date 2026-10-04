import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("slovakia");

export default function JobsInSlovakiaPage() {
  return <CountryJobPage country="slovakia" />;
}
