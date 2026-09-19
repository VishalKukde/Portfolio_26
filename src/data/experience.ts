export interface ExperienceEntry {
  period: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  highlights: string[];
  current?: boolean;
}

// Newest first; the entry marked current is also used as "worksFor" in the site's structured data.
export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "Sep 2026 - now",
    company: "Royal Chains Limited",
    role: "Sr. Full Stack Developer",
    location: "On-Site",
    summary:
      "Just joined Royal Chains Limited as a Senior Full Stack Developer. Right now I'm getting to know the product, the codebase and the team, and settling in to own features from the interface to the data layer.",
    highlights: [
      "Onboarding onto the product, its architecture and the team's ways of working",
      "Picking up full stack work across the frontend and backend",
    ],
    current: true,
  },
  {
    period: "Jan 2023 - Sep 2026",
    company: "PoketPOS Solutions Pvt. Ltd",
    role: "Software Developer",
    location: "On-Site",
    summary:
      "Led frontend architecture for SaaS products where performance, accessibility, and a shared language matter as much as the feature list.",
    highlights: [
      "Developed a full-featured Java-based web portal for real-time sales, purchase, and transaction reporting across the organization",
      "Engineered a cross-platform desktop application using Electron & React to streamline restaurant order placement and settlement processes",
      "Built modular, reusable UI components in React & JavaScript, ensuring consistency and efficiency across web and desktop platforms",
      "Collaborated with product managers and UX teams to deliver user-focused solutions that align with business objectives",
    ],
  },
];
