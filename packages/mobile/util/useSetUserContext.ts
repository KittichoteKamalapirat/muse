import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { useMeQuery, User } from "../graphql/generated/graphql";

const useSetUserContext = () => {
  console.log("user set user context");
  const [currentUser, setCurrentUser] = useState<User | null>();
  const { data, loading } = useMeQuery(); // cache is updated when logged in
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
      // set data for UserContext
      setCurrentUser(value); // IMPORTANT this was set again when logout
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
    if (data?.me) storeData(data.me as User);
  }, [currentUser, data?.me]);

  // if (loading) return <ActivityIndicator />;
  return { currentUser, setCurrentUser };
};

export default useSetUserContext;
