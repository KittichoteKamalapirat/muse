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
import { useNavigation } from "@react-navigation/native";
import { ApolloError } from "@apollo/client";

interface Props {
  boxes: Box[];
  loading: boolean;
  error: ApolloError | undefined;
}
const BoxListing = ({ boxes, loading, error }: Props) => {
  const navigation = useNavigation();

  const [matchedBoxes, setMatchedBoxes] = useState<Box[]>();

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
    console.log("newMatched", newMatched);
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

  return (
    <View>
      <View style={tw`flex-row justify-between`}>
        <MyText size="text-2xl" extraStyle="font-bold">
          Find an event
        </MyText>

        <Button
          label="Create"
          onPress={() => navigation.navigate("CreateBox" as never)}
        />
      </View>

      <SearchBar
        onChange={(input: string) => search(input)}
        placeholder="Search for an event"
        searchText={searchQuery}
      />
      <FlatList
        data={matchedBoxes}
        renderItem={({ item }) => <BoxItem box={item as Box} />}
      />
    </View>
  );
};

export default BoxListing;

const styles = StyleSheet.create({});
