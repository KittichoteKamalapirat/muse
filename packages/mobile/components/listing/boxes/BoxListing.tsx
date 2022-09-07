import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  LogBox,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { Box, useBoxesQuery } from "../../../graphql/generated/graphql";
import tw from "../../../lib/tailwind";
import { grey0 } from "../../../theme/style";
import { debounce } from "../../../util/debounce";
import Button from "../../Buttons/Button";
import Error from "../../layouts/Error";
import MyText from "../../MyTexts/MyText";
import SearchBar from "../../SearchBar";
import BoxItem from "./BoxItem";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const BoxListing = () => {
  // HOOKS
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = React.useState(false);
  const [matchedBoxes, setMatchedBoxes] = useState<Box[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: boxesData,
    loading: boxesLoading,
    error: boxesError,
    refetch,
  } = useBoxesQuery();

  // DESTRUCTURE AND CONSTANTS
  const boxes = boxesData?.boxes;
  const isHomeRoute = route.name === "Home";
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

  // FUNCTIONS
  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const response = await refetch();
    if (response) setRefreshing(false);
  }, []);

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

  // USE EFFECTS
  useEffect(() => {
    if (!boxesLoading && boxes?.length !== 0) {
      setMatchedBoxes(boxes as Box[]);
    }
  }, [boxesLoading, boxes]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  if (boxesLoading) return <ActivityIndicator />;
  if (boxesError) return <Error errorMessage={boxesError.message} />;

  const noEvents = (
    <View style={tw`mb-4`}>
      <MyText extraStyle="text-center">No events</MyText>
    </View>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[grey0]} // android
          progressBackgroundColor={grey0} // android
          tintColor={grey0} //ios
          title="Refreshing..." //ios
          titleColor={grey0} //ios
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
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
          <MyText size="text-xl" weight="font-bold" extraStyle="m-2">
            Today
          </MyText>
          {!todayBoxes.length ? (
            noEvents
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
        <Divider style={tw`border-solid border-t-2 border-grey-700`} />
        <View>
          <MyText size="text-xl" weight="font-bold" extraStyle="my-2">
            Tomorrow
          </MyText>

          {!tomorrowBoxes.length ? (
            noEvents
          ) : (
            <FlatList
              data={tomorrowBoxes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <BoxItem box={item as Box} />}
            />
          )}
        </View>
        <Divider style={tw`border-solid border-t-2 border-grey-700`} />
        <View>
          <MyText size="text-xl" weight="font-bold" extraStyle="my-2 ">
            Others
          </MyText>

          {!otherBoxes.length ? (
            noEvents
          ) : (
            <FlatList
              data={otherBoxes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <BoxItem box={item as Box} />}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default BoxListing;
