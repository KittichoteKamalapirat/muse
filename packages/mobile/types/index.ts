export interface Musician {
  name: string;
}

export interface Artist {
  name: string;
}

export interface Song {
  id: string;
  title: string;
  imageUri: string;
  album: string;
  artist: string;
  upvotesNum: number;
}

export interface Place {
  id: string;
  name: string;
  musician: Musician;
  songs: Song[];
}
