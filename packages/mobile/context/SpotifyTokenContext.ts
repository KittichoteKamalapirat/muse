import { createContext } from "react";
import { SpotifyToken } from "../graphql/generated/graphql";

interface Props {
  token: SpotifyToken;
  setToken: React.Dispatch<React.SetStateAction<SpotifyToken>> | null;
}

export const SpotifyTokenContext = createContext<Props>({
  token: {
    accessToken: "",
    expiresIn: 0,
  },
  setToken: null,
});
