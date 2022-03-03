import axios from "axios";

export const uploadToS3 = async (
  videoFile: any,
  thumbnailFile: any,
  videoSignedRequest: string,
  thumbnailSignedRequest: string,
  autoThumbnailBlob: any
) => {
  const videoOptions = {
    headers: {
      "Content-Type": videoFile.type,
    },
  };

  const thumbnailOptions = {
    headers: {
      "Content-Type": thumbnailFile ? thumbnailFile.type : "img/png",
    },
  };

  await axios.put(videoSignedRequest, videoFile, videoOptions);
  await axios.put(
    thumbnailSignedRequest,
    thumbnailFile || autoThumbnailBlob,
    thumbnailOptions
  );
};
