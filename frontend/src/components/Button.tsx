import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  clickHandler: Function;
}
const variantClasses = {
  primary: " bg-[#5046E4] text-white",
  secondary: " bg-[#E1E6FF] text-[#5d59e0]",
};
const defaultStyles = "text-lg px-4 py-3 rounded-2xl flex items-center cursor-pointer";

export function Button({
  variant,
  text,
  startIcon,
  clickHandler,
}: ButtonProps) {
  return (
    <div
      className={variantClasses[variant] + " " + defaultStyles}
      onClick={(e) => {
        clickHandler(e)
      }}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
    </div>
  );
}
