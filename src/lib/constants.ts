import type { ProjectItem, SkillItem } from "./types";

/**
 * Resume / portfolio live URL — NO localhost.
 * After deploying to Vercel, replace with your real link, e.g. https://your-name.vercel.app
 */
export const RESUME_PORTFOLIO_URL = "https://jhalak-portfolio.vercel.app";

export const SITE = {
  name: "Jhalak Choudhary",
  title: "Jhalak Choudhary — Portfolio",
  description:
    "B.Tech student and aspiring full-stack web developer. Portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
  /** Same as live site — used in metadata & project “Live” button */
  url: RESUME_PORTFOLIO_URL,
} as const;

/** Add your photo as `public/profile.jpg` (square JPG/PNG/WebP recommended). */
export const PROFILE_IMAGE_PRIMARY = "/profile.jpg";
export const PROFILE_IMAGE_FALLBACK = "/profile-placeholder.svg";

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/jhalak-choudhary-41277a347/",
  leetcode: "https://leetcode.com/u/jhalak143/",
  github: "https://github.com/jhalakchoudhary143",
} as const;

/**
 * Project links — edit repo URLs below to match YOUR GitHub username & repo names.
 * Delete a project: remove its object from PROJECTS array.
 * Add a project: copy one object, change id/title/description/tech/links.
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: "amazon-clone",
    title: "Amazon Clone",
    description:
      "E-commerce style UI/flow clone — product browsing, cart patterns, and layout practice. Code pushed on GitHub.",
    tech: ["React", "HTML/CSS", "JavaScript"],
    gradient: "from-amber-600/90 to-orange-700/90",
    links: [{ label: "GitHub", href: "" }],
  },
  {
    id: "train-reservation",
    title: "Train Reservation System",
    description:
      "Ongoing project — booking flow, seat logic, and data handling. Currently under active development.",
    tech: ["Java", "SQL", "Backend basics"],
    gradient: "from-emerald-600/90 to-teal-700/90",
    badge: "In progress",
    links: [{ label: "GitHub", href: "" }],
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "This site — responsive layout, dark/light theme, 3D assistant, animations, and contact form.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
    gradient: "from-violet-600/90 to-blue-600/90",
    links: [
      { label: "Live", href: RESUME_PORTFOLIO_URL },
      { label: "GitHub", href: "https://github.com/jhalak-choudhary/portfolio" },
    ],
  },
];

export const INTRO_LINE =
  "Let me tell you about my master... Her name is Jhalak Choudhary!";

export const ABOUT_TEXT =
  "B.Tech Student | 2nd Year, 4th Semester CGPA: 8.37 ✨ Passionate about Coding & Web Development. Aspiring Full-Stack Web Developer.";

export const TECH_SKILLS: SkillItem[] = [
  { name: "HTML/CSS", level: 92 },
  { name: "JavaScript (ES6+)", level: 85 },
  { name: "React / Next.js", level: 82 },
  { name: "Java", level: 78 },
  { name: "C++", level: 80 },
  { name: "Tailwind CSS", level: 88 },
];

export const SOFT_SKILLS: SkillItem[] = [
  { name: "Problem Solving", level: 90 },
  { name: "English Communication", level: 85 },
  { name: "Team Collaboration", level: 88 },
  { name: "Quick Learner", level: 92 },
];
