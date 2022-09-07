import { Text } from "react-native";
import tw from "../../lib/tailwind";

interface Props {
  label: string;
  ariaLabel?: string;
  fontSize: string;
  fontStyle: string;
  fontColour: string;
  extraClass: string;
  displayOptionalLabel: boolean;
  optionalLabelStyle?: string;
  htmlFor?: string;
}

const FormFieldLabel = ({
  label,
  fontSize,
  ariaLabel,
  fontStyle,
  fontColour,
  extraClass,
  displayOptionalLabel,
  optionalLabelStyle = "",
  htmlFor = "",
}: Props) => {
  if (label) {
    return (
      <Text
        aria-label={ariaLabel || label}
        style={tw`inline-block ${fontSize} ${fontStyle} ${fontColour} ${extraClass} `}
      >
        {label}
        {displayOptionalLabel && (
          <span
            className={`ml-2 italic font-thin text-xxs ${optionalLabelStyle}`}
          >
            optional
          </span>
        )}
      </Text>
    );
  } else {
    return null;
  }
};

FormFieldLabel.defaultProps = {
  label: "",
  fontSize: "text-11px",
  fontStyle: "font-nunito",
  fontColour: "text-grey-420",
  extraClass: "mb-2",
  displayOptionalLabel: false,
};

export default FormFieldLabel;
