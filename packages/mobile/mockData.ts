import { Musician, Song, Place, Artist } from "./types";

export const musicians: Musician[] = [
  {
    name: "Joe STW",
  },
  {
    name: "DJ Poom",
  },
  {
    name: "David Guetta",
  },
];

export const artists: Artist[] = [
  {
    name: "Ed Sheeran",
  },
  {
    name: "Jack Johnson",
  },
  {
    name: "Jason Mrax",
  },
];

export const songs: Song[] = [
  {
    id: "1",
    title: "Perfect",
    artist: artists[0].name,
    upvotesNum: 10,
    imageUri: "",
    album: "Divide",
  },
  {
    id: "2",
    title: "I Got You",
    artist: artists[1].name,
    imageUri: "",
    upvotesNum: 9,
    album: "Divide",
  },
  {
    id: "3",
    title: "I'm yours",
    artist: artists[2].name,
    imageUri: "",
    upvotesNum: 7,
    album: "Divide",
  },
];

export const places: Place[] = [
  {
    id: "1",
    name: "Doctor Fetch",
    musician: musicians[0],
    songs,
  },

  {
    id: "2",
    name: "Terra",
    musician: musicians[1],
    songs,
  },

  {
    id: "3",
    name: "Paper Plane",
    musician: musicians[2],
    songs,
  },
];
