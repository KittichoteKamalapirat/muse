import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import {
  inactiveColor,
  inActiveGray,
} from "@cookknow/shared-package/build/styling/variables";

interface FormInputProps {
  label: string;
  value: string;
  onChange: Function;
  [x: string]: any;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  ...others
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ marginBottom: 4 }}>{label}</Text>
      <TextInput
        onChangeText={(value) => onChange(value)}
        value={value}
        style={{
          borderColor: inactiveColor,
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
        }}
        {...others}
      />
    </View>
  );
};
