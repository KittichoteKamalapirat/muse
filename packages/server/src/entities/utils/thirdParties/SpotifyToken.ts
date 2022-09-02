import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class SpotifyToken {
  @Field({ nullable: true })
  accessToken: string;

  @Field(() => Int, { nullable: true })
  expiresIn: number;
}

export default SpotifyToken;
