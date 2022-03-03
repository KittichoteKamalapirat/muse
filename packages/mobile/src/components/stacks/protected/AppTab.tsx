import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, TouchableNativeFeedbackBase } from "react-native";
import { AppTabParamList } from "../../../utils/AppTabParamList";

import { AuthContext } from "../../AuthProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { HomeStack } from "./home/HomeStack";

import { Noti } from "./home/Noti";
import { Center } from "../../Container/Center";

interface AppTabProps {}

const Home = () => {
  return (
    <Center>
      <Text>Home</Text>
    </Center>
  );
};

const MyShop = () => {
  return (
    <Center>
      <Text>MyShop</Text>
    </Center>
  );
};

const MyAccount = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Center>
      <Text>MyAccount</Text>
      <Button title="logout" onPress={() => logout()}></Button>
    </Center>
  );
};

const Tab = createBottomTabNavigator<AppTabParamList>();
export const AppTab: React.FC<AppTabProps> = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Entypo name="home" size={24} color={color} />;
          } else if (route.name === "MyShop") {
            iconName = focused ? "ios-list-box" : "ios-list";
            return <MaterialIcons name="storefront" size={24} color={color} />;
          } else if (route.name === "MyAccount") {
            iconName = focused ? "ios-list-box" : "ios-list";
            return (
              <MaterialIcons name="account-circle" size={24} color={color} />
            );
          } else if (route.name === "Noti") {
            iconName = focused ? "ios-list-box" : "ios-list";
            return <Ionicons name="notifications" size={24} color={color} />;
          }

          // You can return any component that you like here!

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          header: () => null,
        }}
      />
      <Tab.Screen name="MyShop" component={MyShop} />
      <Tab.Screen name="Noti" component={Noti} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="MyAccount" component={MyAccount} />
    </Tab.Navigator>
  );
};
