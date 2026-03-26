import { fontPoppins } from "@/fonts";
import {
  BlueCollarJobs,
  WhiteCollarJobs,
  type JobItem,
} from "@/constants/jobsData";
import { Search } from "lucide-react";
import SingleJob from "./SingleJob";

interface JobSectionProps {
  title: string;
  jobs: JobItem[];
}

interface RenderJobsProps {
  whiteCollarTitle?: string;
  blueCollarTitle?: string;
}

function JobSection({ title, jobs }: JobSectionProps) {
  return (
    <section className="mt-12 first:mt-0">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <Search className="h-7 w-7" />
        </div>
        <h2
          className={`text-3xl font-bold text-slate-900 md:text-4xl ${fontPoppins.className}`}
        >
          {title}
        </h2>
        <div className="mt-4 h-1 w-24 rounded-full bg-amber-500"></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {jobs.map((job) => (
          <SingleJob key={`${title}-${job.JobTitle}`} job={job} />
        ))}
      </div>
    </section>
  );
}

export default function RenderJobs({
  whiteCollarTitle = "White Collar Jobs in Poland",
  blueCollarTitle = "Blue Collar Jobs in Poland",
}: RenderJobsProps) {
  return (
    <div className="bg-white px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <JobSection title={whiteCollarTitle} jobs={WhiteCollarJobs} />

        <JobSection title={blueCollarTitle} jobs={BlueCollarJobs} />
      </div>
    </div>
  );
}
