import { useNavigation } from "@react-navigation/native";
import React from "react";
import { UseFormSetError, FieldValues } from "react-hook-form";
import { Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import logo from "../assets/images/logo.png";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import {
  MeDocument,
  MeQuery,
  useGuestLoginMutation,
} from "../graphql/generated/graphql";
import tw from "../lib/tailwind";
import handleGraphqlErrors from "../util/handleGraphqlErrors";
import { useIsAuth } from "../util/useIsAuth";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const AuthScreen = ({ navigation }: Props) => {
  useIsAuth();

  const [guestLogin] = useGuestLoginMutation();

  const handleGuestLogin = async () => {
    try {
      const response = await guestLogin({
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.guestLogin.user,
            },
          });
          cache.evict({ fieldName: "boxes" }); // TODO do I need this?
        },
      });
      // └ has to match what defined in graphqlmutation

      if (response) {
        const userId = response.data?.guestLogin.user?.id;
        if (userId) {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.log("⛔  error registering");
    }
  };

  return (
    <ScreenLayout>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
        }}
      >
        <Image source={logo} style={tw`w-20 h-20`} />
        <MyText fontColor="text-primary" size="text-lg" extraStyle="font-bold">
          Jocky
        </MyText>
        <MyText size="text-lg">Song requests made easy</MyText>
      </View>

      <View>
        <Button
          label="Sign up free"
          onPress={() => navigation.navigate("Register")}
        />
        <Button
          label="Log in"
          type={ButtonTypes.OUTLINED}
          fontColor="grey-100"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          label="Log in as Guest"
          type={ButtonTypes.TEXT}
          fontColor="text-grey-0"
          onPress={handleGuestLogin}
        />
      </View>
    </ScreenLayout>
  );
};

export default AuthScreen;
