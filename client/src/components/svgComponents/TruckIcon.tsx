import * as React from "react";
import { SVGProps } from "react";

const SvgTruckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 20"
    width="1em"
    height="1em"
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M24.38 13.75h-.63V9.53a1.88 1.88 0 0 0-.55-1.33l-3.9-3.9a1.88 1.88 0 0 0-1.3-.55h-1.75V1.88A1.88 1.88 0 0 0 14.38 0H1.88A1.88 1.88 0 0 0 0 1.88v12.5a1.88 1.88 0 0 0 1.88 1.87h.62a3.75 3.75 0 0 0 7.5 0h5a3.75 3.75 0 0 0 7.5 0h1.88a.63.63 0 0 0 .62-.63v-1.24a.63.63 0 0 0-.62-.63ZM6.25 18.12a1.87 1.87 0 1 1 1.87-1.87 1.86 1.86 0 0 1-1.87 1.87Zm12.5 0a1.87 1.87 0 1 1 1.87-1.87 1.86 1.86 0 0 1-1.87 1.87ZM21.88 10h-5.63V5.62H18l3.91 3.91Z"
        style={{
          fill: "#c4c4c4",
        }}
        data-name="Layer 1"
      />
    </g>
  </svg>
);

export default SvgTruckIcon;
