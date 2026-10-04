import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("ukraine");

export default function JobsInUkrainePage() {
  return <CountryJobPage country="ukraine" />;
}
