interface Props {
  height: string;
  width: string;
  colour: string;
}

const KebabMenuIcon = ({ height, width, colour }: Props) => (
  <svg
    className={`${colour} ${width} ${height}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-label="dots-vertical-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    />
  </svg>
);

KebabMenuIcon.defaultProps = {
  height: "h-4",
  width: "w-4",
  colour: "text-grey-420",
};

export default KebabMenuIcon;
