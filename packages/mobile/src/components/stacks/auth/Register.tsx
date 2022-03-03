import React from "react";
import {
  Button,
  Text,
  TextInput,
  TextInputBase,
  View,
  StyleSheet,
} from "react-native";
import { AuthNavProps } from "../../../utils/AuthParamList";

import { FormInput } from "../../atomic/atoms/FormInput";
import { FormSubmit } from "../../atomic/atoms/FormSubmit";
import { Center } from "../../Container/Center";

export const Register = ({ navigation, route }: AuthNavProps<"Register">) => {
  //   const [register] = ()
  return (
    <Center>
      <View style={{ width: "90%" }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Sign up</Text>
          <FormInput label="username" />
          <FormInput label="email" />
          <FormInput label="phonenumber" />
          <FormInput label="password" />
          {/* <FormSubmit text="Register" onSubmit={register} /> */}

          <Button
            title="Already have an account? Login"
            onPress={() => {
              navigation.navigate("Login");
              // navigation.navigate("");
            }}
          />
        </View>
      </View>
    </Center>
  );
};
