import * as React from "react";
import { SVGProps } from "react";

const SvgSuccess = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 77 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M77 38.5C77 59.763 59.763 77 38.5 77S0 59.763 0 38.5 17.237 0 38.5 0 77 17.237 77 38.5ZM34.047 58.885 62.61 30.321c.97-.97.97-2.543 0-3.513L59.1 23.296a2.484 2.484 0 0 0-3.513 0L32.29 46.59 21.414 35.715a2.484 2.484 0 0 0-3.513 0l-3.512 3.512c-.97.97-.97 2.543 0 3.513l16.145 16.145c.97.97 2.543.97 3.513 0Z"
      fill="#3DC795"
    />
  </svg>
);

export default SvgSuccess;
