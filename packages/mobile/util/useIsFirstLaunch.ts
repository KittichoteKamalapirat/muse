import { useEffect, useState } from "react";
import { useMeQuery } from "../graphql/generated/graphql";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export const useIsFirstLaunch = ({ navigation }: Props) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true); // have to be string

  useEffect(() => {
    AsyncStorage.getItem("isFirstLaunch").then((value) => {
      if (value === "true") {
        AsyncStorage.setItem("isFirstLaunch", "false");
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (!isFirstLaunch) return false;
  return true;
};
