import { ChevronLeftIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Img,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UrlResolver from "../lib/UrlResolver";
import { FileInput } from "../types/utils/FileInput";
import { FileMetadata } from "../types/utils/FileMetadata";

import { ResourceType } from "../types/utils/ResourceType";
import getRESTOptions from "../util/getRESTOptions";

interface CreateThumbnailProps {
  prevStep: Function;
  nextStep: Function;
  autoThumbnailS3UrlAndId: FileMetadata | null;
  thumbnailS3UrlAndID: FileMetadata | null;
  setThumbnailS3UrlAndID: React.Dispatch<
    React.SetStateAction<FileMetadata | null>
  >;
}

const urlResolver = new UrlResolver();

export const CreateThumbnail: React.FC<CreateThumbnailProps> = ({
  prevStep,
  nextStep,
  autoThumbnailS3UrlAndId,
  thumbnailS3UrlAndID,
  setThumbnailS3UrlAndID,
}) => {
  const [thumbnailFile, setThumbnailFile] = useState({ file: null } as any);

  const handleOnDropThumbnail = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }
    setThumbnailFile({ file: acceptedFiles[0] });
  };

  useEffect(() => {
    if (thumbnailFile.file) {
      const input: FileInput = {
        name: thumbnailFile.file.name,
        fileType: thumbnailFile.file.type,
        resourceType: ResourceType.POST,
      };

      // sign
      axios.post(urlResolver.signS3(), input).then((response) => {
        const options = getRESTOptions(thumbnailFile.file.type);

        // save to s3
        axios.put(response.data.sign, thumbnailFile.file, options);
        setThumbnailS3UrlAndID({
          url: response.data.url,
          id: response.data.id,
        });
      });
    }
  }, [thumbnailFile.file]);

  return (
    <Box>
      {thumbnailS3UrlAndID === null ? (
        <Flex justifyContent="center">
          <Img src={autoThumbnailS3UrlAndId?.url} alt="auto-thumbnail-url" />
        </Flex>
      ) : (
        <Flex justifyContent="center">
          {/* <AspectRatio ratio={1}> */}
          <Image
            src={thumbnailS3UrlAndID.url}
            alt="image"
            boxSize="90%"
            fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
          />
        </Flex>
      )}

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
      <Flex justifyContent="space-between">
        <IconButton
          aria-label="Search database"
          icon={<ChevronLeftIcon />}
          onClick={() => prevStep()}
          fontSize="x-large"
          color="dark.200"
          variant="transparent"
        />

        <Button variant="transparent" color="brand" onClick={() => nextStep()}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};
