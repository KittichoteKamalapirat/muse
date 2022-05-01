import { MealkitFile } from "../entities";

const getThumbnailFromMealkitFiles = (files: MealkitFile[]) =>
  files.find((file) => file.fileType.includes("image"));

export default getThumbnailFromMealkitFiles;
