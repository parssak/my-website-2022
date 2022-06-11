import { useClassNames } from "hooks/useClassNames";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Input({
  leadingIcon,
  trailingIcon,
  className,
  ...props
}: InputProps) {
  const classNames = useClassNames(() => {
    const base =
      "bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

    const leadingIconClass = leadingIcon && "pl-7";
    const trailingIconClass = trailingIcon && "pr-7";

    return [base, leadingIconClass, trailingIconClass, className] as any;
  }, [className, leadingIcon]);

  return (
    <div className="relative flex items-center">
      {leadingIcon && <div className="absolute left-2">{leadingIcon}</div>}
      <input {...props} className={classNames} />
      {trailingIcon && <div className="absolute right-2">{trailingIcon}</div>}
    </div>
  );
}
