import Constants from "expo-constants";
import base64 from "react-native-base64";
import spotifyAuth from "./spotifyAuth";

const clientId = Constants.manifest?.extra?.SPOTIFY_CLIENT_ID || "";
const secret = Constants.manifest?.extra?.SPOTIFY_CLIENT_SECRET || "";

const apiPrefix = "https://accounts.spotify.com/api";
const base64credentials = base64.encode(clientId + ":" + secret);

export default async () => {
  try {
    const url = `${apiPrefix}/token`;

    const authCode = await spotifyAuth();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "gran_type=client_credentials",
    });

    const json = await res.json();
    const newToken = json.access_token;

    return newToken;
  } catch (error) {
    console.log("spotify get token error", error.message);
  }
};
