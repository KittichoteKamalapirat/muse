interface Props {
  heading: string;
  fontSize: string;
  fontStyle: string;
  fontColour: string;
}

const PageHeading = ({ heading, fontSize, fontStyle, fontColour }: Props) => (
  <h1 className={`${fontSize} ${fontStyle} ${fontColour}`}>{heading}</h1>
);

PageHeading.defaultProps = {
  heading: "",
  fontSize: "text-21px",
  fontStyle: "font-TRegular",
  fontColour: "",
};

export default PageHeading;
