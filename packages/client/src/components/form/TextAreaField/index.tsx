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
import styles from "./TextAreaField.module.css";

interface Props {
  disabled?: boolean;
  ariaLabel?: string;
  error?: FieldError;
  extraClass?: string;
  helperText?: string;
  isError?: boolean;
  label?: string;
  labelClass?: string;
  labelFontColour?: string;
  name?: string;
  onBlur?: ChangeHandler;
  onChange?: ChangeHandler;
  placeholder?: string;
  value?: string;
  rows?: number;
  required?: boolean;
}

const useClassNames = (extraClass: string, displayError: boolean) => {
  const commonInputClass = `${styles.input} w-full appearance-none focus:outline-none`;

  const commonInputDivClass = `flex justify-between items-center appearance-none border rounded w-full text-gray-700 text-xxs focus:outline-none ${extraClass}`;

  return {
    inputClass: commonInputClass,
    inputDivClass: `p-2.5 ${commonInputDivClass} ${
      displayError ? "border-red-500" : "border-grey-225"
    }`,
  };
};

const noopCallback = async () => {};
const nullRefCallback: RefCallBack = (_instance) => {};

// eslint-disable-next-line react/display-name
const TextAreaField = forwardRef(
  (
    {
      error,
      extraClass = "",
      helperText = "",
      isError: isInputError = false,
      label = "",
      ariaLabel = "",
      labelFontColour = "text-grey-420",
      labelClass = "mb-2",
      name = "",
      onBlur,
      onChange,
      placeholder = "",
      value,
      rows = 5,
      required = false,
      ...inputFields
    }: Props,
    ref
  ) => {
    // styling
    const isError = !!error || isInputError;
    const { inputClass, inputDivClass } = useClassNames(extraClass, isError);

    const errorMessage = getErrorMessage(label || name, error);
    const formRegisterFields: UseFormRegisterReturn = {
      onChange: onChange || noopCallback,
      onBlur: onBlur || noopCallback,
      ref: (ref as RefCallBack) || nullRefCallback,
      name: name || label || "",
      ...inputFields,
    };

    return (
      <>
        <FormFieldLabel
          label={label}
          ariaLabel={ariaLabel}
          extraClass={labelClass}
          fontColour={labelFontColour}
          required={required}
        />
        <div
          aria-label={`${ariaLabel || label || name}-label`}
          className={inputDivClass}
        >
          <textarea
            placeholder={placeholder}
            aria-label={ariaLabel || label || name}
            className={inputClass}
            value={value}
            rows={rows}
            {...formRegisterFields}
          />
        </div>
        <FormHelperText
          isError={isError}
          helperText={errorMessage || helperText}
        />
      </>
    );
  }
);

export default TextAreaField;
