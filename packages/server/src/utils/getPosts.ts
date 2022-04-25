import { In, LessThan } from "typeorm";
import { Post } from "../entities";

const getPosts = async (cursor, realLimitPlusOne, upvotedPostIds) =>
  Post.find({
    where: {
      isPublished: true,
      ...(cursor && { createdAt: LessThan(new Date(parseInt(cursor, 10))) }),
      ...(upvotedPostIds && { id: In(upvotedPostIds) }),
    },
    relations: [
      "mealkits",
      "mealkits.mealkitFiles",
      "mealkits.creator",
      "video",
      "image",
    ],
    take: realLimitPlusOne,
  });

export default getPosts;
