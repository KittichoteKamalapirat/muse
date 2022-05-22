import * as React from "react";
import { SVGProps } from "react";

const SvgToPay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 62 56"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>
        {
          ".ToPay_svg__cls-2{fill:none;stroke:#2e4369;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
        }
      </style>
    </defs>
    <g id="ToPay_svg__Layer_2" data-name="Layer 2">
      <g id="ToPay_svg__Layer_1-2" data-name="Layer 1">
        <circle
          cx={48}
          cy={33}
          r={1}
          style={{
            fill: "#fc6",
          }}
        />
        <path
          className="ToPay_svg__cls-2"
          d="M50.7 11 47 1 19.5 11M57 39v13a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3h50a3 3 0 0 1 3 3v13"
        />
        <rect
          className="ToPay_svg__cls-2"
          x={41}
          y={27}
          width={20}
          height={12}
          rx={2}
        />
        <path
          className="ToPay_svg__cls-2"
          d="M11 17h2m8 0h2m8 0h2m8 0h2M15 49h2m8 0h2m8 0h2m8 0h2"
        />
        <circle className="ToPay_svg__cls-2" cx={48} cy={33} r={1} />
      </g>
    </g>
  </svg>
);

export default SvgToPay;
