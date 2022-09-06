import { useContext, useEffect } from "react";
import { View } from "react-native";
import { SpotifyTokenContext } from "../context/SpotifyTokenContext";
import { useGetSpotifyAccessTokenQuery } from "../graphql/generated/graphql";

const useSpotifyAuth = () => {
  console.log("client crediential flow");
  const { token, setToken } = useContext(SpotifyTokenContext);

  const {
    data: tokenData,
    loading: tokenLoading,
    error: tokenError,
  } = useGetSpotifyAccessTokenQuery();

  const { accessToken, expiresIn } = tokenData?.getSpotifyAccessToken || {};

  console.log("access token", tokenData?.getSpotifyAccessToken.accessToken);
  console.log(setToken);
  if (tokenLoading) console.log("loading");
  if (tokenError) console.log(tokenError);

  useEffect(() => {
    if (accessToken && setToken) {
      console.log("🥇 set token in context!");
      setToken({
        accessToken,
        expiresIn,
      });
    }
  }, [setToken, accessToken]);
};

export default useSpotifyAuth;
