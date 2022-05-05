interface Props {
  height: string;
  width: string;
  textColor: string;
}

const CloseIcon = ({ height, width, textColor }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${height} ${width} ${textColor}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-label="close"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

CloseIcon.defaultProps = {
  height: "h-6",
  width: "w-6",
  textColor: "text-grey-250",
};

export default CloseIcon;
