/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Router } from "express";
import { Image, MealkitFile, Video } from "../entities";
import { signSingleFileS3 } from "../utils/resolvers/s3";

const router = Router();

interface FileMetadata {
  name: string;
  fileType: string;
  resourceType: string;
}

// eslint-disable-next-line no-unused-vars
enum ResourceTypeWithFile {
  POST = "post",
  MEALKIT = "mealkit",
}

// url: server.cookknow.com/api/s3/sign
router.post("/sign-and-save", async (req, res) => {
  try {
    const { name, fileType, resourceType }: FileMetadata = req.body;

    // 1) sign to s3
    const { signedRequest, fileUrl } = await signSingleFileS3(name, fileType);

    // 2.1) save url to db
    switch (true) {
      // Video for Post
      case resourceType === ResourceTypeWithFile.POST &&
        fileType.includes("video"): {
        const video = await Video.create({
          name,
          fileType,
          url: fileUrl,
        }).save();

        const returnedValue = {
          id: video.id,
          sign: signedRequest,
          url: video.url,
        };

        res.json(returnedValue);
        break;
      }

      // Image for Post
      case resourceType === ResourceTypeWithFile.POST &&
        fileType.includes("image"): {
        const image = await Image.create({
          name,
          fileType,
          url: fileUrl,
        }).save();

        const returnedValue = {
          id: image.id,
          sign: signedRequest,
          url: image.url,
        };

        res.json(returnedValue);
        break;
      }

      // Image or Video for Mealkit
      case resourceType === ResourceTypeWithFile.MEALKIT: {
        const file = await MealkitFile.create({
          name,
          fileType,
          url: fileUrl,
        }).save();

        const returnedValue = {
          id: file.id,
          sign: signedRequest,
          url: file.url,
        };

        res.json(returnedValue);
        break;
      }

      default:
        break;
    }
  } catch (error) {
    // todo
  }
});

export default router;
