import Constants from "expo-constants";
import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { SpotifyTokenContext } from "../context/SpotifyTokenContext";
import spotifySearch from "../third-parties/spotifySearch";
import { Song } from "../types";
import { debounce } from "../util/debounce";
import { Container } from "./containers/Container";
import SongListing from "./listing/songSearches/SongListing";
import SearchBar from "./SearchBar";

interface Props {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
}

const PAGE = 20;

const SongQueue = styled.View`
  margin-top: 20px;
`;

const Header = styled.Text`
  font-size: 18px;
`;

interface MusicSearchType {
  songs: Song[];
  offset: number;
  isFetching: boolean;
  isEmpty: boolean;
  spotifyToken: string;
  isTokenFetching: boolean;
}
const initialData: MusicSearchType = {
  songs: [],
  offset: 0,
  isFetching: false,
  isEmpty: false,
  spotifyToken: "",
  isTokenFetching: false,
};

const MusicSearch = ({ SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET }: Props) => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { token: tokenContext } = useContext(SpotifyTokenContext);

  const { songs, offset, isFetching, isEmpty } = data;

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    try {
      if (text === "") {
        debounce(() => setData({ ...data, isEmpty: true, songs: [] }))();
      } else {
        debounce(async () => {
          const newSongs = await spotifySearch({
            offset: offset.toString(),
            limit: PAGE.toString(),
            q: text,
            spotifyToken: tokenContext.accessToken as string,
          });

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

  const loadNextPage = async () => {
    try {
      if (isFetching || isEmpty) {
        return;
      }

      setData({ ...data, isFetching: true });

      const newSongs = await spotifySearch({
        offset: offset.toString(),
        limit: PAGE.toString(),
        q: searchQuery,
        spotifyToken: tokenContext.accessToken as string,
      });

      if (newSongs.length === 0) {
        setData({ ...data, isEmpty: true });
      }

      setData({
        ...data,
        isFetching: false,
        songs: [...data.songs, ...newSongs],
        offset: offset + PAGE,
      });
    } catch (error) {}
  };

  const refreshToken = async () => {
    // setData({ ...data, isTokenFetching: true });
    // const newToken = await getSpotifyToken();
    // setData({ ...data, spotifyToken: newToken, isTokenFetching: false });
  };

  const handleEndReached = async () => {
    await loadNextPage();
  };

  // useEffect(() => {
  //   loadNextPage();
  //   refreshToken();
  // }, [data]);

  console.log();

  return (
    <Container>
      <SearchBar
        onChange={(text: string) => handleSearch(text)}
        searchText={searchQuery}
        placeholder="Search for a song"
      />

      <SongQueue>
        {isFetching && songs.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <SongListing items={songs} onEndReached={() => handleEndReached} />
        )}
      </SongQueue>
    </Container>
  );
};

export default MusicSearch;

MusicSearch.defaultProps = {
  SPOTIFY_CLIENT_ID: Constants.manifest?.extra?.SPOTIFY_CLIENT_ID || "",
  SPOTIFY_CLIENT_SECRET: Constants.manifest?.extra?.SPOTIFY_CLIENT_SECRET || "",
};
