import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginMutation, User } from "@cookknow/shared-package";
import * as SecureStore from "expo-secure-store";

// type User = null | { username: string };

export const AuthContext = React.createContext<{
  user: User | null;
  setUser: (user: User) => void;
  login: (usernameOrEmailOrPhonenumber: string, password: string) => void;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
}); //this make us able to access the current user anywhere in the application
interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); //user is nul by default

  const [login] = useLoginMutation();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: () => {},
        //   login: async (usernameOrEmailOrPhonenumber, password) => {

        //     const result = await login({
        //       variables: {
        //         usernameOrEmailOrPhonenumber: usernameOrEmailOrPhonenumber,
        //         password: password,
        //       },
        //     });

        // if(result.data?.login.user){
        //   const user = result.data?.login.user
        //   await SecureStore.setItemAsync("user", user);
        // }
        // // const fakeUser = { username: "bob" };

        // // const user = login({variables: })
        // setUser(userId);
        //   },
        //handle async better
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
