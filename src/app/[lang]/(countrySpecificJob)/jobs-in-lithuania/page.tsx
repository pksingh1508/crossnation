import { CountryJobPage } from "@/components/countryJobs/CountryJobPage";
import { countryJobsMetadata } from "@/components/countryJobs/metadata";

export const metadata = countryJobsMetadata("lithuania");

export default function JobsInLithuaniaPage() {
  return <CountryJobPage country="lithuania" />;
}
