import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreenProp } from "react-navigation";
import { ButtonTypes } from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";
import { SearchScreen } from "../screens";
import JoinedBoxesScreen from "../screens/JoinedBoxesScreen";
import JoinedBoxScreen from "../screens/JoinedBoxScreen";
import { bgColor, grey0 } from "../theme/style";

const MyBoxesStack = createNativeStackNavigator();

const MyBoxesStackScreen = () => {
  const navigation: NavigationScreenProp<any, any> = useNavigation();

  return (
    <MyBoxesStack.Navigator
      screenOptions={{
        headerTintColor: grey0,
        headerStyle: { backgroundColor: bgColor },
      }}
    >
      <MyBoxesStack.Screen
        name="MyBoxes"
        component={JoinedBoxesScreen}
        options={{ title: "My events" }}
      />
      <MyBoxesStack.Screen
        name="MyBox"
        component={JoinedBoxScreen}
        options={{
          title: "Box Name",
        }}
      />
      <MyBoxesStack.Screen name="Search" component={SearchScreen} />
    </MyBoxesStack.Navigator>
  );
};

export default MyBoxesStackScreen;
