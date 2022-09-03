import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { HomeScreen, BoxScreen, SearchScreen } from "../screens";
import { grey0, bgColor } from "../theme/style";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      // headerShown: false,
      headerTintColor: grey0,
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerStyle: { backgroundColor: bgColor },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerTitleAlign: "left", headerTitle: () => <Text>hi</Text> }}
    />
    <HomeStack.Screen
      name="Box"
      component={BoxScreen}
      options={({ route }) => ({
        title: route.params?.name,
      })}
    />
    <HomeStack.Screen name="Search" component={SearchScreen} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
