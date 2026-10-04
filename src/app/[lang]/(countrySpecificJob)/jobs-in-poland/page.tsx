import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("poland");

export default function JobsInPolandPage() {
  return <CountryJobPage country="poland" />;
}
