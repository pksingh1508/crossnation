import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("armenia");

export default function JobsInArmeniaPage() {
  return <CountryJobPage country="armenia" />;
}
