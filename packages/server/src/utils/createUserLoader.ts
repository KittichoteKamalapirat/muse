import DataLoader from "dataloader";
import { User } from "../entities";

// [1,3,5,7]
// [{id: 1, username: "bob"},{},{}]
export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await User.findByIds(userIds as string[]);
    const userIdToUser: Record<string, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });
    return userIds.map((userId) => userIdToUser[userId]);
  });
