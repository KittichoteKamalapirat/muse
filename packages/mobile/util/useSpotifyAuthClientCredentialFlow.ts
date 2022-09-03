import { useContext, useEffect } from "react";
import { View } from "react-native";
import { SpotifyTokenContext } from "../context/SpotifyTokenContext";
import { useGetSpotifyAccessTokenQuery } from "../graphql/generated/graphql";

const useSpotifyAuth = () => {
  const { token, setToken } = useContext(SpotifyTokenContext);

  const {
    data: tokenData,
    loading: tokenLoading,
    error: tokenError,
  } = useGetSpotifyAccessTokenQuery();

  const { accessToken, expiresIn } = tokenData?.getSpotifyAccessToken || {};

  useEffect(() => {
    console.log("useEffect is run");
    console.log("accessToken", accessToken);
    console.log("setToken", setToken);

    if (accessToken && setToken) {
      console.log("set token");
      setToken({
        accessToken,
        expiresIn,
      });
    }
    console.log("--------------------------------");
  }, [setToken, accessToken]);

  // return ;
  // useEffect(() => {
  //   if (!token.expiresIn) return;

  //   setTimeout(() => {}, (token.expiresIn - 60) * 1000); //59mins * 1000 ครบ 59 นาทีแล้ว fetch ใหม่
  // });
};

export default useSpotifyAuth;
