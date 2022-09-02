import SpotifyWebApi from "spotify-web-api-node";
import { Query, Resolver } from "type-graphql";
import { Song } from "../entities";
import SpotifyToken from "../entities/utils/thirdParties/SpotifyToken";

// Retrieve an access token.
// const getAccessToken = async () => {
// const grant = await spotifyApi.clientCredentialsGrant()
// const data = await grant.data()
// }

// Retrieve an access token.
// spotifyApi.clientCredentialsGrant().then(
//   function (data) {
//     console.log("The access token expires in " + data.body["expires_in"]);
//     console.log("The access token is " + data.body["access_token"]);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body["access_token"]);
//   },
//   function (err) {
//     console.log("Something went wrong when retrieving an access token", err);
//   }
// );

@Resolver()
export class SpotifyResolver {
  @Query(() => SpotifyToken)
  async getSpotifyAccessToken(): Promise<SpotifyToken | null> {
    try {
      const clientId = process.env.SPOTIFY_CLENT_ID;
      const clientSecret = process.env.SPOTIFY_CLENT_SECRET;

      // Create the api object with the credentials
      const spotifyApi = new SpotifyWebApi({
        clientId,
        clientSecret,
      });

      const data = await spotifyApi.clientCredentialsGrant();

      if (data.statusCode !== 200) return null;
      console.log("data", data);
      console.log("data", data.statusCode);

      const { access_token: accessToken, expires_in: expiresIn } = data.body;

      spotifyApi.setAccessToken(data.body["access_token"]);

      return { accessToken, expiresIn };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
