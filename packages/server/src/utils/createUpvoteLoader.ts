import DataLoader from "dataloader";
import { Upvote } from "../entities";

// keys (all the post in homepage)
// [{ postId: 221, userId: 64 },
// { postId: 220, userId: 64 },
// { postId: 219, userId: 64 },
// { postId: 218, userId: 64 },]

const createUpvoteLoader = async (keys: any) => {
  const upvotes = await Upvote.findByIds(keys as any);

  const upvoteIdsToUpvote: Record<string, Upvote> = {};
  upvotes.forEach((upvote) => {
    upvoteIdsToUpvote[`${upvote.userId}|${upvote.postId}`] = upvote;
  });

  return keys.map(
    (key: any) => upvoteIdsToUpvote[`${key.userId}|${key.postId}`]
  );
};

export const upvoteLoader = () =>
  new DataLoader<{ postId: number; userId: string }, Upvote | null>(
    createUpvoteLoader
  );
