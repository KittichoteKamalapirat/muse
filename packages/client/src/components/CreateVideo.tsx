import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Dropzone from "react-dropzone";

import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Image, Img } from "@chakra-ui/react";
import { UploadVideoIcon } from "./Icons/UploadVideoIcon";
import { useCreateVideoMutation, VideoInput } from "../generated/graphql";
import axios from "axios";

const signUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/s3/sign`;

interface CreateVideoProps {
  // videoFile: any;
  // videoPreview: any;
  autoThumbnailUrl: string;
  nextStep: Function;
  handleMetadata: Function;
}

interface FileMetadata {
  name: string;
  fileType: string;
}

export const CreateVideo: React.FC<CreateVideoProps> = ({
  // videoPreview,
  nextStep,
  handleMetadata,
  autoThumbnailUrl,
}) => {
  const [videoFile, setVideoFile] = useState({ file: null } as any);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleOnDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }
    setTimeout(() => {}, 1000);

    setVideoFile({ file: acceptedFiles[0] });
  };

  useEffect(() => {
    if (videoFile.file) {
      const input: FileMetadata = {
        name: videoFile.file.name,
        fileType: videoFile.file.type,
      };

      // sign
      axios
        .post("http://localhost:4000/api/s3/sign", input)
        .then((response) => {
          const options = {
            headers: {
              "Content-Type": videoFile.file.type,
            },
          };

          // save to s3
          axios.put(response.data.sign, videoFile.file, options);

          nextStep();
          setVideoUrl(response.data.url);
        });

      // setVideoUrl(data.url);
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
        // accept= {['image/*', 'video/*']}
        accept="video/*"

        // accept="video/mp4"
      >
        {({ getRootProps, getInputProps }) => (
          <Box mt={2}>
            <Box cursor="pointer" padding={4}>
              <div
                {...getRootProps({
                  onChange: (event) => {
                    // videoPreviewHandler(event);
                  },
                })}
              >
                <input {...getInputProps()} />

                {!videoUrl ? (
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
                      <video
                        controls
                        width="90%"
                        id="preview"
                        onLoadedMetadata={() => {
                          setTimeout(() => {
                            handleMetadata();
                          }, 500);
                        }}
                        src={videoUrl}
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
