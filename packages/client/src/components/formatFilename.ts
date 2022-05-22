import moment from "moment";

// add date, add random string, remove special characters
const formatFilename = (filename: string) => {
  const date = moment().format("YYYYMMDD");
  const randomString = Math.random().toString(36).substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  // TODO add folder structure
  const newFilename = `${date}-${randomString}-${cleanFileName}`;
  return newFilename.substring(0, 60);
};

export default formatFilename;
