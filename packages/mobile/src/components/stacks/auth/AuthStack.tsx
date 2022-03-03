import React from "react";
import { AuthParamList } from "../../../utils/AuthParamList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { Register } from "./Register";

interface AuthStackProps {}

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen
        name="Login" //this one matches the nivagate('Login')
        component={Login}
        options={{
          headerTitle: "Sign in",
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        // options={{
        //   headerTitle: "Sign up",
        // }}
      />
    </Stack.Navigator>
  );
};
