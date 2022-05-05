interface Props {
  height: string;
  width: string;
  colour: string;
  label: string;
  extraClass: string;
}

const DocumentSearchIcon = ({ height, width, colour, label, extraClass }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${colour} ${width} ${height} ${extraClass}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-label={label}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
    />
  </svg>
);

DocumentSearchIcon.defaultProps = {
  height: "h-3",
  width: "w-3",
  colour: "text-blurple-link",
  label: "Document search",
  extraClass: "",
};

export default DocumentSearchIcon;
