import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("belarus");

export default function JobsInBelarusPage() {
  return <CountryJobPage country="belarus" />;
}
