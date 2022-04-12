import { ObjectType, Field } from "type-graphql";
import Post from "../../Post";

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

export default PaginatedPosts;
