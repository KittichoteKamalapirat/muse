import * as React from "react";
import { SVGProps } from "react";

const SvgBoxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 19"
    width="1em"
    height="1em"
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M18.91 6.85 17 1.22A1.77 1.77 0 0 0 15.34 0h-5.25v7.12H19a1.26 1.26 0 0 0-.09-.27ZM8.91 0H3.66A1.77 1.77 0 0 0 2 1.22L.09 6.85a1.26 1.26 0 0 0 0 .27h8.82ZM0 8.31v8.91A1.78 1.78 0 0 0 1.78 19h15.44A1.78 1.78 0 0 0 19 17.22V8.31Z"
        style={{
          fill: "#c4c4c4",
        }}
        data-name="Layer 1"
      />
    </g>
  </svg>
);

export default SvgBoxIcon;
