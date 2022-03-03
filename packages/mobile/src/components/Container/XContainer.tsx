import React from "react";
import { View } from "react-native";

interface XContainerProps {}

export const XContainer: React.FC<XContainerProps> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: "90%" }}>{children}</View>
    </View>
  );
};
