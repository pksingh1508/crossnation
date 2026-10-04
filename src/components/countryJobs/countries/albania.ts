import {
  BadgeCheck,
  BedDouble,
  BrickWall,
  BriefcaseBusiness,
  Building2,
  Car,
  Clock3,
  Cog,
  Construction,
  CookingPot,
  Flame,
  Globe2,
  Grid2x2,
  House,
  Martini,
  Mountain,
  ShieldCheck,
  Sparkles,
  SprayCan,
  TrendingUp,
  Truck,
  Umbrella,
  Users,
  Utensils,
  UtensilsCrossed,
  Wallet,
  Wine,
  Wrench,
  Zap,
} from "lucide-react";
import type { CountryJobs } from "../types";

/** Albania's page has its own content: jobs with their own pay, and life there */
export const albania: CountryJobs = {
  slug: "albania",
  name: "Albania",
  place: "Albania",
  code: "AL",
  code3: "ALB",
  // The general employment conditions
  facts: [
    { label: "Salary", value: "€500–€900, depending on the role" },
    { label: "Working hours", value: "Normally 8 hours per day" },
    {
      label: "Overtime",
      value: "Paid according to Albanian labour regulations",
    },
    { label: "Meals", value: "Usually at least one per working day" },
    {
      label: "Accommodation",
      value: "Shared, usually part of the job package",
    },
  ],
  roles: {
    title: "High-Demand Jobs and Industries in Albania",
    groups: [
      {
        title: "Technical and Construction Roles",
        roles: [
          {
            title: "Light Vehicle Auto Electrician",
            icon: Zap,
            salary: "€500–€700",
            note: "Male candidates preferred, includes 1 meal and accommodation",
          },
          {
            title: "Light Vehicle Mechanic",
            icon: Car,
            salary: "€500–€700",
            note: "With similar benefits",
          },
          {
            title: "Heavy Truck Mechanic",
            icon: Wrench,
            salary: "€600–€800",
            note: "With food and housing included",
          },
          {
            title: "Mason (Construction Worker)",
            icon: BrickWall,
            salary: "€500–€600",
            note: "With basic benefits",
          },
          {
            title: "Tile Installer",
            icon: Grid2x2,
            salary: "€500–€600",
            note: "With accommodation support",
          },
          {
            title: "Truck Driver (Damper/Cement Mixer)",
            icon: Truck,
            salary: "€600–€800",
          },
          {
            title: "Cement Pump Operator",
            icon: Construction,
            salary: "€600–€800",
          },
          { title: "Heavy Equipment Mechanic", icon: Cog, salary: "€700–€900" },
          {
            title: "Sand System Operator",
            icon: Mountain,
            salary: "€600–€800",
          },
          { title: "General Welder", icon: Flame, salary: "€600–€700" },
        ],
      },
      {
        title: "Hospitality and Service Roles",
        roles: [
          {
            title: "Beach Attendant",
            icon: Umbrella,
            salary: "€500",
            note: "Open to males and females, includes 3 meals and shared accommodation",
          },
          {
            title: "Waiter/Waitress",
            icon: UtensilsCrossed,
            salary: "€600",
            note: "With meals and shared housing",
          },
          {
            title: "Assistant Waiter/Waitress",
            icon: Utensils,
            salary: "€500",
          },
          { title: "Bartender", icon: Martini, salary: "€700" },
          { title: "Assistant Bartender", icon: Wine, salary: "€500" },
          { title: "Dishwasher", icon: CookingPot, salary: "€500" },
          { title: "Housekeeping Staff", icon: BedDouble, salary: "€600" },
          { title: "Sanitation Worker", icon: SprayCan, salary: "€500" },
        ],
      },
    ],
  },
  why: [
    {
      title: "Why Choose an Albania Work Visa?",
      items: [
        {
          text: "A wide range of jobs is available in sectors like agriculture, energy, and textiles.",
          icon: BriefcaseBusiness,
        },
        {
          text: "There is less competition compared with many other countries when applying for work visas.",
          icon: ShieldCheck,
        },
        {
          text: "A developing economy creates room for career growth.",
          icon: TrendingUp,
        },
        {
          text: "Work settings include scenic cities as well as peaceful rural areas.",
          icon: House,
        },
        {
          text: "The visa application process is generally straightforward with fewer complications.",
          icon: BadgeCheck,
        },
        {
          text: "Work experience in Albania can help open future opportunities connected to Europe.",
          icon: Globe2,
        },
      ],
    },
    {
      title: "Advantages of Working in Albania",
      items: [
        {
          text: "The cost of living is low, especially for food and accommodation.",
          icon: Wallet,
        },
        {
          text: "Flexible schedules can support a healthier work-life balance.",
          icon: Clock3,
        },
        {
          text: "Support is available for people interested in starting businesses.",
          icon: Building2,
        },
        {
          text: "The country offers strong natural beauty and UNESCO heritage sites.",
          icon: Sparkles,
        },
        {
          text: "Communities are friendly and the cultural environment is welcoming.",
          icon: Users,
        },
        {
          text: "Workers can gain useful experience in a stable and growing market.",
          icon: BadgeCheck,
        },
      ],
    },
  ],
  documents: [
    "Valid passport with all necessary pages.",
    "Passport-size photograph (35×45 mm) matching visa guidelines.",
    "Educational qualifications and professional certificates relevant to the job.",
    "Proof of previous work experience if available.",
    "Some roles may require English at B1 level.",
    "A short video showing work experience such as construction, driving, or welding.",
    "A self-introduction video explaining skills and willingness to work abroad.",
  ],
  steps: {
    title: "Steps to Obtain an Albania E-Work Permit and D-Type Visa",
    items: [
      "Gather required documents such as passport, contract, qualifications, and accommodation proof.",
      "Register on the e-Albania online portal.",
      "Complete the application form and upload the documents.",
      "Pay the application fee online.",
      "Submit the application and keep confirmation records.",
      "Attend an interview if requested by the authorities.",
      "Wait for the decision through email or portal updates.",
      "After approval, receive the entry visa for further processing.",
      "Travel to Albania within the visa validity period.",
      "Register the residential address with local authorities.",
      "Collect the residence permit card.",
      "Begin legal work after all formalities are completed.",
    ],
  },
  payments: [
    {
      amount: 1000,
      when: "To begin the process and sign the agreement",
    },
    { amount: 2000, when: "After E-visa approval" },
  ],
  whyUs: [
    "Transparent pricing with no hidden charges.",
    "Full support from documentation through settlement after arrival.",
    "Professional guidance from experienced agents at every stage.",
  ],
  living: {
    life: {
      title: "Life and Opportunities in Albania",
      items: [
        "Workers can earn income in Albanian Lek or Euros in a developing economy.",
        "Education and skill development programs are generally affordable.",
        "Basic healthcare services are available and standards are improving.",
        "Low living costs and scenic surroundings support a peaceful lifestyle.",
        "The country can suit families who want to settle and work.",
        "There is a mix of vibrant urban life and beautiful rural areas.",
        "Travel access to nearby European countries is relatively easy.",
      ],
    },
    accommodation: {
      title: "Accommodation Details",
      items: [
        "Rooms are shared between 2 and 4 people depending on availability.",
        "Basic furnished housing includes shared kitchen and bathroom.",
        "Housing is not available for family members or pets.",
      ],
    },
    salary: {
      title: "Salary Overview in Albania",
      items: [
        "Salaries vary by industry and role and are often calculated on a 36-hour workweek.",
        "Gross salary means earnings before tax and social contributions.",
        "Net income depends on deductions under Albanian regulations.",
        "Overtime and holiday work can provide extra income.",
        "Cities like Tirana may offer higher wages than other regions.",
      ],
      examples: {
        title: "Example Monthly Salaries",
        items: [
          { role: "Cleaning Worker", min: 500, max: 700 },
          { role: "Car Wash Worker", min: 600, max: 1000 },
          { role: "Construction Worker", min: 600, max: 1000 },
        ],
      },
    },
  },
  summary:
    "Albania is becoming a more attractive choice for foreign workers because of its growing economy, affordable lifestyle, and rising number of job opportunities. It offers a practical mix of work, culture, and natural beauty for people seeking international employment.",
};
