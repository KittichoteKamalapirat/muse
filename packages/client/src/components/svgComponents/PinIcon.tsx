import * as React from "react";
import { SVGProps } from "react";

const SvgPinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 19"
    width="1em"
    height="1em"
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M6.28 18.62C1 10.8 0 10 0 7.12A7.06 7.06 0 0 1 7 0a7.06 7.06 0 0 1 7 7.12c0 2.88-1 3.68-6.28 11.5a.87.87 0 0 1-1.44 0ZM7 10.09a3 3 0 1 0-2.92-3 2.95 2.95 0 0 0 2.92 3Z"
        style={{
          fill: "#eb5757",
        }}
        data-name="Layer 1"
      />
    </g>
  </svg>
);

export default SvgPinIcon;
