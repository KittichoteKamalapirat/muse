import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, Img, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { urlResolver } from "../lib/UrlResolver";
import { FileInput } from "../types/utils/FileInput";
import { FileMetadata } from "../types/utils/FileMetadata";
import { ResourceType } from "../types/utils/ResourceType";
import getRESTOptions from "../util/getRESTOptions";
import FormFieldLabel from "./form/FormFieldLabel/FormFieldLabel";
import formatFilename from "./formatFilename";
import SvgUploadImage from "./Icons/UploadImage";
import { Loading } from "./skeletons/Loading";

interface CreateThumbnailProps {
  autoThumbnailS3UrlAndId: FileMetadata | null;
  thumbnailS3UrlAndID: FileMetadata | null;
  setThumbnailS3UrlAndID: React.Dispatch<
    React.SetStateAction<FileMetadata | null>
  >;
}

export const CreateThumbnail: React.FC<CreateThumbnailProps> = ({
  autoThumbnailS3UrlAndId,
  thumbnailS3UrlAndID,
  setThumbnailS3UrlAndID,
}) => {
  const [thumbnailFile, setThumbnailFile] = useState({ file: null } as any);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleOnDropThumbnail = (acceptedFiles: any, rejectedFiles: any) => {
    setIsUploading(true);
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }
    setThumbnailFile({ file: acceptedFiles[0] });
  };

  useEffect(() => {
    if (thumbnailFile.file) {
      const input: FileInput = {
        name: formatFilename(thumbnailFile.file.name),
        fileType: thumbnailFile.file.type,
        resourceType: ResourceType.POST,
      };

      // sign
      axios.post(urlResolver.signS3(), input).then((response) => {
        const options = getRESTOptions(thumbnailFile.file.type);

        // save to s3
        axios.put(response.data.sign, thumbnailFile.file, options).then(() => {
          setThumbnailS3UrlAndID({
            url: response.data.url,
            id: response.data.id,
          });
          setIsUploading(false);
        });
      });
    }
  }, [thumbnailFile, setThumbnailS3UrlAndID]);

  return (
    <Box>
      {thumbnailS3UrlAndID === null ? (
        autoThumbnailS3UrlAndId === null ? (
          <Flex
            direction="column"
            my="1rem"
            p="2rem"
            alignItems="center"
            border="1px"
            borderColor="gray.400"
            borderStyle="dashed"
          >
            <SvgUploadImage />

            <FormFieldLabel
              label="Select images or videos"
              required
              fontSize="xl"
            />

            <Text fontSize="sm" textAlign="center">
              Or drag and drop here
            </Text>
          </Flex>
        ) : (
          <Flex justifyContent="center">
            <Img
              src={autoThumbnailS3UrlAndId?.url}
              alt="default humbnail for video"
            />
          </Flex>
        )
      ) : (
        <Flex justifyContent="center">
          {/* <AspectRatio ratio={1}> */}
          <Image
            src={thumbnailS3UrlAndID.url}
            alt="image"
            boxSize="90%"
            fallbackSrc="oops.png"
          />
        </Flex>
      )}

      {isUploading && <Loading text="uploading image" />}
      {!isUploading && (
        <Dropzone
          onDrop={(acceptedFiles: any, rejectedFiles: any) =>
            handleOnDropThumbnail(acceptedFiles, rejectedFiles)
          }
          // maxSize={1000 * 1}
          multiple={true}
          accept="image/*"
        >
          {({ getRootProps, getInputProps }) => (
            <Box mt={2}>
              {/* <Box mb={2}>Thumbnail Image</Box> */}
              <Box
                cursor="pointer"
                // border="1px"
                // borderColor="gray.200"
                padding={4}
              >
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />

                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    border={!thumbnailS3UrlAndID ? "1px" : undefined}
                    borderColor="gray.400"
                    borderStyle="dashed"
                  >
                    {!thumbnailS3UrlAndID ? (
                      <PlusSquareIcon mr={2} />
                    ) : (
                      <Image
                        border="1px"
                        borderColor="black"
                        mr={2}
                        borderRadius="20%"
                        src={thumbnailS3UrlAndID.url}
                        alt="image"
                        boxSize="2rem"
                        fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                      />
                    )}
                    <Text textAlign="center">Add a custom cover</Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          )}
        </Dropzone>
      )}
    </Box>
  );
};
