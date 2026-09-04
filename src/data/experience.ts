export interface ExperienceEntry {
  period: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  highlights: string[];
  current?: boolean;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "2023 - now",
    company: "PoketPOS Solutions Pvt. Ltd",
    role: "Software Developer",
    location: "On-Site",
    summary:
      "Leading frontend architecture for SaaS products where performance, accessibility, and a shared language matter as much as the feature list.",
    highlights: [
      "Developed a full-featured Java-based web portal for real-time sales, purchase, and transaction reporting across the organization",
      "Engineered a cross-platform desktop application using Electron & React to streamline restaurant order placement and settlement processes",
      "Built modular, reusable UI components in React & JavaScript, ensuring consistency and efficiency across web and desktop platforms",
      "Collaborated with product managers and UX teams to deliver user-focused solutions that align with business objectives",
    ],
    current: true,
  },
];
