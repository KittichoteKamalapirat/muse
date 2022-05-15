import { define } from "typeorm-seeding";
import Faker from "faker";
import { Post } from "../../entities";

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.title = faker.commerce.productName();
  post.text = faker.lorem.paragraph();

  return post;
});
