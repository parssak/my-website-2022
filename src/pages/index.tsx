/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import { Text } from "components/display/Text";
import { Button } from "components/inputs/Button";
import HeroScene from "components/canvas/HeroScene";

const Home: NextPage = () => {
  const experiences = [
    {
      title: "Airborne",
      when: "April 2021 - August 2021",
      role: "Full Stack Developer Intern",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, sapiente.",
    },
    {
      title: "Air Whistle Media",
      when: "June 2021 - Current",
      role: "Frontend Developer",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, sapiente.",
    },
    {
      title: "Demand Science",
      when: "September 2021 - April 2022",
      role: "Full Stack Developer",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, sapiente.",
    },
    {
      title: "Fig",
      when: "April 2022 - Current",
      role: "Frontend Developer",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, sapiente.",
    },
  ];
  return (
    <>
      <div className="relative">
        <main className="container md:min-h-screen grid lg:items-center overflow-hidden">
          <div className="absolute -top-0 right-0 left-0 h-full">
            <HeroScene />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100 dark:from-black dark:via-black"></div>
          </div>
          <div className="pt-96 text-center lg:text-left relative">
            <Text variant="h1">Hi. I'm Parssa</Text>
            <Text className="lg:ml-0.5 mt-1 block" variant="caption">
              Frontend Developer @ Fig
            </Text>

            <Text className="mt-12 lg:max-w-xl" variant="body1">
              <span className="hidden lg:inline">
                I love to build awesome things with software.
              </span>{" "}
              I'm passionate about building tools and products that improve people's lives.
            </Text>

            <div className="mt-8 flex flex-col lg:flex-row max-w-sm lg:max-w-none mx-auto lg:ml-0 space-y-4 lg:space-y-0 lg:space-x-2 overflow-visible pt-2 pb-10">
              <Button size="xl" theme="primary" className="shadow-emerald-400">
                Get in touch
              </Button>
              <Button size="xl" theme="ghost">
                Learn More
              </Button>
            </div>
          </div>
        </main>
      </div>

      <section className="container py-24 grid gap-12 lg:grid-cols-2 overflow-visible">
        <div className="grid place-items-center italic text-center">
          [[ insert dope particle thing here ]]
        </div>
        <div className="relative group">
          <div className="filter animate-hueshift">
            <div className="gb1 w-[40rem] h-[40rem] absolute -top-24 right-[-20rem] duration-300 animate-spin-slow origin-center opacity-20 group-hover:opacity-40 transition-all pointer-events-none"></div>
          </div>
          <Text variant="h2" className="mb-4">
            Who I am
          </Text>
          <div className="space-y-4 max-w-xl">
            <Text variant="body1" className="font-medium">
              A frontend developer passionate about building useful tools.
            </Text>
            <Text variant="body1">
              I'm experienced in building web apps in Next.js, websites with Vue.js, and component
              libraries in React with TypeScript. I take accessibility and user experience very
              seriously.
            </Text>
            <Text variant="body1">
              In my free time, I enjoy tinkering with all sorts of technologies and learning new
              things. I'm currently exploring reinforcement learning with PyTorch, and Unity
              MLAgents.
            </Text>
          </div>
        </div>
      </section>

      <div className="container py-24">
        <Text variant="h2" className="mb-6">
          What I've Done
        </Text>
        <div className="grid gap-2 lg:grid-rows-2 lg:grid-cols-7">
          {experiences.map((experience, index) => (
            <div
              key={experience.title}
              className={`
              flex
              flex-col
              p-5
              border
              rounded-lg
              backdrop-blur-lg
              transition-all
              bg-opacity-5
              cursor-pointer
              hover:bg-opacity-10
              dark:hover:bg-opacity-30  
              dark:bg-opacity-20
              bg-zinc-700
              border-zinc-200
              dark:border-zinc-900
              ${index === 0 && "lg:col-span-4"}
              ${index === 1 && "lg:col-span-3"}
              ${index === 2 && "lg:col-span-3"}
              ${index === 3 && "lg:col-span-4"}
          `}
            >
              <Text variant="h3" className="font-medium mb-1">
                {experience.title}
              </Text>
              <Text variant="h4" className="mb-0.5">
                {experience.role}
              </Text>
              <Text variant="h6" className="mb-2">
                {experience.when}
              </Text>
              <Text variant="body2">{experience.description}</Text>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
