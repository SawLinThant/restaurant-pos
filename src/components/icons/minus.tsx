import { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface MinusIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const MinusIcon = ({ className, ...props }: MinusIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="2"
      viewBox="0 0 14 2"
      fill="none"
      className={cn("z-10 stroke-white", className)}
      {...props}
    >
      <path
        d="M1 1H13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MinusIcon;
