import * as React from "react";
import { SVGProps } from "react";

const SvgRateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.27 23.28"
    width="1em"
    height="1em"
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M11.64 0a11.64 11.64 0 1 0 11.63 11.64A11.64 11.64 0 0 0 11.64 0Zm6.29 10.92-2.58 2.49.65 3.52a.78.78 0 0 1-1.13.81l-3.19-1.66-3.2 1.66a.78.78 0 0 1-1.13-.81l.61-3.52-2.62-2.49a.77.77 0 0 1 .43-1.32l3.57-.51 1.59-3.2a.79.79 0 0 1 1.41 0l1.59 3.2 3.57.51a.77.77 0 0 1 .43 1.32Z"
        style={{
          fill: "#c4c4c4",
          fillRule: "evenodd",
        }}
        data-name="Layer 1"
      />
    </g>
  </svg>
);

export default SvgRateIcon;
