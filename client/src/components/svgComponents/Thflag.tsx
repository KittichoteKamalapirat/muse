import * as React from "react";

function SvgThflag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 42"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <style>
          {".thflag_svg__cls-2{fill:#ed1c24}.thflag_svg__cls-3{fill:#fff}"}
        </style>
      </defs>
      <g id="thflag_svg__Layer_2" data-name="Layer 2">
        <g id="thflag_svg__text">
          <path
            d="M42 21a21.15 21.15 0 01-.66 5.25A21 21 0 014.6 34.12a20.85 20.85 0 01-3.94-7.87 21.21 21.21 0 010-10.5A21 21 0 0137.4 7.88a20.85 20.85 0 013.94 7.87A21.15 21.15 0 0142 21z"
            fill="#2f446a"
          />
          <path
            className="thflag_svg__cls-2"
            d="M37.4 7.88H4.6a21 21 0 0132.8 0z"
          />
          <path
            className="thflag_svg__cls-3"
            d="M41.34 15.75H.66A20.85 20.85 0 014.6 7.88h32.8a20.85 20.85 0 013.94 7.87z"
          />
          <path
            d="M42 21a21.15 21.15 0 01-.66 5.25H.66a21.21 21.21 0 010-10.5h40.68A21.15 21.15 0 0142 21z"
            fill="#0071bc"
          />
          <path
            className="thflag_svg__cls-3"
            d="M41.34 26.25a20.85 20.85 0 01-3.94 7.87H4.6a20.85 20.85 0 01-3.94-7.87z"
          />
          <path
            className="thflag_svg__cls-2"
            d="M37.4 34.12a21 21 0 01-32.8 0z"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgThflag;
