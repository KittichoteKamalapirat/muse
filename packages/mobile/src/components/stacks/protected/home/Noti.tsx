import React from "react";
import { FlatList, Text, View } from "react-native";
import { Center } from "../../../Center";

interface NotiProps {}

export const Noti: React.FC<NotiProps> = ({}) => {
  //   const {
  //     data: orderNoti,
  //     loading: orderNotiLoading,
  //     error: errorNori,
  //   } = useOrderNotisQuery({});

  //   const [readOrderNotis] = useReadOrderNotisMutation();

  const mock = [...Array(5)].map(() => {
    return { id: Math.random(), message: "xxxxxxxx" };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={{ width: "90%" }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Notification</Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Order Notification
          </Text>

          <View>
            <FlatList
              data={mock}
              renderItem={() => <Text>xx</Text>}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
