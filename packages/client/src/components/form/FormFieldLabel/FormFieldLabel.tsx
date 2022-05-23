import { Text } from "@chakra-ui/react";
import styles from "./FormFieldLabel.module.css";

interface Props {
  label: string;
  ariaLabel?: string;
  displayOptionalLabel?: boolean;
  required?: boolean;
  fontSize?: string;
}

const FormFieldLabel = ({
  label,
  ariaLabel,
  displayOptionalLabel,
  required = false,
  fontSize,
}: Props) => {
  return (
    <Text
      aria-label={ariaLabel || label}
      className={`${styles.label} ${required ? styles.required : ""}`}
      fontSize={fontSize}
    >
      {label}
      {displayOptionalLabel && <span>optional</span>}
    </Text>
  );
};

export default FormFieldLabel;
