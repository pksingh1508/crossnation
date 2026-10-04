import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("albania");

export default function JobsInAlbaniaPage() {
  return <CountryJobPage country="albania" />;
}
