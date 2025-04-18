import { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface PlusIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusIcon = ({ className, ...props }: PlusIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M8 1V15M1 8H15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
