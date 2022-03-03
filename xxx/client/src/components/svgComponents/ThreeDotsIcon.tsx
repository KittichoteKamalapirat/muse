import * as React from "react";
import { SVGProps } from "react";

const SvgThreeDotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 2.42"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>{".threeDotsIcon_svg__cls-1{fill:#c4c4c4}"}</style>
    </defs>
    <g id="threeDotsIcon_svg__Layer_2" data-name="Layer 2">
      <g id="threeDotsIcon_svg__Layer_1-2" data-name="Layer 1">
        <circle
          className="threeDotsIcon_svg__cls-1"
          cx={1.21}
          cy={1.21}
          r={1.21}
        />
        <circle
          className="threeDotsIcon_svg__cls-1"
          cx={6}
          cy={1.21}
          r={1.21}
        />
        <circle
          className="threeDotsIcon_svg__cls-1"
          cx={10.79}
          cy={1.21}
          r={1.21}
        />
      </g>
    </g>
  </svg>
);

export default SvgThreeDotsIcon;
