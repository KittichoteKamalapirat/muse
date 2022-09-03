const apiPrefix = "https://api.spotify.com/v1/search";

interface ParameterType {
  offset: string;
  limit: string;
  q: string;
  spotifyToken: string;
}

const spotifySearch = async ({
  offset,
  limit,
  q,
  spotifyToken,
}: ParameterType) => {
  console.log("offset", offset);
  console.log("spotifyToken", spotifyToken);
  console.log("q", q);
  try {
    const uri = `${apiPrefix}?type=track&limit=${limit}&offset=${offset}&q=${encodeURIComponent(
      q
    )}`;

    const res = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
        body: "gran_type=client_credentials",
      },
    });

    const json = await res.json();
    if (!res.ok) {
      return [];
    }

    const {
      tracks: { items },
    } = json;

    return items;
  } catch (error) {
    console.log("spotify serach error", error.message);
  }
};

export default spotifySearch;
