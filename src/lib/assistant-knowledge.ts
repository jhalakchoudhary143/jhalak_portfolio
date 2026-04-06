import { ABOUT_TEXT, PROJECTS, SITE, SOFT_SKILLS, SOCIAL, TECH_SKILLS } from "./constants";

export function buildAssistantSystemPrompt(): string {
  const tech = TECH_SKILLS.map((s) => `${s.name} (~${s.level}%)`).join(", ");
  const soft = SOFT_SKILLS.map((s) => s.name).join(", ");
  const projects = PROJECTS.map((p) => `${p.title}: ${p.description}`).join("\n");

  return `You are "Jhalak Assistant", a friendly guide on ${SITE.name}'s portfolio website.
Speak in first person as Jhalak's assistant (e.g. "Jhalak is..." or "She has worked on..."). Keep answers concise (2–5 sentences) unless asked for detail.
Do not invent employers, employers' names, or credentials not listed below. If unsure, say you only know what's on the portfolio and suggest using the contact form.

Facts about Jhalak:
- Name: ${SITE.name}
- ${ABOUT_TEXT}
- Technical skills (with rough proficiency): ${tech}
- Soft skills: ${soft}
- Social: LinkedIn ${SOCIAL.linkedin}, GitHub ${SOCIAL.github}
- Sample projects:
${projects}
`;
}

export function fallbackAnswer(question: string): string {
  const q = question.toLowerCase().trim();
  if (!q) {
    return "Hi! Ask me about Jhalak’s studies, skills, projects, or how to reach her.";
  }

  if (/^(hi|hello|hey|namaste|good\s*(morning|afternoon|evening))\b/.test(q)) {
    return "Hello! I’m Jhalak’s assistant. Ask me about her background, tech stack, projects, or social links.";
  }

  if (/(who|what).*(jhalak|she|portfolio)|about jhalak|tell me about/.test(q)) {
    return `${ABOUT_TEXT} Use the Skills and Projects sections on this page for more detail.`;
  }

  if (/(cgpa|gpa|grade|semester|year|student|college|b\.?tech|education)/.test(q)) {
    return "Jhalak is a B.Tech student in her 2nd year, 4th semester, with a CGPA of 8.37..";
  }

  if (/(skill|tech|stack|know|language|framework)/.test(q)) {
    return `Technically she focuses on ${TECH_SKILLS.map((s) => s.name).join(", ")}. Soft skills include ${SOFT_SKILLS.map((s) => s.name).join(", ")}.`;
  }

  if (/(project|built|portfolio|app|dashboard)/.test(q)) {
    return `She highlights projects like ${PROJECTS.slice(0, 3).map((p) => p.title).join(", ")}, and more in the Projects section.`;
  }

  if (/(contact|email|reach|linkedin|github|instagram|social|hire)/.test(q)) {
    return `You can use the contact form on this site and find her on LinkedIn, GitHub, and Instagram — links are in the Contact section and footer.`;
  }

  if (/(assistant|who are you|your name)/.test(q)) {
    return "I’m Jhalak Assistant — a small guide on this portfolio. I answer questions about Jhalak based on what’s published here.";
  }

  return `I only know what’s on this portfolio. Jhalak is a ${ABOUT_TEXT.split(".")[0]}. Try asking about skills, projects, CGPA, or how to connect — or use the contact form for a direct message.`;
}
