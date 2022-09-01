import DataLoader from "dataloader";
import { Upvote } from "../entities";

// keys (all the songRequest in homepage)
// [{ songRequestId: 221, userId: 64 },
// { songRequestId: 220, userId: 64 },
// { songRequestId: 219, userId: 64 },
// { songRequestId: 218, userId: 64 },]

const createUpvoteLoader = async (keys: any) => {
  const upvotes = await Upvote.findByIds(keys as any);

  const upvoteIdsToUpvote: Record<string, Upvote> = {};
  upvotes.forEach((upvote) => {
    upvoteIdsToUpvote[`${upvote.userId}|${upvote.songRequestId}`] = upvote;
  });

  return keys.map(
    (key: any) => upvoteIdsToUpvote[`${key.userId}|${key.songRequestId}`]
  );
};

export const upvoteLoader = () =>
  new DataLoader<{ songRequestId: string; userId: string }, Upvote | null>(
    createUpvoteLoader
  );
