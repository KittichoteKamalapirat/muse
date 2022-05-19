import { define } from "typeorm-seeding";
import Faker from "faker";
import { Image } from "../../entities";

define(Image, (faker: typeof Faker) => {
  const name = faker.name.findName();
  const fileType = "image/png";
  const url =
    "https://cookknow.s3.ap-southeast-1.amazonaws.com/broccoli+garlic.png";

  const video = new Image();
  video.name = name;
  video.fileType = fileType;
  video.url = url;

  return video;
});
