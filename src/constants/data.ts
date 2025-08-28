// src/constants/navbarLinks.ts
export const NAVBAR_LINKS = [
  { label: "Study", href: "/study" },
  { label: "Work", href: "/work" },
  { label: "Invest", href: "/invest" },
  { label: "Migrate", href: "/migrate" },
  { label: "Employer", href: "/employer" },
  { label: "Institution", href: "/institution" },
  { label: "Recruiter", href: "/recruiter" },
  { label: "Jobseeker", href: "/jobseeker" },
  { label: "Traineeship", href: "/traineeship" },
] as const;

// src/constants/countries.ts
export const COUNTRIES = [
  { label: "Japan", value: "japan" },
  { label: "Italy", value: "italy" },
  { label: "France", value: "france" },
  { label: "Switzerland", value: "switzerland" },
  { label: "Spain", value: "spain" },
  { label: "Greece", value: "greece" },
  { label: "Thailand", value: "thailand" },
  { label: "Australia", value: "australia" },
  { label: "New Zealand", value: "new-zealand" },
  { label: "Canada", value: "canada" },
  { label: "United States", value: "united-states" },
  { label: "United Kingdom", value: "united-kingdom" },
  { label: "Germany", value: "germany" },
  { label: "Netherlands", value: "netherlands" },
  { label: "Austria", value: "austria" },
  { label: "Iceland", value: "iceland" },
  { label: "Portugal", value: "portugal" },
  { label: "Turkey", value: "turkey" },
  { label: "Singapore", value: "singapore" },
  { label: "United Arab Emirates", value: "uae" },
] as const;

// src/constants/insurance.ts
export const INSURANCE_TYPES = [
  { label: "Public health", value: "public-health" },
  { label: "Private health", value: "private-health" },
  { label: "Expat health", value: "expat-health" },
  { label: "Student health", value: "student-health" },
  { label: "Dental", value: "dental" },
  { label: "Personal liability", value: "personal-liability" },
  { label: "Household", value: "household" },
  { label: "Bike", value: "bike" },
  { label: "Dog liability", value: "dog-liability" },
  { label: "Pet health", value: "pet-health" },
  { label: "Travel", value: "travel" },
  { label: "Life", value: "life" },
  { label: "Disability", value: "disability" },
  { label: "Legal", value: "legal" },
  { label: "Pension", value: "pension" },
  { label: "For companies & self-employed", value: "companies-self-employed" },
  { label: "Car", value: "car" },
] as const;

// src/constants/footer.ts

export const FOOTER_SERVICES = [
  { label: "Study Abroad", value: "study-abroad" },
  { label: "Work Visa", value: "work-visa" },
  { label: "Migration", value: "migration" },
  { label: "Investment", value: "investment" },
  { label: "Training Programs", value: "training-programs" },
] as const;

export const FOOTER_COUNTRIES = [
  { label: "United States", value: "united-states" },
  { label: "Canada", value: "canada" },
  { label: "United Kingdom", value: "united-kingdom" },
  { label: "Australia", value: "australia" },
  { label: "Germany", value: "germany" },
] as const;

export const FAQS = [
  {
    question: "What services do you provide?",
    answer:
      "We offer services such as study abroad guidance, work opportunities, investment advice, migration support, mentorship, and job-seeker assistance.",
  },
  {
    question: "Which countries do you work with?",
    answer:
      "We work with multiple countries including the USA, UK, Canada, Australia, and various European and Asian nations depending on the service requirements.",
  },
  {
    question: "How long does the process take?",
    answer:
      "The duration varies depending on the type of service. On average, processes can take anywhere from a few weeks to several months.",
  },
  {
    question: "Do you provide visa assistance?",
    answer:
      "Yes, we assist with visa applications, documentation, and interview preparation to ensure a smooth process.",
  },
  {
    question: "What are your fees?",
    answer:
      "Our fees depend on the type of service you choose. We provide transparent pricing upfront with no hidden charges.",
  },
] as const;
