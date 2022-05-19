import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

export enum ButtonTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINED = "outlined",
  TEXT = "text",
}

interface Props {
  onClick?: () => void;
  label: string;
  type: ButtonTypes;
  href: string;
  height: string;
  spacing: string;
  extraClass: string;
  buttonType: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled: boolean;
  borderColour: string;
  borderRadius: string;
  borderWidth: string;
  fontSize: string;
}

interface ClassProps {
  type: ButtonTypes;
  disabled: boolean;
  spacing: string;
  fontSize: string;
  extraClass: string;
  height: string;
  borderColour: string;
  borderRadius: string;
  borderWidth: string;
}

const useClassName = ({
  type,
  disabled,
  spacing,
  borderRadius,
  borderColour,
  borderWidth,
  fontSize,
  extraClass,
  height,
}: ClassProps) => {
  const commonClass = `${fontSize} ${height} ${spacing} ${borderRadius} ${extraClass} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;
  const borderClass = `${borderColour} ${borderWidth}`;

  switch (type) {
    case ButtonTypes.OUTLINED:
      return `hover:bg-grey-100 text-blurple-link ${borderClass} ${commonClass}`;

    case ButtonTypes.SECONDARY:
      return `bg-grey-100 hover:bg-grey-200 text-grey-250 text-opacity-70 text-11px font-nunito ${commonClass}`;

    case ButtonTypes.TEXT:
      return `text-blurple-link hover:text-blurple-hovered text-15px underline px-0 ${commonClass}`;

    case ButtonTypes.PRIMARY:
    default:
      return `bg-blurple-link hover:bg-blurple-hovered text-white ${commonClass}`;
  }
};

const Button = ({
  onClick,
  label,
  type,
  href,
  spacing,
  extraClass,
  buttonType,
  disabled,
  height,
  fontSize,
  borderColour,
  borderRadius,
  borderWidth,
}: Props) => {
  const className = useClassName({
    type,
    disabled,
    spacing,
    fontSize,
    extraClass,
    height,
    borderColour,
    borderRadius,
    borderWidth,
  });

  const button = (
    <button
      disabled={disabled}
      type={buttonType}
      className={className}
      onClick={onClick}
      name={label}
    >
      {label}
    </button>
  );

  return href ? (
    <Link href={href}>
      <a>{button}</a>
    </Link>
  ) : (
    button
  );
};

Button.defaultProps = {
  type: ButtonTypes.PRIMARY,
  spacing: "px-5.5",
  height: "h-7.75",
  extraClass: "",
  href: "",
  buttonType: "button",
  disabled: false,
  borderRadius: "rounded-5px",
  borderColour: "border-blurple-link",
  borderWidth: "border",
  fontSize: "text-13px",
};

export default Button;
