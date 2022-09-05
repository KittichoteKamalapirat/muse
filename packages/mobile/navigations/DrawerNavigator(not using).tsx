import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingStackScreen from "./SettingNavigator(not using)";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TabNavigator} />
    <Drawer.Screen name="Setting" component={SettingStackScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
