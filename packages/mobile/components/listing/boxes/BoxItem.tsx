import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Box } from "../../../graphql/generated/graphql";
import tw from "../../../lib/tailwind";
import MyText from "../../MyTexts/MyText";

interface Props {
  box: Box;
}

const BoxItem = ({ box }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          "Box" as never,
          {
            boxId: box.id,
            name: `${box?.address?.name} | ${box?.name}`,
          } as never
        )
      }
      style={tw`flex-row justify-between text-white my-2`}
      activeOpacity={0.7}
    >
      <View>
        <MyText size="text-lg" extraStyle="font-bold">
          {box.name}
        </MyText>
        <MyText fontColor="text-grey-100">{box.description}</MyText>
        {/* todo make address not nullable in entity */}
        <MyText>@ {box?.address?.name}</MyText>
      </View>
    </TouchableOpacity>
  );
};

export default BoxItem;
