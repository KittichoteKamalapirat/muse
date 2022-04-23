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
  // autoThumbnailUrl: string;
  // videoPreviewHandler: (e: React.FormEvent<HTMLDivElement>) => void;
  nextStep: Function;
  handleMetadata: Function;
}

interface FileMetadata {
  name: string;
  fileType: string;
}

export const CreateVideo: React.FC<CreateVideoProps> = ({
  nextStep,
  handleMetadata,
  // videoPreviewHandler,
  // autoThumbnailUrl,
}) => {
  const [videoFile, setVideoFile] = useState({ file: null } as any); // is what uploaded to s3
  const [videoUrl, setVideoUrl] = useState<string>(""); //is what saved to our db

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

          setVideoUrl(response.data.url);
        });

      // the process should be something like this
      // 1) sec 0.0 video is dropped
      // 2) sec 0.1 video is shown on the canvas
      // 3) sec 0.5: setMetadata is called, get the video canvas, so the setThumbnail is called
      // 4) sec 1: go to next page  (if go to next page too fast, handlemetadata is called, but it can't find the video)
      // important point is that 3 happens before 4
      // also video can't be url, has t be videoPreview (actual data))
      //
      setTimeout(() => {
        nextStep();
      }, 2000); // wait for the video to be in the canvas first
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
                  // onChange: (event) => {
                  //   videoPreviewHandler(event);
                  // },
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
                        crossOrigin="anonymous"
                        onLoadedMetadata={() => {
                          setTimeout(() => {
                            handleMetadata();
                            nextStep();
                          }, 1000); // 10 doesn't work
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
