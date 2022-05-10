import { define } from "typeorm-seeding";
import Faker from "faker";
import { Post } from "../entities";

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.title = faker.commerce.productName();
  post.text = faker.lorem.paragraph();
  post.ingredients = [...Array(3)].map(() => faker.commerce.product());

  return post;
});
