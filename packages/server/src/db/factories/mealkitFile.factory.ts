import { define } from "typeorm-seeding";
import Faker from "faker";
import { MealkitFile } from "../../entities";

define(MealkitFile, (faker: typeof Faker) => {
  const name = faker.name.findName();
  const fileType = "image/png";
  const url =
    "https://cookknow.s3.ap-southeast-1.amazonaws.com/broccoli+garlic.png";

  const file = new MealkitFile();
  file.name = name;
  file.fileType = fileType;
  file.url = url;

  return file;
});
