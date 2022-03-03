import * as React from "react";
import { SVGProps } from "react";

const SvgFail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 77 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M77 38.5C77 59.768 59.761 77 38.5 77 17.238 77 0 59.768 0 38.5 0 17.245 17.238 0 38.5 0 59.761 0 77 17.245 77 38.5Zm-38.5 7.762a7.141 7.141 0 1 0 0 14.282 7.141 7.141 0 0 0 0-14.282Zm-6.78-25.669 1.152 21.113c.054.988.87 1.762 1.86 1.762h7.536c.99 0 1.806-.774 1.86-1.762l1.152-21.113a1.863 1.863 0 0 0-1.86-1.964h-9.84a1.863 1.863 0 0 0-1.86 1.964Z"
      fill="#EB5757"
    />
  </svg>
);

export default SvgFail;
