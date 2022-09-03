import React from "react";
import { SafeAreaView, View } from "react-native";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MusicSearch from "../components/MusicSearch";
import tw from "../lib/tailwind";

import { useIsSpotifyuAuth } from "../util/useSpotifyAuthAuthorizationFlow";

const SearchScreen = () => {
  useIsSpotifyuAuth();

  return (
    <ScreenLayout>
      <View style={tw`w-full`}>
        <MusicSearch />
      </View>
    </ScreenLayout>
  );
};

export default SearchScreen;
