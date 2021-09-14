import DataLoader from "dataloader";
import { Upvote } from "../entities/Upvote";

// keys (all the post in homepage)
// [{ postId: 221, userId: 64 },
// { postId: 220, userId: 64 },
// { postId: 219, userId: 64 },
// { postId: 218, userId: 64 },]

// return [{postId: 3, userId: 10, value: 1}]
// export const createUpvoteLoader = () =>
//   new DataLoader<{ postId: number; userId: number }, Upvote | null>(
//     async (keys: any) => {
//       // keys
//       // [{ postId: 221, userId: 64 },
//       // { postId: 220, userId: 64 },
//       // { postId: 219, userId: 64 },
//       // { postId: 218, userId: 64 },]

//       const upvotes = await Upvote.findByIds(keys as any);
//       console.log("hello before upvote ids to upvote");
//       // upvotes
//       // [
//       //   Upvote { value: 1, userId: 64, postId: 217 },
//       //   Upvote { value: 1, userId: 64, postId: 220 },
//       //   Upvote { value: -1, userId: 64, postId: 218 },
//       // ]
//       const upvoteIdsToUpvote: Record<string, Upvote> = {};
//       upvotes.forEach((upvote) => {
//         upvoteIdsToUpvote[`${upvote.userId}|${upvote.postId}`] = upvote;
//       });

//       // upvoteIdsToUpvote
//       // {
//       //   '64|217': Upvote { value: 1, userId: 64, postId: 217 },
//       //   '64|220': Upvote { value: 1, userId: 64, postId: 220 },
//       //   '64|218': Upvote { value: -1, userId: 64, postId: 218 },
//       //   '64|216': Upvote { value: 1, userId: 64, postId: 216 },
//       // }

//       return keys.map((key: any) => {
//         upvoteIdsToUpvote[`${key.userId}|${key.postId}`];
//         console.log("fromcreateupvoteloader function");
//         console.log(upvoteIdsToUpvote[`${key.userId}|${key.postId}`]);
//       });
//     }
//   );

const createUpvoteLoader = async (keys: any) => {
  console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
  console.log("keys");
  console.log(keys);
  const upvotes = await Upvote.findByIds(keys as any);
  console.log("upvotes");
  console.log(upvotes);
  console.log("--------------------------------------");

  const upvoteIdsToUpvote: Record<string, Upvote> = {};
  upvotes.forEach((upvote) => {
    upvoteIdsToUpvote[`${upvote.userId}|${upvote.postId}`] = upvote;
  });

  return keys.map((key: any) => {
    console.log(upvoteIdsToUpvote[`${key.userId}|${key.postId}`]);
    console.log("+++++++++++++++++++++++++++++++++");
    return upvoteIdsToUpvote[`${key.userId}|${key.postId}`];
  });
};

export const upvoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Upvote | null>(
    createUpvoteLoader
  );
