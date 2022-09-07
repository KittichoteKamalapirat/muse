import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { NavigationScreenProp } from "react-navigation";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";
import { UserContext } from "../context/UserContext";
import {
  BoxScreen,
  CreateBoxScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  SearchScreen,
  SettingScreen,
} from "../screens";
import AuthScreen from "../screens/AuthScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { bgColor, grey0 } from "../theme/style";
import { clearAsyncStorage } from "../util/clearAsyncStorage";
import { useIsFirstLaunch } from "../util/useIsFirstLaunch";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const isFirstLaunch = useIsFirstLaunch();
  const { currentUser } = useContext(UserContext);
  const navigation: NavigationScreenProp<any, any> = useNavigation();

  // clearAsyncStorage();

  return (
    <HomeStack.Navigator
      screenOptions={{
        // headerShown: false,
        headerTintColor: grey0,
        headerTitleAlign: "left", // todo not working
        headerStyle: { backgroundColor: bgColor },
      }}
    >
      {isFirstLaunch ? (
        <HomeStack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      ) : null}

      {!currentUser ? (
        <HomeStack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      ) : null}

      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "left",
          headerRight: () => (
            <IconButton
              icon={
                <Ionicons name="settings-outline" size={24} color={grey0} />
              }
              type={ButtonTypes.TEXT}
              onPress={() => navigation.navigate("Setting")}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Box"
        component={BoxScreen}
        options={({ route }) => ({
          title: route.params?.name,
        })}
      />

      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate("Auth")}
              icon={<Ionicons name="chevron-back" size={24} color={grey0} />}
              type={ButtonTypes.TEXT}
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={() => ({
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate("Auth")}
              icon={<Ionicons name="chevron-back" size={24} color={grey0} />}
              type={ButtonTypes.TEXT}
            />
          ),
        })}
      />

      <HomeStack.Screen name="CreateBox" component={CreateBoxScreen} />

      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="Setting" component={SettingScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
