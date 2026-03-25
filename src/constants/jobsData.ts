export type JobIconKey =
  | "laptop"
  | "briefcase"
  | "calculator"
  | "hard_hat"
  | "users"
  | "bar_chart"
  | "megaphone"
  | "truck"
  | "headphones"
  | "badge_dollar"
  | "line_chart"
  | "shopping_bag"
  | "shield_check"
  | "clipboard"
  | "monitor"
  | "pen_tool"
  | "graduation_cap"
  | "stethoscope"
  | "pill"
  | "compass"
  | "hammer"
  | "zap"
  | "wrench"
  | "package"
  | "factory"
  | "paintbrush"
  | "leaf"
  | "settings";

export interface JobItem {
  JobTitle: string;
  Description: string;
  GrossSalary: string;
  WorkingHours: string;
  icon: JobIconKey;
  iconName: string;
}

export const WhiteCollarJobs: JobItem[] = [
  {
    JobTitle: "Software Developer",
    Description: "Designs and codes software applications",
    GrossSalary: "3,500-6,000",
    WorkingHours: "40 hours/week",
    icon: "laptop",
    iconName: "Laptop",
  },
  {
    JobTitle: "Project Manager",
    Description: "Oversees and manages projects",
    GrossSalary: "3,000-5,000",
    WorkingHours: "40 hours/week",
    icon: "briefcase",
    iconName: "Briefcase",
  },
  {
    JobTitle: "Accountant",
    Description: "Prepares and reviews financial records",
    GrossSalary: "2,500-4,000",
    WorkingHours: "40 hours/week",
    icon: "calculator",
    iconName: "Calculator",
  },
  {
    JobTitle: "Civil Engineer",
    Description: "Designs and supervises construction projects",
    GrossSalary: "3,200-5,000",
    WorkingHours: "40 hours/week",
    icon: "hard_hat",
    iconName: "Hard Hat",
  },
  {
    JobTitle: "HR Specialist",
    Description: "Manages human resources processes",
    GrossSalary: "2,400-3,800",
    WorkingHours: "40 hours/week",
    icon: "users",
    iconName: "Users",
  },
  {
    JobTitle: "Business Analyst",
    Description: "Analyses business data and processes",
    GrossSalary: "3,000-4,500",
    WorkingHours: "40 hours/week",
    icon: "bar_chart",
    iconName: "Bar Chart",
  },
  {
    JobTitle: "Marketing Manager",
    Description: "Plans and executes marketing campaigns",
    GrossSalary: "3,200-5,000",
    WorkingHours: "40 hours/week",
    icon: "megaphone",
    iconName: "Megaphone",
  },
  {
    JobTitle: "Logistics Coordinator",
    Description: "Manages supply chains and deliveries",
    GrossSalary: "2,400-3,500",
    WorkingHours: "40 hours/week",
    icon: "truck",
    iconName: "Truck",
  },
  {
    JobTitle: "Customer Service Manager",
    Description: "Leads customer support teams",
    GrossSalary: "2,500-3,800",
    WorkingHours: "40 hours/week",
    icon: "headphones",
    iconName: "Headphones",
  },
  {
    JobTitle: "Financial Analyst",
    Description: "Reviews and advises on financial performance",
    GrossSalary: "3,000-4,500",
    WorkingHours: "40 hours/week",
    icon: "badge_dollar",
    iconName: "Badge Dollar",
  },
  {
    JobTitle: "Data Analyst",
    Description: "Analyses and interprets data",
    GrossSalary: "2,800-4,200",
    WorkingHours: "40 hours/week",
    icon: "line_chart",
    iconName: "Line Chart",
  },
  {
    JobTitle: "Sales Representative",
    Description: "Sells products or services to customers",
    GrossSalary: "2,400-3,800",
    WorkingHours: "40 hours/week",
    icon: "shopping_bag",
    iconName: "Shopping Bag",
  },
  {
    JobTitle: "Quality Control Manager",
    Description: "Oversees product quality and standards",
    GrossSalary: "3,000-4,500",
    WorkingHours: "40 hours/week",
    icon: "shield_check",
    iconName: "Shield Check",
  },
  {
    JobTitle: "Procurement Specialist",
    Description: "Handles purchasing processes",
    GrossSalary: "2,600-4,000",
    WorkingHours: "40 hours/week",
    icon: "clipboard",
    iconName: "Clipboard",
  },
  {
    JobTitle: "IT Support Specialist",
    Description: "Provides technical support",
    GrossSalary: "2,400-3,500",
    WorkingHours: "40 hours/week",
    icon: "monitor",
    iconName: "Monitor",
  },
  {
    JobTitle: "Graphic Designer",
    Description: "Design graphics for print and digital",
    GrossSalary: "2,200-3,500",
    WorkingHours: "40 hours/week",
    icon: "pen_tool",
    iconName: "Pen Tool",
  },
  {
    JobTitle: "Teacher",
    Description: "Educates students in schools",
    GrossSalary: "2,200-3,200",
    WorkingHours: "40 hours/week",
    icon: "graduation_cap",
    iconName: "Graduation Cap",
  },
  {
    JobTitle: "Medical Doctor",
    Description: "Provides medical care to patients",
    GrossSalary: "4,500-7,000",
    WorkingHours: "40 hours/week",
    icon: "stethoscope",
    iconName: "Stethoscope",
  },
  {
    JobTitle: "Pharmacist",
    Description: "Dispenses medications and gives medical advice",
    GrossSalary: "3,000-4,500",
    WorkingHours: "40 hours/week",
    icon: "pill",
    iconName: "Pill",
  },
  {
    JobTitle: "Architect",
    Description: "Designs building plans",
    GrossSalary: "3,500-5,500",
    WorkingHours: "40 hours/week",
    icon: "compass",
    iconName: "Compass",
  },
] as const;

export const BlueCollarJobs: JobItem[] = [
  {
    JobTitle: "Bricklayer",
    Description: "Builds walls and other structures using bricks",
    GrossSalary: "1,800-2,400",
    WorkingHours: "40-48 hours/week",
    icon: "hammer",
    iconName: "Hammer",
  },
  {
    JobTitle: "Electrician",
    Description: "Installs and repairs electrical systems",
    GrossSalary: "2,000-2,800",
    WorkingHours: "40 hours/week",
    icon: "zap",
    iconName: "Zap",
  },
  {
    JobTitle: "Plumber",
    Description: "Installs and fixes water systems",
    GrossSalary: "1,800-2,600",
    WorkingHours: "40 hours/week",
    icon: "wrench",
    iconName: "Wrench",
  },
  {
    JobTitle: "Welder",
    Description: "Joins metal parts by welding",
    GrossSalary: "2,200-3,200",
    WorkingHours: "40-45 hours/week",
    icon: "hammer",
    iconName: "Hammer",
  },
  {
    JobTitle: "Crane Operator",
    Description: "Operates tower or mobile cranes",
    GrossSalary: "2,000-3,000",
    WorkingHours: "40-48 hours/week",
    icon: "truck",
    iconName: "Truck",
  },
  {
    JobTitle: "Forklift Operator",
    Description: "Loads and unloads goods with forklifts",
    GrossSalary: "1,700-2,300",
    WorkingHours: "40-45 hours/week",
    icon: "package",
    iconName: "Package",
  },
  {
    JobTitle: "Truck Driver",
    Description: "Transports goods long-distance",
    GrossSalary: "2,100-2,900",
    WorkingHours: "48-55 hours/week",
    icon: "truck",
    iconName: "Truck",
  },
  {
    JobTitle: "Carpenter",
    Description: "Builds wooden structures and frameworks",
    GrossSalary: "1,800-2,500",
    WorkingHours: "40-48 hours/week",
    icon: "hammer",
    iconName: "Hammer",
  },
  {
    JobTitle: "Roofer",
    Description: "Installs and repairs roofs",
    GrossSalary: "1,700-2,400",
    WorkingHours: "40 hours/week",
    icon: "hammer",
    iconName: "Hammer",
  },
  {
    JobTitle: "Steel Fixer",
    Description: "Positions and secures steel bars in concrete",
    GrossSalary: "1,900-2,600",
    WorkingHours: "40-45 hours/week",
    icon: "wrench",
    iconName: "Wrench",
  },
  {
    JobTitle: "Heavy Equipment Mechanic",
    Description: "Repairs and maintains construction machinery",
    GrossSalary: "2,000-2,800",
    WorkingHours: "40 hours/week",
    icon: "settings",
    iconName: "Settings",
  },
  {
    JobTitle: "Concrete Worker",
    Description: "Mixes, pours, and finishes concrete",
    GrossSalary: "1,600-2,200",
    WorkingHours: "40 hours/week",
    icon: "hard_hat",
    iconName: "Hard Hat",
  },
  {
    JobTitle: "Painter",
    Description: "Paints interiors and exteriors",
    GrossSalary: "1,600-2,300",
    WorkingHours: "40 hours/week",
    icon: "paintbrush",
    iconName: "Paintbrush",
  },
  {
    JobTitle: "Industrial Cleaner",
    Description: "Cleans industrial facilities",
    GrossSalary: "1,500-2,000",
    WorkingHours: "40 hours/week",
    icon: "factory",
    iconName: "Factory",
  },
  {
    JobTitle: "Production Worker",
    Description: "Works on assembly lines in factories",
    GrossSalary: "1,600-2,300",
    WorkingHours: "40 hours/week",
    icon: "factory",
    iconName: "Factory",
  },
  {
    JobTitle: "Butcher",
    Description: "Cuts and prepares meat products",
    GrossSalary: "1,700-2,300",
    WorkingHours: "40 hours/week",
    icon: "package",
    iconName: "Package",
  },
  {
    JobTitle: "Machine Operator",
    Description: "Operates manufacturing equipment",
    GrossSalary: "1,700-2,400",
    WorkingHours: "40 hours/week",
    icon: "settings",
    iconName: "Settings",
  },
  {
    JobTitle: "Warehouse Picker",
    Description: "Prepares orders for shipping",
    GrossSalary: "1,600-2,200",
    WorkingHours: "40 hours/week",
    icon: "package",
    iconName: "Package",
  },
  {
    JobTitle: "Agricultural Worker",
    Description: "Assists in planting and harvesting",
    GrossSalary: "1,400-2,000",
    WorkingHours: "40-48 hours/week",
    icon: "leaf",
    iconName: "Leaf",
  },
  {
    JobTitle: "Maintenance Worker",
    Description: "Performs building repairs",
    GrossSalary: "1,600-2,300",
    WorkingHours: "40 hours/week",
    icon: "wrench",
    iconName: "Wrench",
  },
] as const;
