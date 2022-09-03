import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import tw from "../../lib/tailwind";

interface Props {
  children: ReactNode;
  justifyContent?:
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly";
}
const ScreenLayout = ({
  children,
  justifyContent = "justify-center",
}: Props) => {
  return (
    <SafeAreaView
      style={tw`flex-1 h-full w-full bg-grey-900 ${justifyContent}`}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
