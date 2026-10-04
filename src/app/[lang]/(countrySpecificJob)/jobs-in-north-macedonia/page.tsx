import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("north-macedonia");

export default function JobsInNorthMacedoniaPage() {
  return <CountryJobPage country="north-macedonia" />;
}
