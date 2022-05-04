import { forwardRef } from "react";
import {
  ChangeHandler,
  FieldError,
  RefCallBack,
  UseFormRegisterReturn,
} from "react-hook-form";
import getErrorMessage from "../../../util/getErrorMessage";
export type { ChangeHandler } from "react-hook-form";
import FormFieldLabel from "../FormFieldLabel/FormFieldLabel";
import FormHelperText from "../FormHelperText/FormHelperText";
import styles from "./Textfield.module.css";

export enum TextFieldTypes {
  FILLED = "filled",
  OUTLINED = "outlined",
}

interface Props {
  children?: React.ReactNode;
  containerClass?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  error?: FieldError;
  extraClass?: string;
  helperText?: string;
  inputType?: string;
  isError?: boolean;
  label?: string;
  labelClass?: string;
  labelFontColour?: string;
  name?: string;
  onBlur?: ChangeHandler;
  onChange?: ChangeHandler;
  onInput?: ChangeHandler;
  placeholder?: string;
  type?: TextFieldTypes;
  value?: string;
  required?: boolean;
}

const useClassNames = (
  type: TextFieldTypes,
  extraClass: string,
  displayError: boolean
) => {
  const commonInputClass = `${styles.input} w-full appearance-none focus:outline-none`;

  const commonInputDivClass = `flex justify-between items-center appearance-none border rounded w-full h-8 text-gray-700 text-xxs focus:outline-none ${extraClass}`;

  switch (type) {
    case TextFieldTypes.OUTLINED:
      return {
        inputClass: commonInputClass,
        inputDivClass: `px-2.5 ${commonInputDivClass} ${
          displayError ? "border-red-500" : "border-grey-225"
        }`,
      };

    case TextFieldTypes.FILLED:
    default:
      return {
        inputClass: `bg-grey-100 ${commonInputClass}`,
        inputDivClass: `bg-grey-100 pl-4.75 pr-4.5 ${commonInputDivClass} ${
          displayError ? "border-red-500" : "border-grey-100"
        }`,
      };
  }
};

const noopCallback = async () => undefined;
const nullRefCallback: RefCallBack = (_instance) => undefined;

// eslint-disable-next-line react/display-name
const TextField = forwardRef(
  (
    {
      children,
      containerClass = "",
      disabled = false,
      endIcon = null,
      error,
      extraClass = "",
      helperText = "",
      inputType = "text",
      isError: isInputError = false,
      label = "",
      labelFontColour = "text-grey-420",
      labelClass = "mb-2",
      name = "",
      onBlur,
      onChange,
      onInput,
      placeholder = "",
      type = TextFieldTypes.FILLED,
      value,
      required = false,
      ...inputFields
    }: Props,
    ref
  ) => {
    // styling
    const isError = !!error || isInputError;
    const { inputClass, inputDivClass } = useClassNames(
      type,
      extraClass,
      isError
    );

    const errorMessage = getErrorMessage(label || name, error);
    const formRegisterFields: UseFormRegisterReturn = {
      onChange: onChange || noopCallback,
      onBlur: onBlur || noopCallback,
      ref: (ref as RefCallBack) || nullRefCallback,
      name: name || label || "",
      ...inputFields,
    };

    return (
      <div className={containerClass}>
        <FormFieldLabel
          label={label}
          extraClass={labelClass}
          fontColour={labelFontColour}
          required={required}
        />
        <div className="flex flex-row items-center">
          <div aria-label={`${label || name}-label`} className={inputDivClass}>
            <input
              placeholder={placeholder}
              aria-label={label || name}
              className={inputClass}
              type={inputType}
              value={value}
              disabled={disabled}
              onInput={onInput}
              {...formRegisterFields}
            />
            {endIcon}
          </div>
          {children}
        </div>
        <FormHelperText
          isError={isError}
          helperText={errorMessage || helperText}
        />
      </div>
    );
  }
);

export default TextField;
