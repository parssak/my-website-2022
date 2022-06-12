import { Text } from "components/display";
import { Experience, experiences, TailwindColor, technologyColorMap } from "data";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

interface Item {
  startDate: Date;
  endDate: Date;
}

interface ILayoutNode {
  id: string;
  x: number;
  width: number;
  data: Experience;
}

export const Timeline = ({ ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const computeLayoutNodes = (items: Experience[]): ILayoutNode[] => {
    const sortedItems = items.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const start = new Date(sortedItems[0].startDate);
    const end = new Date(sortedItems[sortedItems.length - 1].endDate);

    // at least 1 week long
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const layoutRangeMs = Math.max(end.getTime() - start.getTime(), ONE_WEEK_MS);

    const layoutNodes: ILayoutNode[] = sortedItems.map((item, index) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const width = (endDate.getTime() - startDate.getTime()) / layoutRangeMs;
      return {
        id: `node-${index}`,
        x: (startDate.getTime() - start.getTime()) / layoutRangeMs,
        width,
        data: item
      };
    });
    return layoutNodes;
  };

  const computeMonthNodes = (items: Experience[]) => {
    const sortedItems = items.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const start = new Date(sortedItems[0].startDate);
    const end = new Date(sortedItems[sortedItems.length - 1].endDate);

    const numMonths =
      (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

    const monthNodes: {
      x: number;
      width: number;
      id: string;
      label: string;
    }[] = [];
    for (let i = 0; i < numMonths; i++) {
      const startDate = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const endDate = new Date(start.getFullYear(), start.getMonth() + i + 1, 1);
      const width = (endDate.getTime() - startDate.getTime()) / (end.getTime() - start.getTime());
      // check if start is beginning of year

      monthNodes.push({
        x: (startDate.getTime() - start.getTime()) / (end.getTime() - start.getTime()),
        width,
        id: `month-${i}`,
        label: `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`
      });
    }
    return monthNodes;
  };

  const layoutNodes = useMemo(() => computeLayoutNodes(experiences), []);
  const monthNodes = useMemo(() => computeMonthNodes(experiences), []);
  const scale = 100;

  const computeGradient = (experience: Experience) => {
    // Using the 200 level for each tailwind color
    const colorMap: Record<TailwindColor, string> = {
      cyan: "#A5F3FC",
      blue: "#BFDBFE",
      sky: "#BAE6FD",
      pink: "#FBCFE8",
      purple: "#E9D5FF",
      green: "#BBF7D0",
      yellow: "#FEF08A",
      gray: "#E5E7EB",
      red: "#FECACA",
      rose: "#FECDD3",
      orange: "#FED7AA"
    };

    const colors = experience.technologies.map((tech) => colorMap[technologyColorMap[tech]]);

    return "linear-gradient(to right, " + colors.join(", ") + ")";
  };

  return (
    <>
      <div {...props} className="space-y-2 relative pb-4" ref={ref}>
        <div className="absolute inset-0">
          {monthNodes.map((node) => (
            <div
              key={node.id}
              className={`
                h-full
                absolute
                dark:opacity-50
                transition
                group
                translate-x-1/2
                flex flex-col
                items-center
              `}
              style={{
                left: `${node.x * scale}%`,
                width: `${node.width * scale}%`
              }}
            >
              <div
                className={`
                h-full 
                border-r
                group-hover:border-red-500
                border-primary
                ${node.label.includes("-01") ? "" : "border-dashed"}
                relative
                `}
              >
                <div
                  className={`
                absolute
                bottom-0
                right-0
                translate-x-1/2
                translate-y-full
                flex flex-col items-center
              `}
                >
                  <div
                    className="
                  w-2
                  h-2
                  bg-red-500
                  rounded-full
                  absolute
                  group-hover:opacity-100"
                  />
                </div>
              </div>
              {/* <div
                className={`
                  w-1.5
                  h-1.5
                  bg-red-500
                  rounded-full
                  absolute
                  group-hover:opacity-100
                  opacity-0
                  transition
                  bottom-0
                  right-0
                  translate-x-1/2`}
              />
              <Text
                variant="body2"
                className={`
                  absolute
                  bottom-0
                  translate-y-full
                  origin-left
                  text-xs
                  transition
                  group-hover:text-red-500
                  `}
              >
                {node.label.includes("01") ? node.label.split("-")[0] : <></>}
              </Text> */}
            </div>
          ))}
        </div>
        {layoutNodes.map((node, index) => (
          <button
            key={node.id}
            className="h-8 group transition relative block whitespace-nowrap rounded-lg border-2 border-white/70"
            style={{
              left: `${node.x * scale}%`,
              width: `${node.width * scale}%`,
              background: computeGradient(node.data)
            }}
          >
            <span
              className={`
                absolute
                inset-y-0
                place-items-center
                text-sm
                md:grid
                ${
                  index + 1 > Math.floor(layoutNodes.length / 2)
                    ? "text-right right-full pr-2 "
                    : "text-left left-full pl-2 "
                }
          `}
            >
              {node.data.title}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};
