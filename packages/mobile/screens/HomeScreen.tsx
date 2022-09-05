import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import ScreenLayout from "../components/layouts/ScreenLayout";
import BoxListing from "../components/listing/boxes/BoxListing";
import { Box, useBoxesQuery } from "../graphql/generated/graphql";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  console.log("home screen, BoxesScreen");

  const {
    data: boxesData,
    loading: boxesLoading,
    error: boxesError,
  } = useBoxesQuery();

  return (
    <ScreenLayout>
      <View style={tw`h-full`}>
        <BoxListing
          boxes={(boxesData?.boxes as Box[]) || []}
          loading={boxesLoading}
          error={boxesError}
        />
        {/* {currentUser ? (
          <Button label="Logout" onPress={handleLogout} />
        ) : (
          <Button
            label="Login"
            onPress={() =>
              navigation.navigate("Login", {
                next: "Home",
              })
            }
          />
        )} */}
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
