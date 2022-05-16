import { Flex } from "@chakra-ui/react";
import { ButtonHTMLAttributes } from "react";
import Button from "../../atoms/Button";

interface Props {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryText?: string;
  secondaryText?: string;
  primaryButtonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  secondaryButtonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  primaryButtonVariant?: "outline" | "solid" | "unstyled" | "link" | "ghost";
  secondaryButtonVariant?: "outline" | "solid" | "unstyled" | "link" | "ghost";
  primaryIsDisabled?: boolean;
  primaryIsLoading?: boolean;
  primaryAriaLabel?: string;
}

const FormActionButtons = ({
  onPrimaryClick,
  onSecondaryClick,
  primaryText = "Save",
  primaryButtonVariant = "solid",
  primaryButtonType = "button",
  primaryAriaLabel = "next",
  secondaryText = "Cancel",
  secondaryButtonVariant = "outline",
  secondaryButtonType = "button",
  primaryIsDisabled = false,
  primaryIsLoading = false,
}: Props) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Button
      onClick={onSecondaryClick}
      variant={secondaryButtonVariant}
      type={secondaryButtonType}
      width="fit-content"
    >
      {secondaryText}
    </Button>
    <Button
      onClick={onPrimaryClick}
      variant={primaryButtonVariant}
      width="fit-content"
      disabled={primaryIsDisabled}
      isLoading={primaryIsLoading}
      type={primaryButtonType}
      aria-label={primaryAriaLabel}
    >
      {primaryText}
    </Button>
  </Flex>
);

export default FormActionButtons;
