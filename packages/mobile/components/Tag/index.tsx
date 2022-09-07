import React, { ReactNode } from "react";
import { Text } from "react-native";
import tw from "../../lib/tailwind";

interface Props {
  content: ReactNode;
  extraClass?: string;
}

const Tag = ({ content, extraClass = "" }: Props) => {
  return (
    <Text
      aria-label="tag-icon"
      style={tw`px-1.5 py-0.5 text-sm border-1 border-primary border-solid text-primary rounded-md ${extraClass}`}
    >
      {content}
    </Text>
  );
};
export default Tag;
