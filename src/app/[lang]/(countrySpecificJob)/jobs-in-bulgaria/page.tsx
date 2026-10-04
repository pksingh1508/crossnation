import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("bulgaria");

export default function JobsInBulgariaPage() {
  return <CountryJobPage country="bulgaria" />;
}
