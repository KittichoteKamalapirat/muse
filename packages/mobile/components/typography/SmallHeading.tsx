interface Props {
  heading: string;
  fontSize: string;
  fontStyle: string;
  fontColour: string;
  spacing: string;
}

const SmallHeading = ({ heading, fontSize, fontStyle, fontColour, spacing }: Props) => (
  <h6 className={`${fontSize} ${fontStyle} ${fontColour} ${spacing}`}>{heading}</h6>
);

SmallHeading.defaultProps = {
  heading: "",
  fontSize: "text-11px",
  fontStyle: "font-TRegular font-bold",
  fontColour: "",
  spacing: "",
};

export default SmallHeading;
