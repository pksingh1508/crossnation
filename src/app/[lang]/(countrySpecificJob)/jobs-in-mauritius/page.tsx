import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("mauritius");

export default function JobsInMauritiusPage() {
  return <CountryJobPage country="mauritius" />;
}
