import Faker from "faker";
import { define } from "typeorm-seeding";
import { Video } from "../entities";

define(Video, (faker: typeof Faker) => {
  const name = faker.name.findName();
  const fileType = "video/mp4";
  const url =
    "https://cookknow.s3.ap-southeast-1.amazonaws.com/aglioi+e+olio.mp4";

  const video = new Video();
  video.name = name;
  video.fileType = fileType;
  video.url = url;

  return video;
});
