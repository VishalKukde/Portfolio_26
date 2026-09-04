export interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
}

export interface SkillCategory {
  index: string;
  title: string;
  badge: string;
  description: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    index: '01',
    title: 'Frontend Engineering',
    badge: 'Core Expertise',
    description: 'Modern component-driven architectures delivering responsive, accessible, and 60fps user experiences.',
    skills: [
      { name: 'React 19', icon: 'Atom', level: 98, description: 'Hooks, Server Components, Concurrent Mode' },
      { name: 'Next.js 16', icon: 'Globe', level: 96, description: 'App Router, Turbopack, SSR/SSG/ISR' },
      { name: 'Redux Toolkit', icon: 'Layers', level: 92, description: 'Global state, RTK Query, Slices' },
      { name: 'TypeScript', icon: 'Code', level: 95, description: 'Strict typing, Generics, Type Safety' },
      { name: 'JavaScript', icon: 'FileJson', level: 98, description: 'Modern syntax, Async/Await, Web APIs' },
      { name: 'Tailwind CSS', icon: 'Palette', level: 98, description: 'Design tokens, Responsive UI, v4 CSS' },
      { name: 'Material UI', icon: 'Palette', level: 92, description: 'Accessible components, Theming, Layout' },
      { name: 'Framer Motion', icon: 'Sparkles', level: 95, description: 'UI animation, Gestures, AnimatePresence' },
    ],
  },
  {
    index: '02',
    title: 'Backend & APIs',
    badge: 'Scalable Systems',
    description: 'High-throughput server environments, microservices, and secure API architectures.',
    skills: [
      { name: 'Node.js', icon: 'Server', level: 94, description: 'Event loop, Streams, Asynchronous I/O' },
      { name: 'Express.js', icon: 'Zap', level: 95, description: 'RESTful endpoints, Middleware, Security' },
      { name: 'MongoDB', icon: 'Database', level: 90, description: 'Document stores, Aggregations, Atlas' },
      { name: 'PostgreSQL', icon: 'Database', level: 92, description: 'Relational schemas, Indexing, Transactions' },
      { name: 'MySQL', icon: 'Database', level: 90, description: 'Relational queries, Joins, Transactions' },
      { name: 'Firebase', icon: 'Cloud', level: 88, description: 'Auth, Firestore, Realtime services' },
      { name: 'Redis', icon: 'Cpu', level: 88, description: 'In-memory caching, Pub/Sub, Session stores' },
      { name: 'REST APIs', icon: 'Network', level: 94, description: 'Secure resources, Contracts, Integrations' },
      { name: 'WebSockets', icon: 'Network', level: 88, description: 'Real-time events, Presence, Messaging' },
    ],
  },
  {
    index: '03',
    title: 'Architecture & Engineering',
    badge: 'Systems Thinking',
    description: 'Strong foundations for products that need to stay understandable, responsive, and ready to scale.',
    skills: [
      { name: 'High Level Design', icon: 'Boxes', level: 91, description: 'High-level system architecture' },
      { name: 'Low Level Design', icon: 'Layers', level: 90, description: 'Low-level design, patterns, modules' },
      { name: 'Data Structures & Algorithms', icon: 'Network', level: 88, description: 'Efficient problem solving and trade-offs' },
      { name: 'Responsive Design', icon: 'Globe', level: 98, description: 'Fluid layouts, mobile-first systems' },
      { name: 'Performance Engineering', icon: 'Gauge', level: 94, description: 'Core Web Vitals, profiling, optimization' },
    ],
  },
  {
    index: '04',
    title: 'DevOps & Tooling',
    badge: 'Cloud & Workflow',
    description: 'Automated CI/CD pipelines, containerization, and modern version control workflows.',
    skills: [
      { name: 'Git & GitHub', icon: 'GitBranch', level: 96, description: 'Branching workflows, Pull requests, Actions' },
      { name: 'GitHub Actions', icon: 'GitBranch', level: 92, description: 'Automated checks, Builds, Deployments' },
      { name: 'Docker', icon: 'Container', level: 88, description: 'Containerization, Multi-stage builds, Compose' },
      { name: 'CI/CD', icon: 'GitBranch', level: 90, description: 'Release pipelines, Quality gates, Automation' },
      { name: 'Vercel', icon: 'Triangle', level: 95, description: 'Edge functions, CDN routing, Serverless' },
      { name: 'Render', icon: 'Cloud', level: 88, description: 'Managed services, Web deploys, Scaling' },
      { name: 'Railway', icon: 'Cloud', level: 86, description: 'Fast infrastructure, Databases, Environments' },
    ],
  },
  {
    index: '05',
    title: 'AI Innovation',
    badge: 'AI Workflow',
    description: 'Practical AI tools for faster exploration, sharper implementation, and more thoughtful product work.',
    skills: [
      { name: 'Claude Code', icon: 'Terminal', level: 94, description: 'Agentic coding, refactoring, reviews' },
      { name: 'Codex', icon: 'Code', level: 94, description: 'Code generation, automation, testing' },
      { name: 'Antigravity', icon: 'Orbit', level: 86, description: 'Creative experiments, emerging workflows' },
      { name: 'Cursor', icon: 'MousePointer2', level: 96, description: 'Context-aware editing, rapid iteration' },
      { name: 'Gemini', icon: 'Brain', level: 90, description: 'Multimodal analysis, research, prototypes' },
      { name: 'ChatGPT', icon: 'Sparkles', level: 98, description: 'Ideation, debugging, technical writing' },
    ],
  },
];
