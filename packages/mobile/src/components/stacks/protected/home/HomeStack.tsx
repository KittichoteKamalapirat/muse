import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feed } from "./Feed";

interface HomeStackProps {}

const Stack = createNativeStackNavigator();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
};
