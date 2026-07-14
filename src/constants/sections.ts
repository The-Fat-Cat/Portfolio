import type { SectionData } from "../types";

export const SECTIONS: SectionData[] = [
  {
    id: "section-thinking",
    navLabel: "Thinking",
    bgTitle: "THINKING",
    badge: "01 // CONCEPTUALIZATION",
    title: "Creative Problem Solving",
    bullets: [
      { number: "01", text: "System Design" },
      { number: "02", text: "UX Architect" },
      { number: "03", text: "Design Thinking" },
    ],
    description:
      "Analyzing complex problems and structuring them into elegant digital frameworks. I architect systems that align user needs with robust technical capability from day zero.",
  },
  {
    id: "section-planning",
    navLabel: "Planning",
    bgTitle: "PLANNING",
    badge: "02 // ARCHITECTURE",
    title: "Technical Scoping",
    bullets: [
      { number: "01", text: "Agile Roadmapping" },
      { number: "02", text: "Data Architecture" },
      { number: "03", text: "Feasibility Engineering" },
    ],
    description:
      "Mapping out every lifecycle stage of the application. Designing scalable schemas, establishing API specs, and streamlining sprints to turn concepts into predictable timelines.",
  },
  {
    id: "section-execution",
    navLabel: "Execution",
    bgTitle: "EXECUTION",
    badge: "03 // ENGINEERING",
    title: "Full-Stack Engineering",
    bullets: [
      { number: "01", text: "Production Performance" },
      { number: "02", text: "Clean Architecture" },
      { number: "03", text: "Fluid Motion Systems" },
    ],
    description:
      "Writing pixel-perfect, production-grade code that executes seamlessly. Maximizing performance metrics, prioritizing maintainable design patterns, and implementing rich micro-interactions.",
  },
  {
    id: "section-contact",
    navLabel: "Contact",
    bgTitle: "CONTACT",
    badge: "04 // CONNECT",
    title: "Let's build something real",
    description:
      "Interested in custom design engineering, interactive video setups, or contract work?",
    formFields: [
      { id: "form-name", label: "Name", placeholder: "Gretel Rodriguez", type: "text" },
      { id: "form-email", label: "Email", placeholder: "gretel@example.com", type: "email" },
      { id: "form-message", label: "Message", placeholder: "Describe your project vision...", type: "textarea" },
    ],
    socialLinks: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
      { label: "Twitter", url: "#" },
      { label: "gretel@example.com", url: "mailto:gretel@example.com", highlight: true },
    ],
  },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);
export const NAV_PROGRESS = [0.10, 0.40, 0.65, 0.90];
