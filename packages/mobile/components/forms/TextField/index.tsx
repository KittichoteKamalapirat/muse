import {
  ChangeHandler,
  Control,
  Controller,
  FieldError,
  Noop,
  RefCallBack,
  RegisterOptions,
} from "react-hook-form";
import { TextInput, View } from "react-native";
import { InputType } from "../../../constants/inputType";
import tw from "../../../lib/tailwind";
import getErrorMessage from "../../../util/getErrorMessage";
import FormFieldLabel from "../FormFieldLabel";
export type { ChangeHandler } from "react-hook-form";
import FormHelperText from "../FormHelperText";

export enum TextFieldTypes {
  FILLED = "filled",
  OUTLINED = "outlined",
  TEXT = "text",
}

interface Props {
  children?: React.ReactNode;
  containerClass?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  error?: FieldError;
  extraClass?: string;
  helperText?: string;
  inputPaddingClass?: string;
  inputType?:
    | InputType.Number
    | InputType.Text
    | InputType.Email
    | InputType.Password;
  isError?: boolean;
  label?: string;
  labelClass?: string;
  labelFontColour?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  showNumberArrows?: boolean;
  type?: TextFieldTypes;
  value?: string;
  widthClass?: string;
  optionalLabelStyle?: string;
  control?: Control;
  validation?: RegisterOptions;
  onChange?: ChangeHandler;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  onBlur?: (...args: any) => void;
  onInput?: (...args: any) => void;
  onFocusNext?: () => void;
  /* eslint-enable  @typescript-eslint/no-explicit-any */
}

const useClassNames = (
  type: TextFieldTypes,
  extraClass: string,
  widthClass: string,
  inputPaddingClass: string,
  displayError: boolean,
  disabled: boolean,
  showNumberArrows: boolean
) => {
  const disabledBaseStyles = disabled ? "cursor-not-allowed opacity-60" : "";
  const disabledStyles = disabled ? `bg-grey-90 ${disabledBaseStyles}` : "";

  const commonInputClass = ` ${disabledStyles} bg-white h-8 p-2 rounded-md m-auto my-2  w-full appearance-none focus:outline-none`;

  const commonInputDivClass = `flex justify-between items-center appearance-none border rounded ${widthClass} ${disabledStyles} h-8 text-gray-700 text-xxs focus:outline-none ${extraClass}`;

  switch (type) {
    case TextFieldTypes.OUTLINED:
      return {
        inputClass: commonInputClass,
        inputDivClass: `${inputPaddingClass} ${commonInputDivClass} ${
          displayError ? "border-red-500" : "border-grey-225"
        }`,
        labelBaseClass: disabledBaseStyles,
      };

    case TextFieldTypes.TEXT:
      return {
        inputClass: `bg-white ${commonInputClass}`,
        inputDivClass: `${widthClass} ${
          displayError ? "border-red-500" : "border-grey-225 "
        }`,
        labelBaseClass: disabledBaseStyles,
      };

    case TextFieldTypes.FILLED:
    default:
      return {
        inputClass: `${commonInputClass}`,
        inputDivClass: `bg-grey-100 pl-4.75 pr-4.5 ${commonInputDivClass} ${
          displayError ? "border-red-500" : "border-grey-100"
        }`,
        labelBaseClass: disabledBaseStyles,
      };
  }
};

const TextField = ({
  children,
  containerClass = "",
  disabled = false,
  endIcon = null,
  error,
  extraClass = "",
  helperText = "",
  inputPaddingClass = "px-2.5",
  inputType = InputType.Text,
  isError: isInputError = false,
  label = "",
  labelClass = "mb-2",
  labelFontColour = "text-grey-420",
  name = "",
  placeholder = "",
  required = false,
  validation = {},
  control,
  onChange,
  onBlur,
  onInput,
  onFocusNext,
  showNumberArrows = true,
  type = TextFieldTypes.FILLED,
  value,
  widthClass = "w-full",
  optionalLabelStyle = "",
}: Props) => {
  // styling
  const isError = !!error || isInputError;
  const { inputClass, inputDivClass, labelBaseClass } = useClassNames(
    type,
    extraClass,
    widthClass,
    inputPaddingClass,
    isError,
    disabled,
    showNumberArrows
  );

  const body = (
    ref?: RefCallBack,
    reactHookFormValue?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onReactHookFormChange?: (...event: any[]) => void,
    onReactHookFormBlur?: Noop,
    reactHookFormError?: FieldError,
    invalid?: boolean
  ) => {
    const isReactHookFormError = !!(reactHookFormError || invalid || isError);
    const errorMessage = getErrorMessage(label || name, reactHookFormError);

    return (
      <>
        <View style={tw`flex flex-row items-center`}>
          <View
            aria-label={`${label || name}-label`}
            style={tw`${inputDivClass}`}
          >
            <TextInput
              ref={ref || ((_instance) => undefined)}
              placeholder={placeholder}
              aria-label={label || name}
              style={tw`${inputClass}`}
              value={value || reactHookFormValue}
              onChange={onChange || onReactHookFormChange}
              onBlur={onBlur || onReactHookFormBlur}
            />
            {endIcon}
          </View>
          {children}
        </View>
        <FormHelperText
          isError={isReactHookFormError}
          helperText={errorMessage || helperText}
          extraClass="w-4/5"
        />
      </>
    );
  };

  return (
    <View style={tw`${containerClass}`}>
      <FormFieldLabel
        label={label}
        extraClass={`${labelClass} ${labelBaseClass}`}
        fontColour={labelFontColour}
        displayOptionalLabel={!required}
        optionalLabelStyle={optionalLabelStyle}
      />
      {control ? (
        <Controller
          control={control}
          name={name || label}
          rules={{ ...validation, required: required ? "is required" : false }}
          render={({
            field: {
              onChange: onReactHookFormChange,
              onBlur: onReactHookFormBlur,
              value: reactHookFormValue,
              ref,
            },
            fieldState: { invalid, error: reactHookFormError },
          }) =>
            body(
              ref,
              reactHookFormValue,
              onReactHookFormChange,
              onReactHookFormBlur,
              reactHookFormError,
              invalid
            )
          }
        />
      ) : (
        body()
      )}
    </View>
  );
};

export default TextField;
