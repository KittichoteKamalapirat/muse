interface Props {
  height: string;
  width: string;
}

const CheckIcon = ({ height, width }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="check-circle-icon"
      className={`${height} ${width}`}
      viewBox="0 0 20 20"
      fill="#047857"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

CheckIcon.defaultProps = {
  height: "h-4",
  width: "w-4",
};

export default CheckIcon;
