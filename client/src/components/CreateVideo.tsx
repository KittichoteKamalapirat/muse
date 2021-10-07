import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Dropzone from "react-dropzone";
import {
  AddIcon,
  ArrowUpIcon,
  EditIcon,
  MinusIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";

interface CreateVideoProps {
  videoPreview: any;
  handleOnDropVideo: Function;
  videoPreviewHandler: Function;
}

export const CreateVideo: React.FC<CreateVideoProps> = ({
  videoPreview,
  handleOnDropVideo,
  videoPreviewHandler,
}) => {
  return (
    <Box>
      <Dropzone
        onDrop={(acceptedFiles, rejectedFiles) =>
          handleOnDropVideo(acceptedFiles, rejectedFiles)
        }
        // maxSize={1000 * 1}
        multiple={false}
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
                    alignItems="center"
                    border="1px"
                    borderColor="gray.200"
                    bgColor="gray.50"
                  >
                    <ArrowUpIcon mt="3rem" />
                    <Text textAlign="center" mb="2rem">
                      Drag and drop a video here, or click to select the file
                    </Text>
                  </Flex>
                ) : (
                  <Flex justifyContent="center" alignItems="end">
                    <video controls width="50%">
                      <source src={videoPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <EditIcon m={2} />
                  </Flex>
                )}
              </div>
            </Box>
          </Box>
        )}
      </Dropzone>
    </Box>
  );
};
