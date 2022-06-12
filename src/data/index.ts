export type Technology =
  | "C#"
  | "Unity"
  | "React"
  | "TypeScript"
  | "SCSS"
  | "TailwindCSS"
  | "Go"
  | "Redux"
  | "Vue"
  | "JavaScript"
  | "NextJS"
  | "Angular"
  | "ThreeJS"
  | "NodeJS"
  | "Swift"
  | "MongoDB"
  | "Express"
  | "Electron";

export type TailwindColor =
  | "cyan"
  | "blue"
  | "sky"
  | "pink"
  | "purple"
  | "green"
  | "yellow"
  | "gray"
  | "red"
  | "rose"
  | "orange";

export const technologyColorMap: Record<Technology, TailwindColor> = {
  "C#": "green",
  Unity: "gray",
  Swift: "orange",
  React: "cyan",
  TypeScript: "blue",
  Go: "sky",
  SCSS: "pink",
  Redux: "purple",
  Vue: "green",
  JavaScript: "yellow",
  NextJS: "gray",
  Angular: "red",
  ThreeJS: "rose",
  TailwindCSS: "sky",
  NodeJS: "orange",
  MongoDB: "green",
  Express: "yellow",
  Electron: "sky"
};

export interface Experience {
  title: string;
  when: string;
  startDate: Date;
  endDate: Date;
  role: string;
  description: string;
  coverImages: {
    light: string;
    dark: string;
  };
  technologies: Technology[];
  type: "work" | "project";
}

export const experiences: Experience[] = [
  {
    title: "Kazakan",
    when: "April 2020 -> September 2020",
    startDate: new Date("2020-04-01"),
    endDate: new Date("2020-09-01"),
    role: "Game Development",
    coverImages: {
      light: "/airborne/logo.png",
      dark: "/airborne/logo-dark.png"
    },
    description:
      "Created top-down shooter iOS & Android game where you protect the Orb from waves of enemies. I also created all the artwork from scratch.",
    technologies: ["C#", "Unity"],
    type: "project"
  },
  {
    title: "Darco",
    when: "September 2020 -> December 2020",
    startDate: new Date("2020-09-01"),
    endDate: new Date("2020-12-31"),
    role: "Web Development",
    coverImages: {
      light: "/airborne/logo.png",
      dark: "/airborne/logo-dark.png"
    },
    description:
      "Developed web app for converting PDFs to dark mode. Shipped a version for iPad OS as well.",
    technologies: ["React", "TypeScript", "Swift", "Redux"],
    type: "project"
  },
  {
    title: "MixBot",
    when: "December 2020 -> March 2021",
    startDate: new Date("2020-12-31"),
    endDate: new Date("2021-03-01"),
    role: "Software Development",
    coverImages: {
      light: "/airborne/logo.png",
      dark: "/airborne/logo-dark.png"
    },
    description:
      "Developed web app that acts as a DJ, by finding songs, loading them onto a virtual DJ board and plays a set.",
    technologies: ["React", "TypeScript", "MongoDB", "Electron"],
    type: "project"
  },
  {
    title: "Browser Engine",
    when: "August 2021 -> October 2021",
    startDate: new Date("2021-08-01"),
    endDate: new Date("2021-12-01"),
    role: "Full Stack Developer Intern",
    coverImages: {
      light: "/airborne/logo.png",
      dark: "/airborne/logo-dark.png"
    },
    description:
      "Developed a 3D game engine that runs entirely in the browser. Allows for component scripting using a ECS with three.js, as well as GLSL shaders.",
    technologies: ["React", "TypeScript", "ThreeJS"],
    type: "project"
  },
  {
    title: "Airborne",
    when: "April 2021 -> Septemeber 2021",
    startDate: new Date("2021-04-01"),
    endDate: new Date("2021-09-01"),
    role: "Full Stack Developer Intern",
    coverImages: {
      light: "/airborne/logo.png",
      dark: "/airborne/logo-dark.png"
    },
    description:
      "Developed sales-engagement web app for creating sales sequences, sending emails, and tracking performance.",
    technologies: ["React", "TypeScript", "Redux", "SCSS", "Go"],
    type: "work"
  },
  {
    title: "Demand Science",
    when: "September 2021 -> April 2022",
    startDate: new Date("2021-09-01"),
    endDate: new Date("2022-04-01"),
    role: "Frontend Developer",
    coverImages: {
      light: "/demand-science/logo.svg",
      dark: "/demand-science/logo-dark.svg"
    },
    description:
      "Developed custom UI components for the Demand Science platform, as well as Leadiro.",
    technologies: ["React", "TypeScript", "NextJS", "TailwindCSS"],
    type: "work"
  },
  {
    title: "Air Whistle Media",
    when: "June 2021 -> Current",
    startDate: new Date("2021-06-01"),
    endDate: new Date(),
    role: "Frontend Developer",
    coverImages: {
      light: "/airwhistle/logo.svg",
      dark: "/airwhistle/logo-dark.svg"
    },
    description: "Worked alongside designers to build responsive, AODA-compliant websites.",
    technologies: ["Vue", "JavaScript", "Angular", "ThreeJS"],
    type: "work"
  },
  {
    title: "Fig",
    when: "April 2022 -> Current",
    startDate: new Date("2022-04-01"),
    endDate: new Date(),
    role: "Frontend Developer",
    coverImages: {
      light: "/fig/logo.svg",
      dark: "/fig/logo-dark.svg"
    },
    description: "Developing a custom UI library for Fig, and maintaining the Fig website.",
    technologies: ["React", "TypeScript", "NextJS", "TailwindCSS", "NodeJS"],
    type: "work"
  }
];
