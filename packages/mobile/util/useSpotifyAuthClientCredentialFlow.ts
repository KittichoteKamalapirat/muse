import { useContext, useEffect } from "react";
import { SpotifyTokenContext } from "../context/SpotifyTokenContext";
import { useGetSpotifyAccessTokenQuery } from "../graphql/generated/graphql";

const useSpotifyAuth = () => {
  console.log("client crediential flow");
  const { setToken } = useContext(SpotifyTokenContext);

  const {
    data: tokenData,
    loading: tokenLoading,
    error: tokenError,
  } = useGetSpotifyAccessTokenQuery();

  const { accessToken, expiresIn } = tokenData?.getSpotifyAccessToken || {};

  if (tokenLoading) console.log("loading");
  if (tokenError) console.log(tokenError);

  useEffect(() => {
    if (accessToken && setToken) {
      setToken({
        accessToken,
        expiresIn,
      });
    }
  }, [setToken, accessToken]);
};

export default useSpotifyAuth;
