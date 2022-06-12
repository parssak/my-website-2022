import { TailwindColor } from "data";
import { useClassNames } from "hooks/useClassNames";
import React from "react";



// border-red-700 border-yellow-700 border-green-700 border-blue-700 border-cyan-700 border-sky-700 border-purple-700 border-pink-700 border-indigo-700 border-gray-700 border-rose-700 border-orange-700
// bg-red-200 bg-yellow-200 bg-green-200 bg-blue-200 bg-cyan-200 bg-sky-200 bg-purple-200 bg-pink-200 bg-indigo-200 bg-gray-200 bg-rose-200 bg-orange-200
// dark:bg-red-800 dark:bg-yellow-800 dark:bg-green-800 dark:bg-blue-800 dark:bg-cyan-800 dark:bg-sky-800 dark:bg-purple-800 dark:bg-pink-800 dark:bg-indigo-800 dark:bg-gray-800 dark:bg-rose-800 dark:bg-orange-800
// hover:bg-red-300 hover:bg-yellow-300 hover:bg-green-300 hover:bg-blue-300 hover:bg-cyan-300 hover:bg-sky-300 hover:bg-purple-300 hover:bg-pink-300 hover:bg-indigo-300 hover:bg-gray-300 hover:bg-rose-300 hover:bg-orange-300
// text-red-700 text-yellow-700 text-green-700 text-blue-700 text-cyan-700 text-sky-700 text-purple-700 text-pink-700 text-indigo-700 text-gray-700 text-rose-700 text-orange-700
// dark:text-red-300 dark:text-yellow-300 dark:text-green-300 dark:text-blue-300 dark:text-cyan-300 dark:text-sky-300 dark:text-purple-300 dark:text-pink-300 dark:text-indigo-300 dark:text-gray-300 dark:text-rose-300 dark:text-orange-300

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: TailwindColor;
  size?: "md" | "lg";
  rounded?: boolean;
  outline?: boolean;
  children: React.ReactNode;
  // Interactions
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void | undefined;
  disabled?: boolean;
  onDelete?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  deleteIcon?: React.ReactNode;
}

export function Badge({
  color,
  size = "md",
  rounded = false,
  outline = false,
  className,

  // Interactions
  onClick,
  disabled,
  onDelete,
  deleteIcon,
  children,
  ...props
}: BadgeProps) {
  const classNames = useClassNames(() => {
    const base = `inline-flex items-center font-medium border border-transparent transition`;
    const sizes = {
      md: `text-xs py-0.5 rounded px-2.5`,
      lg: `text-sm py-0.5 rounded px-3`,
    };

    const clickable = !!onClick && !disabled;
    const colorClass = outline
      ? `border-${color}-700 ${clickable ? "hover:bg-gray-50" : ""}`
      : `bg-${color}-200 text-${color}-700 dark:bg-${color}-800 dark:text-${color}-300 ${
          clickable ? `hover:bg-${color}-300` : ""
        }`;
    return [
      base,
      sizes[size],
      colorClass,
      rounded && "rounded-full",
      clickable && "cursor-pointer",
      className,
    ];
  }, [color, size, rounded, outline, disabled, onClick, className, onDelete]);

  return (
    <span {...props} onClick={onClick} className={classNames}>
      {children}
    </span>
  );
}
