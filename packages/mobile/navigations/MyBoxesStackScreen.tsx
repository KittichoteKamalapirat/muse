import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, BoxScreen, SearchScreen } from "../screens";
import JoinedBoxesScreen from "../screens/JoinedBoxesScreen";
import JoinedBoxScreen from "../screens/JoinedBoxScreen";
import { grey0, bgColor } from "../theme/style";

const MyBoxesStack = createNativeStackNavigator();

const MyBoxesStackScreen = () => (
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
      name="JoinedBox"
      component={JoinedBoxScreen}
      options={{ title: "Box Name" }}
    />
    <MyBoxesStack.Screen name="Search" component={SearchScreen} />
  </MyBoxesStack.Navigator>
);

export default MyBoxesStackScreen;
