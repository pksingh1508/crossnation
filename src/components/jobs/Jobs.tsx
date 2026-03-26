import AboutJob from "./AboutJob";
import RenderFAQ from "./RenderFAQ";
import RenderJobs from "./RenderJobs";
import { CommonContact } from "../sections/CommonContact";

export default function Jobs() {
  return (
    <div>
      <CommonContact />
      <AboutJob />
      <RenderJobs />
      <RenderFAQ />
    </div>
  );
}
