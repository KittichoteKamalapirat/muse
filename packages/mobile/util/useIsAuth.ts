import { useContext, useEffect } from "react";
import { useMeQuery, User } from "../graphql/generated/graphql";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export const useIsAuth = () => {
  console.log("useIsAuth");
  const navigation: NavigationScreenProp<any, any> = useNavigation();
  const { data: meData, loading: meLoading } = useMeQuery();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const route: RouteProp<{ params: { next: string | null } }> = useRoute();

  if (meLoading) return "loading";

  // manuall set user in context
  useEffect(() => {
    if (meData?.me && setCurrentUser) setCurrentUser(meData.me as User);
  }, [meData?.me, setCurrentUser]);

  // redirect if already logged in
  useEffect(() => {
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
  }, [currentUser]);
};
