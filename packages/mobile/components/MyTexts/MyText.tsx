import React, { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "../../lib/tailwind";
import { grey0 } from "../../theme/style";

interface Props {
  children: ReactNode;
  fontColor?: string;
  size?: string;
  extraStyle?: string;
}

const MyText = ({
  children,
  fontColor = "text-grey-0",
  size = "text-md",
  extraStyle = "",
}: Props) => {
  return <Text style={tw`${fontColor} ${size} ${extraStyle}`}>{children}</Text>;
};

export default MyText;
