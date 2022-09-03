import Constants from "expo-constants";
import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { SpotifyTokenContext } from "../context/SpotifyTokenContext";
import getSpotifyToken from "../third-parties/getSpotifyToken";
import spotifySearch from "../third-parties/spotifySearch";
import { Song } from "../types";
import Listing from "./listing/songSearches/SongListing";
import SearchBar from "./SearchBar";

interface Props {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
}

const PAGE = 20;

const Container = styled.View`
  height: 100%;
  padding: 1px 15px;
`;
const SongQueue = styled.View`
  margin-top: 20px;
`;

const Header = styled.Text`
  font-size: 18px;
`;

interface MusicSearchType {
  songs: Song[];
  offset: number;
  query: string;
  isFetching: boolean;
  isEmpty: boolean;
  spotifyToken: string;
  isTokenFetching: boolean;
}
const initialData: MusicSearchType = {
  songs: [],
  offset: 0,
  query: "",
  isFetching: false,
  isEmpty: false,
  spotifyToken: "",
  isTokenFetching: false,
};

const MusicSearch = ({ SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET }: Props) => {
  const [data, setData] = useState(initialData);
  const { token: tokenContext } = useContext(SpotifyTokenContext);

  const { songs, query, isFetching } = data;

  const handleSearch = (text: string) => {
    setData({ ...data, query: text });
  };

  const loadNextPage = async () => {
    const { offset, query, isFetching, isEmpty, spotifyToken } = data;

    if (isFetching || isEmpty) {
      return;
    }

    // setData({ ...data, isFetching: true });

    const newSongs = await spotifySearch({
      offset: offset.toString(),
      limit: PAGE.toString(),
      q: query,
      spotifyToken: spotifyToken || "",
    });

    if (newSongs.length === 0) {
      console.log("No songs found, there may be error");
      setData({ ...data, isEmpty: true });
    }

    // setData({
    //   ...data,
    //   isFetching: false,
    //   songs: [...data.songs, ...newSongs],
    //   offset: offset + PAGE,
    // });
  };

  const refreshToken = async () => {
    // setData({ ...data, isTokenFetching: true });

    const newToken = await getSpotifyToken();

    // setData({ ...data, spotifyToken: newToken, isTokenFetching: false });
  };

  const handleEndReached = async () => {
    await loadNextPage();
  };

  useEffect(() => {
    loadNextPage();
    refreshToken();
  }, [data]);

  return (
    <Container>
      <SafeAreaView>
        <Header title="Music" />
        <SearchBar
          onChange={(text: string) => handleSearch(text)}
          searchText={query}
          placeholder="search for a song"
        />

        <SongQueue>
          {isFetching && songs.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <Listing items={songs} onEndReached={() => handleEndReached} />
          )}
        </SongQueue>
      </SafeAreaView>
    </Container>
  );
};

export default MusicSearch;

MusicSearch.defaultProps = {
  SPOTIFY_CLIENT_ID: Constants.manifest?.extra?.SPOTIFY_CLIENT_ID || "",
  SPOTIFY_CLIENT_SECRET: Constants.manifest?.extra?.SPOTIFY_CLIENT_SECRET || "",
};
