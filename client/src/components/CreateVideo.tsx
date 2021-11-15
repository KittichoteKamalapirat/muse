import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Dropzone from "react-dropzone";

import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Image, Img } from "@chakra-ui/react";
import { UploadVideoIcon } from "./Icons/UploadVideoIcon";

interface CreateVideoProps {
  videoPreview: any;
  autoThumbnailUrl: string;
  handleOnDropVideo: Function;

  videoPreviewHandler: Function;
  nextStep: Function;
  handleMetadata: Function;
}

export const CreateVideo: React.FC<CreateVideoProps> = ({
  videoPreview,
  handleOnDropVideo,
  videoPreviewHandler,
  nextStep,
  handleMetadata,
  autoThumbnailUrl,
}) => {
  // const handleMetadata = () => {
  //   const canvas = document.createElement("canvas");
  //   const video = document.getElementById("preview") as HTMLVideoElement;
  //   canvas.width = video!.videoWidth;
  //   canvas.height = video!.videoHeight;
  //   const ctx = canvas.getContext("2d")!;
  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //   console.log("7");
  //   const dataUrl = canvas.toDataURL();
  //   setUrl(dataUrl);
  // };

  return (
    <Box>
      <Dropzone
        onDrop={(acceptedFiles, rejectedFiles) =>
          handleOnDropVideo(acceptedFiles, rejectedFiles)
        }
        // maxSize={1000 * 1}
        multiple={false}
        // accept= {['image/*', 'video/*']}
        accept="video/*"

        // accept="video/mp4"
      >
        {({ getRootProps, getInputProps }) => (
          <Box mt={2}>
            {/* <Box mb={2}>Video</Box> */}
            <Box cursor="pointer" padding={4}>
              <div
                {...getRootProps({
                  onChange: (event) => {
                    videoPreviewHandler(event);
                  },
                })}
              >
                <input {...getInputProps()} />
                {!videoPreview ? (
                  <Flex
                    direction="column"
                    p="2rem"
                    alignItems="center"
                    border="1px"
                    borderColor="gray.400"
                    borderStyle="dashed"
                  >
                    {/* <ArrowUpIcon mt="3rem" /> */}
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
                      {/* <video
                        controls
                        width="90%"
                        id="preview"
                        onLoadedMetadata={() => {
                          handleMetadata();
                        }}
                        // handleMetadata() }
                        src={videoPreview}
                      /> */}

                      <video
                        controls
                        width="90%"
                        id="preview"
                        onLoadedMetadata={() => {
                          setTimeout(() => {
                            handleMetadata();
                          }, 100);
                        }}
                        src={videoPreview}
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

                    {/* <EditIcon m={2} /> */}

                    <Flex justifyContent="right">
                      {/* <IconButton
                        aria-label="Search database"
                        icon={<ChevronRightIcon />}
                        onClick={() => nextStep()}
                        fontSize="x-large"
                        color="dark.200"
                        variant="none"
                      /> */}
                    </Flex>
                  </Box>
                )}
              </div>
            </Box>
          </Box>
        )}
      </Dropzone>
      <Flex justifyContent="right">
        <Button color="green.400" mt="5rem" onClick={() => nextStep()}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};
