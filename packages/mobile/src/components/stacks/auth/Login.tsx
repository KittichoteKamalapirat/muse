import { useLoginMutation, useMeQuery } from "@cookknow/shared-package";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { AuthNavProps } from "../../../utils/AuthParamList";
import { FormInput } from "../../atomic/atoms/FormInput";
import { FormSubmit } from "../../atomic/atoms/FormSubmit";
import { Center } from "../../Container/Center";
export const Login = ({ navigation }: AuthNavProps<"Login">) => {
  //   const { login } = useContext(AuthContext);
  const [login] = useLoginMutation();
  const [usernameOrEmailOrPhonenumber, setUsernameOrEmailOrPhonenumber] =
    useState("");
  const [password, setPassword] = useState("");
  const { data: meData, loading: meLoading } = useMeQuery();
  console.log({ meData });

  //   const [login] = useLoginMutation()
  return (
    <Center>
      <View style={{ width: "90%" }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Log in </Text>

          <FormInput
            label="username email or phone"
            value={usernameOrEmailOrPhonenumber}
            onChange={setUsernameOrEmailOrPhonenumber}
          />
          <FormInput
            label="password"
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
          />
          <FormSubmit
            text="Login"
            onSubmit={async () => {
              console.log({ usernameOrEmailOrPhonenumber });
              console.log({ password });
              const response = await login({
                variables: {
                  usernameOrEmailOrPhonenumber: usernameOrEmailOrPhonenumber,
                  password: password,
                },
              });

              console.log({ response });
            }}
          />

          <Button
            title="Don't have an account? Register"
            onPress={() => {
              navigation.navigate("Register");
              //add the form
            }}
          />
        </View>
      </View>
    </Center>
  );
};
