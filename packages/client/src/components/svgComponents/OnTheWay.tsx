import * as React from "react";
import { SVGProps } from "react";

const SvgOnTheWay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 62 50"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>
        {
          ".OnTheWay_svg__cls-1{fill:none;stroke:#2e4369;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
        }
      </style>
    </defs>
    <g id="OnTheWay_svg__Layer_2" data-name="Layer 2">
      <g id="OnTheWay_svg__Layer_1-2" data-name="Layer 1">
        <circle className="OnTheWay_svg__cls-1" cx={13} cy={43} r={6} />
        <circle className="OnTheWay_svg__cls-1" cx={49} cy={43} r={6} />
        <path
          className="OnTheWay_svg__cls-1"
          d="M43 41H19m42-6v8h-6M41 1H1v42h4c0-8 8-8 8-8h28Zm10 10H41v24h20V21a10 10 0 0 0-10-10Z"
        />
      </g>
    </g>
  </svg>
);

export default SvgOnTheWay;
