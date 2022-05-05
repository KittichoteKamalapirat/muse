interface Props {
  height: string;
  width: string;
  colour: string;
}

const SearchIcon = ({ height, width, colour }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${colour} ${width} ${height}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-label="Search"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

SearchIcon.defaultProps = {
  height: "h-5",
  width: "w-4",
  colour: "text-grey-500",
};

export default SearchIcon;
