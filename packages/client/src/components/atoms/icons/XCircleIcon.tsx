import React from "react";

interface Props {
  height: string;
  width: string;
}

const XCircleIcon = ({ height, width }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${height} ${width}`}
      viewBox="0 0 20 20"
      fill="#f87171"
      aria-label="x-circle-icon"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
};

XCircleIcon.defaultProps = {
  height: "h-6",
  width: "w-6",
};

export default XCircleIcon;
