import { useAuthRequest } from "expo-auth-session";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { useContext, useEffect } from "react";
import { SpotifyTokenContext } from "../context/SpotifyTokenContext";

WebBrowser.maybeCompleteAuthSession();

const clientId = Constants.manifest?.extra?.SPOTIFY_CLIENT_ID || "";

// const redirectUri = "http://localhost:19000";
const redirectUri = "exp://localhost:19000/--/";
// const redirectUri = "https://oauth.pstmn.io/v1/browser-callback";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const scopes = [
  // "ugc-image-upload",
  // "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  // "user-follow-modify",
  "user-follow-read",
  "user-read-recently-played",
  "user-read-playback-position",
  "user-top-read",
  "playlist-read-collaborative",
  // "playlist-modify-public",
  "playlist-read-private",
  // "playlist-modify-private",
  "app-remote-control",
  "streaming",
  "user-read-email",
  "user-read-private",
  // "user-library-modify",
  "user-library-read",
];

export const useIsSpotifyuAuth = () => {
  console.log("get spotify token hook ");
  const { token, setToken } = useContext(SpotifyTokenContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      responseType: "token", // or "code"
      // For usage in managed apps using the proxy
      redirectUri,
    },
    discovery
  );

  useEffect(() => {
    // if login nothing happen
    // if not log in, do this
    if (request && token === "") {
      promptAsync();
    }
  }, [token, request]);

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token, expires_in } = response.params;

      if (setToken)
        setToken({
          accessToken: access_token,
          expiresIn: parseInt(expires_in),
        });
    }
  }, [response]);
};
