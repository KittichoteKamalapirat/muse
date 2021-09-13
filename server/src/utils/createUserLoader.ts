import { checkForResolveTypeResolver } from "apollo-server-express";
import DataLoader from "dataloader";
import { User } from "../entities/User";

// [1,3,5,7]
//[{id: 1, username: "bob"},{},{}]
export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });
    return userIds.map((userId) => userIdToUser[userId]);
  });
