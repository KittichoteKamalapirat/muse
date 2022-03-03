import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

// for Signin and Sign up routes
export type AuthParamList = {
  Login: undefined; //define params that it takes
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  //we need the generic here because we don't know what route it's gonna be, so it will be parameter
  navigation: NativeStackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
