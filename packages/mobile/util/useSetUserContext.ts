import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMeQuery, User } from "../graphql/generated/graphql";

const useSetUserContext = () => {
  console.log("user set user context");
  const [currentUser, setCurrentUser] = useState<User | null>();
  const { data, loading } = useMeQuery();
  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      let userObj = null;

      if (user) {
        userObj = JSON.parse(user);
      }
      setCurrentUser(userObj);

      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log("error getting current user");
    }
  };

  const storeData = async (value: User | null | undefined) => {
    try {
      const jsonValue = JSON.stringify(value);
      // set data for persist storage
      await AsyncStorage.setItem("user", jsonValue);

      if (data?.me) {
        // set data for UserContext
        setCurrentUser(data?.me as User);
      }
    } catch (e) {
      console.log("error setting current user");
    }
  };

  // retrieve item
  useEffect(() => {
    getData();
  }, []);

  // set Item
  useEffect(() => {
    storeData(currentUser);
  }, [currentUser, data?.me?.id]);

  // if (loading) return <ActivityIndicator />;
};

export default useSetUserContext;
