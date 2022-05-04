interface Props {
  label: string;
  ariaLabel?: string;
  fontSize: string;
  fontStyle: string;
  fontColour: string;
  extraClass: string;
  displayOptionalLabel: boolean;
  required?: boolean;
}

const FormFieldLabel = ({
  label,
  fontSize,
  ariaLabel,
  fontStyle,
  fontColour,
  extraClass,
  displayOptionalLabel,
  required = false,
}: Props) => {
  const requiredStyle = required ? "after:content-['*'] after:text-red-500 after:ml-0.5" : null;

  if (label) {
    return (
      <label
        aria-label={ariaLabel || label}
        htmlFor={label}
        className={`inline-block ${fontSize} ${fontStyle} ${fontColour} ${extraClass} ${requiredStyle} `}
      >
        {label}
        {displayOptionalLabel && <span className="ml-2 italic font-thin text-xxs">optional</span>}
      </label>
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
