import { ObjectType, Field } from "type-graphql";

@ObjectType()
class PostSignedS3 {
  @Field()
  videoSignedRequest: string;

  @Field()
  thumbnailSignedRequest: string;

  @Field()
  videoUrl: string;

  @Field()
  thumbnailUrl: string;
}

export default PostSignedS3;
