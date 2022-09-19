interface Props {
  heading: string;
  fontSize: string;
  fontStyle: string;
  fontColour: string;
  extraClass: string;
  title: string;
}

const SubHeading = ({ heading, fontSize, fontStyle, fontColour, extraClass, title }: Props) => (
  <h2 className={`${fontSize} ${fontStyle} ${fontColour} ${extraClass}`} title={title}>
    {heading}
  </h2>
);

SubHeading.defaultProps = {
  heading: "",
  fontSize: "text-15px",
  fontStyle: "font-nunito",
  fontColour: "",
  extraClass: "",
  title: "",
};

export default SubHeading;
