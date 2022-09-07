import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Box, useBoxesQuery } from "../../../graphql/generated/graphql";
import tw from "../../../lib/tailwind";
import { debounce } from "../../../util/debounce";
import Button from "../../Buttons/Button";
import Error from "../../layouts/Error";
import MyText from "../../MyTexts/MyText";
import SearchBar from "../../SearchBar";
import BoxItem from "./BoxItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ApolloError } from "@apollo/client";

interface Props {
  boxes: Box[];
  loading: boolean;
  error: ApolloError | undefined;
}
const BoxListing = ({ boxes, loading, error }: Props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const isHomeRoute = route.name === "Home";
  const [matchedBoxes, setMatchedBoxes] = useState<Box[]>([]);

  const todayBoxes = matchedBoxes.filter((box) =>
    moment(box.startTime).isSame(new Date(), "day")
  );

  // startDate -1 = today MEANS startDate is tomorrow
  const tomorrowBoxes = matchedBoxes.filter((box) =>
    moment(box.startTime).add(-1, "days").isSame(new Date(), "day")
  );
  const otherBoxes = matchedBoxes
    .filter(
      (box) => !moment(box.startTime).add(-1, "days").isSame(new Date(), "day")
    )
    .filter((box) => !moment(box.startTime).isSame(new Date(), "day"));

  const [searchQuery, setSearchQuery] = useState<string>("");

  const updateDebounceText = debounce((inputQeury: string) => {
    const newMatched = matchedBoxes
      ?.slice()
      .filter((box) =>
        (box.address?.name + box.name + box.description)
          .toLowerCase()
          .includes(inputQeury.toLowerCase())
      );

    setMatchedBoxes(newMatched);
  }, 500);

  const search = (query: string) => {
    setSearchQuery(query);
    if (query !== "") {
      updateDebounceText(query);
    } else {
      debounce(() => setMatchedBoxes(boxes as Box[]), 500)(); // set back to initial state
    }
  };

  useEffect(() => {
    if (!loading && boxes.length !== 0) {
      setMatchedBoxes(boxes as Box[]);
    }
  }, [loading, boxes]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Error errorMessage={error.message} />;

  matchedBoxes?.forEach((box) => console.log("raw", box.startTime));
  matchedBoxes?.forEach((box) =>
    console.log("moment", moment(box.startTime).isSame(new Date(), "day"))
  );

  return (
    <View>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <MyText size="text-2xl" extraStyle="font-bold">
          {isHomeRoute ? "Find an event" : "My Events"}
        </MyText>

        {isHomeRoute ? (
          <Button
            label="Create"
            onPress={() => navigation.navigate("CreateBox" as never)}
          />
        ) : null}
      </View>
      {isHomeRoute ? (
        <SearchBar
          onChange={(input: string) => search(input)}
          placeholder="Search for an event"
          searchText={searchQuery}
        />
      ) : null}

      <View style={tw`mt-2`}>
        <View>
          {/* today */}
          <MyText size="text-xl" weight="font-bold" extraStyle="my-2">
            Today
          </MyText>
          {!todayBoxes.length ? (
            <MyText>No events today</MyText>
          ) : (
            <FlatList
              // data={matchedBoxes?.filter(box => box.startTime)}
              data={todayBoxes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <BoxItem box={item as Box} />}
            />
          )}
        </View>

        {/* tomorrow */}
        <View>
          <MyText size="text-xl" weight="font-bold" extraStyle="my-2">
            Tomorrow
          </MyText>

          {!tomorrowBoxes.length ? (
            <MyText extraStyle="text-center">No events tomorrow</MyText>
          ) : (
            <FlatList
              data={tomorrowBoxes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <BoxItem box={item as Box} />}
            />
          )}
        </View>

        <View>
          <MyText size="text-xl" weight="font-bold" extraStyle="my-2 ">
            Others
          </MyText>
          <FlatList
            data={otherBoxes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BoxItem box={item as Box} />}
          />
        </View>
      </View>
    </View>
  );
};

export default BoxListing;
