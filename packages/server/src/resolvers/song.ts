import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Song } from "../entities";
import SongInput from "../entities/utils/song/SongInput";

@Resolver(Song)
export class SongResolver {
  @Query(() => [Song])
  async songs(): Promise<Song[]> {
    try {
      const songs = await Song.find();
      return songs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Query(() => Song)
  async song(@Arg("id") id: string): Promise<Song | null | undefined> {
    try {
      const song = await Song.findOne({
        where: { id },
        relations: [],
      });
      return song;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation(() => Song)
  async createSong(
    @Arg("input", () => SongInput) input: SongInput
  ): Promise<Song | Error> {
    try {
      const song = await Song.create({
        ...input,
      }).save();

      return song;
    } catch (error) {
      //   rollbar.log(error);
      throw new Error("cannot create a song");
    }
  }
}
