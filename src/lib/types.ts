export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  /** e.g. "In progress" — shown as a small badge on the card */
  badge?: string;
  links: ProjectLink[];
};

export type SkillItem = {
  name: string;
  level: number;
};
