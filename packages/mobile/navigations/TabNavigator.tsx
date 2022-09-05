import MyBoxesStackScreen from "./MyBoxesStackScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";
import { bgColor, grey0, grey300, primaryColor } from "../theme/style";
import HomeStackScreen from "./HomeStackScreen";

const Tabs = createBottomTabNavigator();

interface Props {
  routeName: string;
}

const TabNavigator = ({ routeName }: Props) => {
  console.log("route name", routeName);
  const hideBottomTab = routeName === "Onboarding"; // hide if onboarding

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: bgColor,
          display: hideBottomTab ? "none" : "flex",
        },
        tabBarActiveTintColor: primaryColor,
      }}
    >
      <Tabs.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          title: "Home",
          tabBarShowLabel: false,
          // tabBarStyle: { display: hideBottomTab ? "none" : "flex" },
          tabBarIcon: ({ focused }) => (
            <View style={tw`flex items-center justify-center`}>
              <EvilIcons
                name="search"
                size={28}
                color={focused ? grey0 : grey300}
              />
              <Text
                style={tw`${
                  focused ? "text-grey-0" : "text-grey-300"
                } pl-2 mt-1 text-sm`}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="MyBoxesStack"
        component={MyBoxesStackScreen}
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={tw`flex items-center justify-center`}>
              <FontAwesome5
                name="globe"
                size={18}
                color={focused ? grey0 : grey300}
              />

              <Text
                style={tw`${
                  focused ? "text-grey-0" : "text-grey-300"
                }  mt-1 text-sm`}
              >
                My Events
              </Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
