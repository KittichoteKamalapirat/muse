import * as React from "react";
import { SVGProps } from "react";

const SvgAccountIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16.5 20.34"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>{".accountIcon_svg__cls-1{fill:#231f20}"}</style>
    </defs>
    <g id="accountIcon_svg__Layer_2" data-name="Layer 2">
      <g id="accountIcon_svg__Layer_1-2" data-name="Layer 1">
        <circle
          className="accountIcon_svg__cls-1"
          cx={8.24}
          cy={5.49}
          r={5.49}
        />
        <path
          className="accountIcon_svg__cls-1"
          d="M8.24 12.81c-4.56 0-8.24 2.67-8.24 6 0 .87 1 1.57 2.17 1.57h12.16c1.18 0 2.17-.7 2.17-1.57-.02-3.33-3.7-6-8.26-6Z"
        />
      </g>
    </g>
  </svg>
);

export default SvgAccountIcon;
