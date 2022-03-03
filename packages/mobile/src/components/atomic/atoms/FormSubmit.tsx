import { primaryColor } from "@cookknow/shared-package/build/styling/variables";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface FormSubmitProps {
  text: string;
  onSubmit: Function;
}

export const FormSubmit: React.FC<FormSubmitProps> = ({ text, onSubmit }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: primaryColor,
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
      }}
      onPress={() => onSubmit()}
    >
      <Text style={{ color: "white" }}>{text}</Text>
    </TouchableOpacity>
  );
};
