import cn from "classnames";
import { SVGProps } from "react";

export default function SvgIcon({ children, className, ...args }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("svg-icon", className)}
      {...args}
    >
      {children}
    </svg>
  );
}
