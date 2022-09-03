import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { HomeScreen, BoxScreen, SearchScreen } from "../screens";
import { grey0, bgColor } from "../theme/style";

const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => (
  <SettingStack.Navigator
    screenOptions={{
      // headerShown: false,
      headerTintColor: grey0,
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerStyle: { backgroundColor: bgColor },
      headerRight: () => <Text>"right"</Text>,
    }}
  >
    <SettingStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerTitleAlign: "left" }}
    />
    <SettingStack.Screen
      name="Box"
      component={BoxScreen}
      options={({ route }) => ({
        title: route.params?.name,
      })}
    />
    <SettingStack.Screen name="Search" component={SearchScreen} />
  </SettingStack.Navigator>
);

export default SettingStackScreen;
