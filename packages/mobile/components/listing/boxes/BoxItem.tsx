import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Box } from "../../../graphql/generated/graphql";
import tw from "../../../lib/tailwind";
import MyText from "../../MyTexts/MyText";
import Tag from "../../Tag";

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
      <View style={tw`w-full`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center`}>
            <MyText size="text-lg" extraStyle="font-bold mr-2">
              {box.address?.name || box.name}
            </MyText>

            <Tag content={box.type} />
          </View>
          <MyText fontColor="text-grey-50">
            {moment(box.startTime).format("k:mm")} -
            {moment(box.endTime).format("k:mm")}
          </MyText>
        </View>

        <MyText fontColor="text-grey-100">{box.name || box.description}</MyText>
        {/* todo make address not nullable in entity */}
      </View>
    </TouchableOpacity>
  );
};

export default BoxItem;
