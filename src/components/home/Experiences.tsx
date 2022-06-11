import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Text, Badge } from "../display";

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
  role: string;
  description: string;
  technologies: Technology[];
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Experiences = ({ ...props }: Props) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience>();

  const onExperienceClick = (experience: Experience) => {
    if (selectedExperience?.title === experience.title) {
      setSelectedExperience(undefined);
    } else {
      setSelectedExperience(experience);
    }
  };

  const experiences: Experience[] = [
    {
      title: "Airborne",
      when: "April 2021 - August 2021",
      role: "Full Stack Developer Intern",
      description:
        "Developed sales-engagement web app for creating sales sequences, sending emails, and tracking performance.",
      technologies: ["React", "TypeScript", "Redux", "SCSS", "Go"]
    },
    {
      title: "Air Whistle Media",
      when: "June 2021 - Current",
      role: "Frontend Developer",
      description: "Worked alongside designers to build responsive, AODA-compliant websites.",
      technologies: ["Vue", "JavaScript", "Angular", "ThreeJS"]
    },
    {
      title: "Demand Science",
      when: "September 2021 - April 2022",
      role: "Frontend Developer",
      description:
        "Developed custom UI components for the Demand Science platform, as well as Leadiro.",
      technologies: ["React", "TypeScript", "NextJS", "TailwindCSS"]
    },
    {
      title: "Fig",
      when: "April 2022 - Current",
      role: "Frontend Developer",
      description: "Developing a custom UI library for Fig, and maintaining the Fig website.",
      technologies: ["React", "TypeScript", "NextJS", "TailwindCSS", "NodeJS"]
    }
  ];

  const cardStyles = `
    flex flex-col items-start w-full
    text-left
    overflow-hidden
    border
    border-zinc-200 hover:border-emerald-500/30 dark:border-zinc-900 dark:hover:border-indigo-500/30 focus:border-emerald-500/30 dark:focus:border-indigo-500/30
    rounded-xl
    cursor-pointer
    bg-white dark:bg-neutral-900 
    focus:outline-none 
  `;

  return (
    <div {...props}>
      <div className="grid gap-4 lg:grid-cols-2">
        {experiences.map((experience) => (
          <motion.button
            key={experience.title}
            layoutId={experience.title}
            onClick={() => onExperienceClick(experience)}
            onFocus={() => {
              setSelectedExperience(undefined);
            }}
            className={cardStyles}
          >
            <motion.div className="h-48 bg-violet-500 w-full"></motion.div>
            <motion.div className="p-5 w-full">
              <motion.div className="flex justify-between w-full items-center">
                <Text variant="h3" className="font-medium" as={motion.h3}>
                  {experience.title}
                </Text>
                <Text variant="h6" as={motion.h6}>
                  {experience.when}
                </Text>
              </motion.div>
              <Text variant="h4" className="mb-1" as={motion.h4}>
                {experience.role}
              </Text>
              <motion.div className="flex items-center flex-wrap gap-2 mt-auto pt-4">
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
            <motion.div
              className="fixed inset-0 bg-black"
              transition={{ duration: 0.1 }}
              onClick={() => setSelectedExperience(undefined)}
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
            <motion.div className="container max-w-5xl absolute z-20 inset-0 flex items-center pointer-events-none">
              <motion.button
                transition={{ duration: 0.3 }}
                layoutId={selectedExperience.title}
                className={`${cardStyles} shadow-xl !border-violet-500 cursor-default pointer-events-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div className="h-96 bg-violet-500 w-full"></motion.div>
                <motion.div className="p-5 w-full">
                  <motion.div className="flex justify-between w-full items-center">
                    <Text variant="h3" className="font-medium" as={motion.h3}>
                      {selectedExperience.title}
                    </Text>
                    <Text variant="h6" as={motion.h6}>
                      {selectedExperience.when}
                    </Text>
                  </motion.div>
                  <Text variant="h4" className="mb-1" as={motion.h4}>
                    {selectedExperience.role}
                  </Text>

                  <Text variant="body2" className="max-w-lg">
                    {selectedExperience.description}
                  </Text>
                  <motion.div className="flex items-center flex-wrap gap-2 mt-auto pt-4">
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
