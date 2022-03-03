import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

// for Signin and Sign up routes
export type HomeParamList = {
  Feed: undefined;
  //   Register: undefined;
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  //we need the generic here because we don't know what route it's gonna be, so it will be parameter
  navigation: NativeStackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
