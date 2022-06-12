import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Text, Badge } from "../display";
import { useRouter } from "next/router";

type Technology =
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
  | "NodeJS";

const technologyColorMap: Record<Technology, any> = {
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
  NodeJS: "orange"
};

interface Experience {
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
}

const experiences: Experience[] = [
  {
    title: "Airborne",
    when: "April 2021 - August 2021",
    startDate: new Date("2021-04-01"),
    endDate: new Date("2021-08-01"),
    role: "Full Stack Developer Intern",
    coverImages: {
      light: "/airborne/logo.png",
      dark: "/airborne/logo-dark.png"
    },
    description:
      "Developed sales-engagement web app for creating sales sequences, sending emails, and tracking performance.",
    technologies: ["React", "TypeScript", "Redux", "SCSS", "Go"]
  },
  {
    title: "Air Whistle Media",
    when: "June 2021 - Current",
    startDate: new Date("2020-06-01"),
    endDate: new Date(),
    role: "Frontend Developer",
    coverImages: {
      light: "/airwhistle/logo.svg",
      dark: "/airwhistle/logo-dark.svg"
    },
    description: "Worked alongside designers to build responsive, AODA-compliant websites.",
    technologies: ["Vue", "JavaScript", "Angular", "ThreeJS"]
  },
  {
    title: "Demand Science",
    when: "September 2021 - April 2022",
    startDate: new Date("2021-09-01"),
    endDate: new Date("2021-04-01"),
    role: "Frontend Developer",
    coverImages: {
      light: "/demand-science/logo.svg",
      dark: "/demand-science/logo-dark.svg"
    },
    description:
      "Developed custom UI components for the Demand Science platform, as well as Leadiro.",
    technologies: ["React", "TypeScript", "NextJS", "TailwindCSS"]
  },
  {
    title: "Fig",
    when: "April 2022 - Current",
    startDate: new Date("2022-04-01"),
    endDate: new Date(),
    role: "Frontend Developer",
    coverImages: {
      light: "/fig/logo.svg",
      dark: "/fig/logo-dark.svg"
    },
    description: "Developing a custom UI library for Fig, and maintaining the Fig website.",
    technologies: ["React", "TypeScript", "NextJS", "TailwindCSS", "NodeJS"]
  }
];

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

export const Experiences = ({ ...props }: Props) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience>();
  const router = useRouter();

  const onExperienceClick = (experience: Experience | undefined) => {
    if (!experience) {
      setSelectedExperience(undefined);
      return;
    }
    if (selectedExperience?.title === experience?.title) {
      setSelectedExperience(undefined);
    } else {
      setSelectedExperience(experience);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.debug(e.key);
      switch (e.key) {
        case "ArrowRight":
          if (selectedExperience) {
            const index = experiences.findIndex((e) => e.title === selectedExperience.title);
            onExperienceClick(
              index < experiences.length - 1 ? experiences[index + 1] : experiences[0]
            );
          }
          break;
        case "ArrowLeft":
          if (selectedExperience) {
            const index = experiences.findIndex((e) => e.title === selectedExperience.title);
            onExperienceClick(
              index > 0 ? experiences[index - 1] : experiences[experiences.length - 1]
            );
          }
          break;
        case "Escape":
          onExperienceClick(undefined);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences, selectedExperience]);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      const experience = experiences.find((experience) => toKebabCase(experience.title) === hash);
      if (selectedExperience?.title !== experience?.title) {
        onExperienceClick(experience);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const cardStyles = `
    group
    flex flex-col items-center sm:items-start w-full
    sm:text-left
    overflow-hidden
    border-2
    border-zinc-200 dark:border-zinc-700 focus:border-emerald-500/30 dark:focus:border-indigo-500/30
    rounded-2xl
    cursor-pointer
    bg-white dark:bg-neutral-900 
    focus:outline-none 
    focus-within:outline-none
    focus:ring-0
  `;

  return (
    <div {...props}>
      <div className="grid gap-6 lg:grid-cols-2">
        {experiences.map((experience) => (
          <motion.button
            key={experience.title}
            layoutId={toKebabCase(experience.title)}
            onClick={() => onExperienceClick(experience)}
            onFocus={() => onExperienceClick(undefined)}
            className={`${cardStyles}`}
          >
            <motion.div className="h-48 w-full grid place-items-center overflow-hidden relative  border-b-2 border-primary dark:bg-black">
              <div className="filter animate-hueshift absolute bottom-0 right-0 top-0">
                <div className="gb1 w-[40rem] h-[60rem] duration-300 origin-center opacity-20 transition-all pointer-events-none" />
              </div>
              <motion.img
                src={experience.coverImages.light}
                className="w-3/4 md:h-12 md:w-1/2 object-scale-down transition-transform duration-300 group-hover:scale-110 dark:hidden relative"
              />
              <motion.img
                src={experience.coverImages.dark}
                className="w-3/4 md:h-12 md:w-1/2 object-scale-down transition-transform duration-300 group-hover:scale-110 hidden dark:block relative"
              />
            </motion.div>
            <motion.div className="w-full flex flex-col items-center md:items-start p-6">
              <motion.div className="flex flex-col md:flex-row justify-between w-full items-center xl:items-start">
                <Text variant="h3" className="font-medium" as={motion.h3}>
                  {experience.title}
                </Text>
                <Text variant="h6" as={motion.h6}>
                  {experience.when}
                </Text>
              </motion.div>
              <Text variant="h5" className="mt-2 md:mt-0" as={motion.h5}>
                {experience.role}
              </Text>
              <motion.div className="flex items-center justify-center md:justify-start flex-wrap gap-2 mt-auto pt-4">
                {experience.technologies.map((technology) => (
                  <Badge color={technologyColorMap[technology as Technology]} key={technology}>
                    {technology}
                  </Badge>
                ))}
              </motion.div>
            </motion.div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selectedExperience && (
          <motion.div className="fixed inset-0">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black"
              transition={{ duration: 0.1 }}
              onClick={() => onExperienceClick(undefined)}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 0.3
              }}
              exit={{
                opacity: 0
              }}
            />
            <motion.div className="container max-w-6xl absolute z-20 inset-0 flex items-center pointer-events-none">
              {/* Selected Card */}
              <motion.button
                transition={{ duration: 0.3 }}
                layoutId={toKebabCase(selectedExperience.title)}
                className={`${cardStyles} shadow-xl cursor-auto pointer-events-auto `}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div className="h-72 sm:h-96 w-full">
                  <motion.img
                    src={selectedExperience.coverImages.light}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                <motion.div className="p-6 w-full border-t border-neutral-50 dark:border-neutral-700">
                  <motion.div className="flex flex-col md:flex-row justify-between w-full md:items-center mb-2 md:mb-0">
                    <Text variant="h3" className="font-medium" as={motion.h3}>
                      {selectedExperience.title}
                    </Text>
                    <Text variant="h6" as={motion.h6}>
                      {selectedExperience.when}
                    </Text>
                  </motion.div>
                  <Text variant="h4" className="mb-2" as={motion.h4}>
                    {selectedExperience.role}
                  </Text>

                  <Text variant="body2" className="max-w-lg">
                    {selectedExperience.description}
                  </Text>
                  <motion.div className="flex items-center flex-wrap gap-2 mt-auto pt-6">
                    {selectedExperience.technologies.map((technology) => (
                      <Badge color={technologyColorMap[technology as Technology]} key={technology}>
                        {technology}
                      </Badge>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
