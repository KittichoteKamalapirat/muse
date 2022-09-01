import { Field, InputType } from "type-graphql";

@InputType()
export class SongInput {
  @Field()
  name: string;

  @Field()
  albumName: string;

  @Field()
  albumImageUrl: string;

  @Field()
  artistName: string;
}

export default SongInput;
