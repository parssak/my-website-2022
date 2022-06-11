/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import { Text } from "components/display/Text";
import { Button } from "components/inputs/Button";
import HeroScene from "components/canvas/HeroScene";
import { useState } from "react";
import { Experiences } from "components/home/Experiences";

const Home: NextPage = () => {
  return (
    <>
      <div className="absolute z-0 right-0 left-0 -top-24">
        <HeroScene />
      </div>

      <div className="z-10 overflow-hidden">
        <main className="container md:min-h-screen grid lg:items-center overflow-hidden">
          <div className="mt-96 text-center lg:text-left relative ">
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
              <Button size="xl" theme="primary">
                Get in touch
              </Button>
              <Button size="xl" theme="ghost">
                Learn More
              </Button>
            </div>
          </div>
        </main>

        <section className="container">
          <div className="py-24 grid gap-12 lg:grid-cols-2 overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 rounded-2xl">
            <div className="grid place-items-center italic text-center">
              [[ insert particle thing here ]]
            </div>
            <div className="relative px-6 lg:pr-6">
              <div className="filter animate-hueshift">
                <div className="gb1 w-[40rem] h-[60rem] absolute -top-24 right-[-20rem] duration-300 animate-spin-slow origin-center opacity-20 transition-all pointer-events-none" />
              </div>
              <div className="relative">
                <Text variant="h2" className="mb-4">
                  Who am I?
                </Text>
                <div className="space-y-4 max-w-xl">
                  <Text variant="body1" className="font-medium">
                    A frontend developer passionate about building useful tools.
                  </Text>
                  <Text variant="body1">
                    I'm experienced in building web apps in Next.js, component libraries in React
                    with TypeScript, and websites with Vue.js. I take accessibility and user
                    experience very seriously.
                  </Text>
                  <Text variant="body1">
                    In my free time, I love tinkering with all sorts of technologies and learning
                    new things. I'm currently exploring reinforcement learning with PyTorch, and
                    Unity MLAgents.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-24 relative overflow-visible">
          <div className="relative z-10">
            <Text variant="h2" className="mb-6">
              What I've Done
            </Text>

            <Experiences />
          </div>
          <div className="filter animate-hueshift absolute top-1/2 -left-96">
            <div className="gb1 w-[50rem] h-[40rem] rotate-[60deg] opacity-30 dark:opacity-20 transition-all pointer-events-none" />
          </div>
          <div className="filter animate-hueshift absolute -bottom-48 -right-80">
            <div className="gb2 w-[32rem] h-[24rem] rotate-[-80deg] opacity-20 transition-all pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
