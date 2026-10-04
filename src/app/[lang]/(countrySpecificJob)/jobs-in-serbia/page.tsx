import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("serbia");

export default function JobsInSerbiaPage() {
  return <CountryJobPage country="serbia" />;
}
