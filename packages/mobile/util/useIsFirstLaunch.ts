import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useIsFirstLaunch = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true); // have to be string

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      // alreadyLaunched is null
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        // alreadyLaunched is "true"
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (!isFirstLaunch) return false;
  return true;
};
