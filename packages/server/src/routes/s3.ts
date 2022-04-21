import { Router } from "express";
import { Video } from "../entities";
import { signSingleFileS3 } from "../utils/resolvers/s3";

const router = Router();

interface FileMetadata {
  name: string;
  fileType: string;
}

// url: server.cookknow.com/api/s3/sign
router.post("/sign", async (req, res) => {
  try {
    const { name, fileType }: FileMetadata = req.body;

    // 1) sign to s3
    const { signedRequest, fileUrl } = await signSingleFileS3(name, fileType);

    // 2.1) save url to db
    const video = await Video.create({
      name,
      fileType,
      url: fileUrl,
    }).save();

    const returnedValue = {
      sign: signedRequest,
      url: video.url,
    };

    res.json(returnedValue);
  } catch (error) {
    // todo
  }
});

export default router;
