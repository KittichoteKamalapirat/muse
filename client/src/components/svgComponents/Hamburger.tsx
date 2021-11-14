import * as React from "react";

function SvgHamburger(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117.94 92.53"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <style>{".hamburger_svg__cls-1{fill:#fff}"}</style>
      </defs>
      <g id="hamburger_svg__Layer_2" data-name="Layer 2">
        <g id="hamburger_svg__text">
          <rect
            className="hamburger_svg__cls-1"
            width={117.94}
            height={14.7}
            rx={7.35}
          />
          <rect
            className="hamburger_svg__cls-1"
            y={38.92}
            width={117.94}
            height={14.7}
            rx={7.35}
          />
          <rect
            className="hamburger_svg__cls-1"
            y={77.83}
            width={117.94}
            height={14.7}
            rx={7.35}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgHamburger;
