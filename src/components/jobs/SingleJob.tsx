import { fontInter, fontPoppins } from "@/fonts";
import type { JobIconKey, JobItem } from "@/constants/jobsData";
import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  Clock3,
  Compass,
  Factory,
  GraduationCap,
  Hammer,
  HardHat,
  Headphones,
  Laptop,
  Leaf,
  LineChart,
  Megaphone,
  Monitor,
  Package,
  Paintbrush,
  PenTool,
  Pill,
  ClipboardList,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

const iconMap: Record<JobIconKey, LucideIcon> = {
  laptop: Laptop,
  briefcase: BriefcaseBusiness,
  calculator: Calculator,
  hard_hat: HardHat,
  users: Users,
  bar_chart: BarChart3,
  megaphone: Megaphone,
  truck: Truck,
  headphones: Headphones,
  badge_dollar: BadgeDollarSign,
  line_chart: LineChart,
  shopping_bag: ShoppingBag,
  shield_check: ShieldCheck,
  clipboard: ClipboardList,
  monitor: Monitor,
  pen_tool: PenTool,
  graduation_cap: GraduationCap,
  stethoscope: Stethoscope,
  pill: Pill,
  compass: Compass,
  hammer: Hammer,
  zap: Zap,
  wrench: Wrench,
  package: Package,
  factory: Factory,
  paintbrush: Paintbrush,
  leaf: Leaf,
  settings: Settings,
};

interface SingleJobProps {
  job: JobItem;
}

export default function SingleJob({ job }: SingleJobProps) {
  const Icon = iconMap[job.icon] ?? BriefcaseBusiness;

  return (
    <article
      className="overflow-hidden rounded-[28px] border border-amber-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
    >
      <div className="h-2 w-full bg-amber-400"></div>
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-400"
            aria-label={job.iconName}
            title={job.iconName}
          >
            <Icon className="h-7 w-7" />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className={`text-xl font-semibold leading-snug text-slate-900 md:text-2xl ${fontPoppins.className}`}
            >
              {job.JobTitle}
            </h3>
          </div>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p
            className={`min-h-16 text-base leading-7 text-slate-600 ${fontInter.className}`}
          >
            {job.Description}
          </p>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p
            className={`text-xl font-semibold text-amber-400 md:text-2xl ${fontPoppins.className}`}
          >
            € {job.GrossSalary}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="h-4 w-4 text-amber-500" />
            <span className={fontInter.className}>{job.WorkingHours}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
