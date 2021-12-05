import * as React from "react";
import { SVGProps } from "react";

const SvgToRate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56.88 56.88"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>
        {
          ".ToRate_svg__cls-1{fill:none;stroke:#2e4369;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
        }
      </style>
    </defs>
    <g id="ToRate_svg__Layer_2" data-name="Layer 2">
      <g id="ToRate_svg__Layer_1-2" data-name="Layer 1">
        <circle className="ToRate_svg__cls-1" cx={28.44} cy={28.44} r={27.44} />
        <path
          className="ToRate_svg__cls-1"
          d="m28.44 36.78-10.28 6 2.42-11.49-8.46-7.86 11.48-1.16 4.84-10.88 4.84 10.88 11.48 1.21-8.46 7.86 2.42 11.49Z"
        />
      </g>
    </g>
  </svg>
);

export default SvgToRate;
