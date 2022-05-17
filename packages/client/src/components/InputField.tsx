import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string; //name has to be required
  label?: string;
  textarea?: boolean;
  variant?: string;
  mt?: number;
  //   placeholder: string;  rmeove cause redundant, already in InputHTMLAttributes
};

// └InputField takes any prop that a regular input field would take
export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  variant,
  mt = 0,
  ...props
}) => {
  // somehow props don't like the size in it, so we destructure it out,

  let InputOrTextarea: any = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <Flex alignItems="center" position="relative" mt={mt}>
        <InputOrTextarea
          className="form-input"
          {...field}
          {...props}
          variant={variant}
          id={field.name}
          placeholder="    "
          pt="30px"
          pb="20px"
        />
        <FormLabel
          className="form-label"
          htmlFor={field.name}
          position="absolute"
          color="inputLabel"
          left={4}
          top="14px"
        >
          {label}
        </FormLabel>
      </Flex>

      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
