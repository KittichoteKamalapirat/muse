import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Song, SongRequest, Upvote } from "../entities";
import SongInput from "../entities/utils/song/SongInput";
import { MyContext } from "../types";

@Resolver(SongRequest)
export class SongRequestResolver {
  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() songRequest: SongRequest,
    @Ctx() { upvoteLoader, req }: MyContext
  ) {
    if (!req.session.userId) {
      return null;
    }

    const upvote = await upvoteLoader.load({
      songRequestId: songRequest.id,
      userId: req.session.userId,
    });

    return upvote ? upvote.value : null; // could be -1,0,1
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async isRequested(
    @Root() songRequest: SongRequest,
    @Ctx() { upvoteLoader, req }: MyContext
  ) {
    if (!req.session.userId) {
      return null;
    }

    const existingSongRequest = await SongRequest.findOne({
      where: {
        boxId: songRequest.boxId,
        songId: songRequest.songId,
      },
    });

    return !!existingSongRequest;
  }

  @Query(() => [SongRequest])
  async songRequests(@Arg("boxId") boxId: string): Promise<SongRequest[]> {
    try {
      const songs = await SongRequest.find({
        where: { boxId },
        relations: ["song", "box", "requester"],
      });
      return songs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Query(() => SongRequest)
  async songRequest(
    @Arg("id") id: string
  ): Promise<SongRequest | null | undefined> {
    try {
      const song = await SongRequest.findOne({
        where: { id },
        relations: [],
      });
      return song;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation(() => SongRequest)
  async addSongRequest(
    @Arg("spotifyTrackId") spotifyTrackId: string,
    @Arg("songInput", () => SongInput) songInput: SongInput,
    @Arg("boxId") boxId: string,
    @Ctx() { req }: MyContext
  ): Promise<SongRequest | Error> {
    try {
      let existingSong = await Song.findOne({ where: { spotifyTrackId } });
      // song exists
      if (!existingSong) {
        existingSong = await Song.create({
          ...songInput,
          spotifyTrackId,
        }).save();
      }

      const songRequest = await SongRequest.create({
        songId: existingSong.id,
        boxId,
        requesterId: req.session.userId,
      }).save();

      return songRequest;
    } catch (error) {
      //   rollbar.log(error);
      throw new Error("cannot create a address");
    }
  }

  @Mutation(() => Boolean)
  async vote(
    @Arg("songRequestId", () => String) songRequestId: string,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const isUpvote = value !== 0;
    const realValue = isUpvote ? 1 : -1; // if happen to pass in value = 12 -> make it 1 or -1, -12 will be 1 anyway

    const upvoted = await Upvote.findOne({ where: { songRequestId, userId } });

    // if voted before
    //    if +1 now
    //      if before was +1 => toggle to 0 (add -1)
    //      if before was 0 => +1 (add +1)
    //      if before was -1 => +1 (add +2)
    //    if -1 now
    //      if before was +1 => -1 (add -2)
    //      if before was 0 => -1 (add -1)
    //      if before was -1 => +toggle to 0 (add +1)
    // if did not vote yet
    //    if +1 now => +1
    //    if -1 now => -1

    // the user has voted before and want to change the vote

    let updatedValue = 0;
    if (upvoted) {
      await getConnection().transaction(async (tm) => {
        if (realValue === 1) {
          // toggle vote case
          if (upvoted.value === 1) {
            updatedValue = 0;
            await tm.query(
              `
            update song_request
            set counts = counts + $1
            where id = $2;
            `,
              [-1, songRequestId]
            );
            // toggled once and now upvote case
          } else if (upvoted.value == 0) {
            updatedValue = 1;
            await tm.query(
              `
            update song_request
            set counts = counts + $1
            where id = $2;
            `,
              [1, songRequestId]
            );
          } else {
            updatedValue = 1;
            // downvoted once and now upvote case
            await tm.query(
              `
            update song_request
            set counts = counts + $1
            where id = $2;
            `,
              [2, songRequestId]
            );
          }
          // realValue === -1
        } else {
          // previously upvote but now downvote case
          if (upvoted.value === 1) {
            updatedValue = -1;
            await tm.query(
              `
            update song_request
            set counts = counts + $1
            where id = $2;
            `,
              [-2, songRequestId]
            );
            // previously toggled and now downvote case
          } else if (upvoted.value == 0) {
            updatedValue = -1;
            await tm.query(
              `
            update song_request
            set counts = counts + $1
            where id = $2;
            `,
              [-1, songRequestId]
            );
          } else {
            updatedValue = 0;
            // previously downvote and toggle back
            await tm.query(
              `
            update song_request
            set counts = counts + $1
            where id = $2;
            `,
              [+1, songRequestId]
            );
          }
        }

        await tm.query(
          `
        update upvote 
        set value = $1
        where "songRequestId" = $2 and "userId" = $3
        `,
          [updatedValue, songRequestId, userId]
        );
      });
      // if has never voted before
    } else {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
      insert into upvote ("userId","songRequestId","value")
      values ($1,$2,$3);
      `,
          [userId, songRequestId, 1]
        );

        await tm.query(
          `
      update song_request
      set counts = counts + $1
      where id = $2;

      `,
          [realValue, songRequestId]
        );
      });
    }

    return true;
  }
}
