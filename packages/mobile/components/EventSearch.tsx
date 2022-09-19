import React, { useState } from "react";
import { View } from "react-native";
import { debounce } from "../util/debounce";
import SearchBar from "./SearchBar";

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    try {
      if (text === "") {
        debounce(() => setData({ ...data, isEmpty: true, songs: [] }))();
      } else {
        debounce(async () => {
          const newEvents = "xx";

          setData({
            ...data,
            isFetching: false,
            songs: newSongs,
            offset: 0, // have to reset so it doesn't go like 700
          });
        })();
      }
    } catch (error) {}

    // await loadNextPage();
  };

  return (
    <View>
      <SearchBar
        onChange={(text: string) => handleSearch(text)}
        searchText={searchQuery}
      />
    </View>
  );
};

export default EventSearch;
