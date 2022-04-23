import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UrlResolver from "../lib/UrlResolver";
import { FileInput } from "../types/utils/FileInput";
import { FileMetadata } from "../types/utils/FileMetadata";

import { ResourceType } from "../types/utils/ResourceType";
import getRESTOptions from "../util/getRESTOptions";
import { UploadVideoIcon } from "./Icons/UploadVideoIcon";

interface CreateVideoProps {
  nextStep: Function;
  handleMetadata: Function;
  videoS3UrlAndID: FileMetadata | null;
  setVideoS3UrlAndID: React.Dispatch<React.SetStateAction<FileMetadata | null>>;
}

const urlResolver = new UrlResolver();

export const CreateVideo: React.FC<CreateVideoProps> = ({
  nextStep,
  handleMetadata,
  videoS3UrlAndID,
  setVideoS3UrlAndID,
}) => {
  const [videoFile, setVideoFile] = useState({ file: null } as any); // is what uploaded to s3

  const handleOnDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setVideoFile({ file: acceptedFiles[0] });
  };

  console.log({ videoS3UrlAndID });

  useEffect(() => {
    if (videoFile.file) {
      const input: FileInput = {
        name: videoFile.file.name,
        fileType: videoFile.file.type,
        resourceType: ResourceType.POST,
      };

      // sign
      axios.post(urlResolver.signS3(), input).then((response) => {
        const options = getRESTOptions(videoFile.file.type);

        // save to s3
        axios.put(response.data.sign, videoFile.file, options);
        setVideoS3UrlAndID({ url: response.data.url, id: response.data.id });
      });

      // the process should be something like this
      // 1) sec 0.0 video is dropped
      // 2) sec 0.1 video is shown on the canvas
      // 3) sec 0.5: setMetadata is called, get the video canvas, so the setThumbnail is called
      // 4) sec 1: go to next page  (if go to next page too fast, handlemetadata is called, but it can't find the video)
      // important point is that 3 happens before 4
      // also video can't be url, has t be videoPreview (actual data))
      //
    }
  }, [videoFile.file]);

  return (
    <Box>
      <Dropzone
        onDrop={(acceptedFiles, rejectedFiles) =>
          handleOnDropVideo(acceptedFiles, rejectedFiles)
        }
        // maxSize={1000 * 1}
        multiple={false}
        accept="video/*"
      >
        {({ getRootProps, getInputProps }) => (
          <Box mt={2}>
            <Box cursor="pointer" padding={4}>
              <div {...getRootProps({})}>
                <input {...getInputProps()} />

                {!videoS3UrlAndID ? (
                  <Flex
                    direction="column"
                    p="2rem"
                    alignItems="center"
                    border="1px"
                    borderColor="gray.400"
                    borderStyle="dashed"
                  >
                    <UploadVideoIcon />
                    <Heading fontSize="xl" textAlign="center">
                      Select a video
                    </Heading>
                    <Text fontSize="sm" textAlign="center">
                      Or drag and drop here
                    </Text>
                  </Flex>
                ) : (
                  <Box>
                    <Box justifyContent="center" alignItems="end">
                      <video
                        controls
                        width="90%"
                        id="preview"
                        crossOrigin="anonymous"
                        onLoadedMetadata={() => {
                          setTimeout(() => {
                            handleMetadata();
                            // nextStep();
                          }, 1000); // 10 doesn't work
                        }}
                        src={videoS3UrlAndID.url}
                      />
                    </Box>
                    <Flex
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      mt={2}
                    >
                      <PlusSquareIcon mr={2} />
                      <Text textAlign="center">Change a video</Text>
                    </Flex>

                    <Flex justifyContent="right"></Flex>
                  </Box>
                )}
              </div>
            </Box>
          </Box>
        )}
      </Dropzone>

      <Flex justifyContent="right">
        <Button
          variant="transparent"
          color="brand"
          mt="5rem"
          onClick={() => nextStep()}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};
