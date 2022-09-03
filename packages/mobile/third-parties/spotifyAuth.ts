import Constants from "expo-constants";

const clientId = Constants.manifest?.extra?.SPOTIFY_CLIENT_ID || "";

const authUri = "https://accounts.spotify.com/authorize";
const redirectUri = "https://oauth.pstmn.io/v1/browser-callback";

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
].join(",");
export default async () => {
  try {
    const params = {
      scope: scopes,
    };

    const queryParamString = new URLSearchParams(params);

    const LOGIN_URL = `${authUri}?${queryParamString.toString()}`;

    const res = await fetch(LOGIN_URL);

    const json = await res.text();
    const authCode = json.access_token;
    return authCode;
  } catch (error) {
    console.log("spotify auth error", error.message);
  }
};
