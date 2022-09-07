import { useContext, useEffect } from "react";
import { useMeQuery, User } from "../graphql/generated/graphql";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export const useIsAuth = () => {
  console.log("useIsAuth");
  const navigation: NavigationScreenProp<any, any> = useNavigation();
  const { data: meData, loading: meLoading, error: meError } = useMeQuery();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const route: RouteProp<{ params: { next: string | null } }> = useRoute();

  if (meLoading) {
    console.log("me loading error");
    return "loading";
  }

  if (meError) {
    console.log("me error");
    return "error";
  }

  console.log("meData", meData);
  console.log("meLoading", meLoading);
  console.log("meError", meError);
  console.log("currentUser", currentUser);
  console.log("setCurrentUser", setCurrentUser);

  // manuall set user in context
  useEffect(() => {
    console.log("hook 1");
    if (meData?.me && setCurrentUser) setCurrentUser(meData.me as User);
    console.log("hook 1 after");
  }, [meData, setCurrentUser]);

  // redirect if already logged in
  useEffect(() => {
    console.log("hook 2");
    if (currentUser) {
      const nextScreen = route.params?.next;

      if (typeof nextScreen === "string") {
        navigation.navigate(nextScreen, {
          from: "Login",
        });
      } else {
        navigation.navigate("Home");
      }
    }
    console.log("hook 2 after");
  }, [currentUser]);
};
