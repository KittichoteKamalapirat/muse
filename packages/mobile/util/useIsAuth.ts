import { useEffect } from "react";
import { useMeQuery } from "../graphql/generated/graphql";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp, useRoute } from "@react-navigation/native";

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

export const useIsAuth = ({ navigation }: Props) => {
  const { data, loading } = useMeQuery();

  const route: RouteProp<{ params: { next: string | null } }> = useRoute();
  console.log("route", route);

  useEffect(() => {
    // if login nothing happen
    // if not log in, do this`
    if (!loading && !data?.me) {
      // replace => can't go back to login page
      const nextScreen = route.params?.next;
      navigation.navigate(
        "Login" as never,
        {
          from: "Login",
          next: nextScreen,
        } as never
      );
    }
  }, [loading, data, route]);
};
