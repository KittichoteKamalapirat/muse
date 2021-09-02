import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string; //name has to be required
  label: string;
  //   placeholder: string;  rmeove cause redundant, already in InputHTMLAttributes
};

// └InputField takes any prop that a regular input field would take
export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  // somehow props does like the size in it, so we destructure it out,
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        //   label cannot bu in props, so have to stick it outside

        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
