import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import logo from "../assets/images/logo.png";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import tw from "../lib/tailwind";

const AuthScreen = () => {
  const navigation: NavigationScreenProp<any, any> = useNavigation();
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
        />
      </View>
    </ScreenLayout>
  );
};

export default AuthScreen;
