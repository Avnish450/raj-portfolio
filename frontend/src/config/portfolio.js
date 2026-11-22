/**
 * Raj's Portfolio Configuration
 * Centralized content file for easy maintenance and editing.
 */

export const PORTFOLIO_CONFIG = {
  profile: {
    name: "Raj",
    wordmark: "RAJ.",
    eyebrow: "COMPUTER SCIENCE · AI & MACHINE LEARNING",
    title: "Building ideas into intelligent experiences.",
    bio: "I'm Raj, a computer science student exploring artificial intelligence, software development, and the possibilities of building useful technology.",
    role: "Student Developer",
    degree: "Computer Science Engineering",
    specialization: "AI & Machine Learning",
    location: "Bengaluru, India (Editable)",
    status: "Exploring distributed systems & generative models",
  },

  about: {
    sectionNumber: "01 — ABOUT",
    heading: "Curiosity drives what I build.",
    paragraphs: [
      "I'm a CSE AIML student interested in the intersection of software engineering and intelligent systems. I enjoy exploring new technologies, experimenting with ideas, and developing projects that turn concepts into practical experiences.",
      "My focus is on learning by building—understanding how things work, improving my technical skills, and creating projects that solve meaningful problems.",
    ],
  },

  projects: [
    {
      id: "project-01",
      number: "01",
      name: "Project One",
      status: "EDIT PROJECT DETAILS",
      tagline: "Architecture & Machine Learning",
      description:
        "Replace this with a short description of a project, what it does, and the problem it aims to solve.",
      stack: ["Python", "PyTorch", "Flask", "Docker"],
      layoutStyle: "asymmetric-split",
      githubUrl: "", // Set URL to show button (e.g. "https://github.com/username/project-1")
      demoUrl: "", // Set URL to show live demo button
      metrics: [
        { label: "Architecture", value: "Transformer / Feedforward" },
        { label: "Interface", value: "REST API + Web Client" },
      ],
    },
    {
      id: "project-02",
      number: "02",
      name: "Project Two",
      status: "EDIT PROJECT DETAILS",
      tagline: "Full-Stack Development & Data Pipeline",
      description:
        "Replace this with an explanation of an application, experiment, or development project.",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      layoutStyle: "spec-grid",
      githubUrl: "",
      demoUrl: "",
      metrics: [
        { label: "Data Pipeline", value: "Async Event Processing" },
        { label: "Storage", value: "Relational Schema + Cache" },
      ],
    },
    {
      id: "project-03",
      number: "03",
      name: "Project Three",
      status: "EDIT PROJECT DETAILS",
      tagline: "Systems & Computational Experiments",
      description:
        "Add details about a project involving software development, AI, data, or another technical interest.",
      stack: ["C++", "Python", "NumPy", "CUDA"],
      layoutStyle: "terminal-log",
      githubUrl: "",
      demoUrl: "",
      metrics: [
        { label: "Execution", value: "Vectorized Native Kernel" },
        { label: "Benchmark", value: "Sub-millisecond latency" },
      ],
    },
  ],

  toolkit: {
    sectionNumber: "02 — TOOLKIT", // user spec: Section 5 SKILLS / TOOLKIT
    heading: "Technologies & tools.",
    categories: [
      {
        name: "Programming",
        description: "Core languages used for problem solving and backend systems",
        skills: ["Python", "Java", "C++", "JavaScript"],
      },
      {
        name: "Web",
        description: "Foundational and modern technologies for web interfaces",
        skills: ["HTML", "CSS", "React"],
      },
      {
        name: "Tools",
        description: "Essential workflow, version control, and development environments",
        skills: ["Git", "VS Code"],
      },
    ],
  },

  feedback: {
    sectionNumber: "04 — FEEDBACK",
    heading: "Your thoughts are welcome.",
    subtext:
      "Take a moment to share your thoughts about the website. Feedback, suggestions, and constructive criticism are always appreciated.",
    categories: [
      "Design & UI",
      "Projects",
      "Content",
      "Suggestions",
      "Other",
    ],
  },

  socials: {
    github: "", // e.g. "https://github.com/raj"
    linkedin: "", // e.g. "https://linkedin.com/in/raj"
    email: "raj.developer.contact@gmail.com",
  },
};

// API base URL configuration:
// In local development, defaults directly to Flask backend at http://127.0.0.1:5001.
// In production, set VITE_API_BASE_URL to your deployed backend URL.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:5001"
    : "");
