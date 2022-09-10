import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { useMeQuery, User } from "../graphql/generated/graphql";

const useSetUserContext = () => {
  console.log("user set user context");
  const [currentUser, setCurrentUser] = useState<User | null>();
  console.log("curreent user in useSetUserContent", currentUser);
  const { data, loading } = useMeQuery(); // cache is updated when logged in
  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  const getData = async () => {
    try {
      console.log("getData is called");
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
    console.log("storeData is called");
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
    console.log("getData useEffect");
    getData();
  }, []);

  // set Item
  useEffect(() => {
    console.log("-----triggered-------");
    if (data?.me) storeData(data.me as User);
  }, [currentUser, data?.me]);

  // if (loading) return <ActivityIndicator />;
  return { currentUser, setCurrentUser };
};

export default useSetUserContext;
