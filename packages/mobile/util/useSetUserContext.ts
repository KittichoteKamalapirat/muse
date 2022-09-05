import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { useMeQuery, User } from "../graphql/generated/graphql";

const useSetUserContext = () => {
  console.log("user set user context");
  const [currentUser, setCurrentUser] = useState<User | null>();
  console.log("curreent user in useSetUserContent", currentUser);
  const { data, loading } = useMeQuery();
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
    console.log("getData useEffect");
    getData();
  }, []);

  // set Item
  useEffect(() => {
    console.log("storeData useEffect");
    storeData(currentUser);
  }, [currentUser, data?.me?.id]);

  // if (loading) return <ActivityIndicator />;
  return { currentUser, setCurrentUser };
};

export default useSetUserContext;
