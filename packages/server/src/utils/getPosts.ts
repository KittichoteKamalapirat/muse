import { LessThan } from "typeorm";
import { Post } from "../entities";

const getPosts = async (cursor, realLimitPlusOne) => {
  if (typeof cursor === "string") {
    return Post.find({
      where: {
        isPublished: true,
        createdAt: LessThan(new Date(parseInt(cursor, 10))),
      },
      relations: ["mealkits", "mealkits.mealkitFiles", "video", "image"],
      take: realLimitPlusOne,
    });
  }

  return Post.find({
    where: { isPublished: true },
    relations: ["mealkits", "mealkits.mealkitFiles", "video", "image"],
    take: realLimitPlusOne,
  });
};

export default getPosts;
