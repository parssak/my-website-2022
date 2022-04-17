/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import { Text } from "components/display/Text";
import { Button } from "components/inputs/Button";
import HeroScene from "components/canvas/HeroScene";

const Home: NextPage = () => {
  return (
    <>
      <main className="container min-h-screen grid lg:items-center overflow-hidden">
        <div className="absolute -top-0 right-0 left-0 h-full">
          <HeroScene />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100 dark:from-black dark:via-black"></div>
        </div>
        <div className="pt-96 text-center lg:text-left relative">
          <Text variant="h1">Hi. I'm Parssa</Text>
          <Text className="lg:ml-0.5" variant="caption">
            Frontend Developer @ Fig
          </Text>

          <Text className="mt-12 lg:max-w-xl" variant="body1">
            <span className="hidden lg:inline">I love to build awesome things with software.</span>{" "}
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

      <section className="container py-24">
        <Text variant="h2" className="mb-4">
          What I do
        </Text>
        <div className="space-y-4 max-w-xl">
          <Text variant="body1">
            I'm a frontend developer with a passion for building tools and products that improve
            peoples lives.
          </Text>
          <Text variant="body1">
            I have experience in building web applications in Next.js and React, commercial websites
            with Vue.js, and building professional component libraries in React with TypeScript.
          </Text>
        </div>
      </section>
    </>
  );
};

export default Home;
