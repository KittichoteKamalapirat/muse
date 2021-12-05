import * as React from "react";
import { SVGProps } from "react";

const SvgBell = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 19.15 21.86" width="1em" height="1em" {...props}>
    <path
      d="m18.26 14.42-2.19-1.84A6.56 6.56 0 0 1 14 9.4l-.59-2a6 6 0 0 0-6-4.06L7 1.91A1.76 1.76 0 0 0 4.76.83 1.77 1.77 0 0 0 3.46 3l.43 1.43A5.94 5.94 0 0 0 1.06 11l.59 2a6.68 6.68 0 0 1 0 3.81l-.88 2.76a.37.37 0 0 0 .11.4.46.46 0 0 0 .44.09l16.74-4.92a.47.47 0 0 0 .32-.32.4.4 0 0 0-.12-.4Z"
      style={{
        fill: "none",
        stroke: "#231f20",
        strokeMiterlimit: 10,
        strokeWidth: "1.5px",
      }}
    />
    <path
      d="M10 18.8a.26.26 0 0 1 .34.28A3 3 0 0 1 5 20.67a.27.27 0 0 1 .13-.42Z"
      style={{
        fill: "#231f20",
      }}
    />
  </svg>
);

export default SvgBell;
