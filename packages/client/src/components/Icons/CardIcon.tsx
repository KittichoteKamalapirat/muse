import * as React from "react";
import { SVGProps } from "react";

const SvgCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 16.76"
    width="1em"
    height="1em"
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M0 14.68a2.08 2.08 0 0 0 2.08 2.08h20.84A2.08 2.08 0 0 0 25 14.68V7H0Zm8.33-2.95a.52.52 0 0 1 .52-.52h5.91a.52.52 0 0 1 .52.52v1.73a.52.52 0 0 1-.52.52H8.85a.52.52 0 0 1-.52-.52Zm-5.55 0a.52.52 0 0 1 .52-.52h3.12a.52.52 0 0 1 .52.52v1.73a.52.52 0 0 1-.52.52H3.3a.52.52 0 0 1-.52-.52ZM25 2.08v2.09H0V2.08A2.08 2.08 0 0 1 2.08 0h20.84A2.08 2.08 0 0 1 25 2.08Z"
        style={{
          fill: "#74e4bc",
        }}
        data-name="Layer 1"
      />
    </g>
  </svg>
);

export default SvgCardIcon;
