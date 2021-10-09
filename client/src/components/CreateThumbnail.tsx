import {
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import React from "react";
import router from "next/router";

interface CreateThumbnailProps {
  videoPreview: any;
  thumbnailPreview: any;
  handleOnDropThumbnail: Function;
  thumbnailPreviewHandler: Function;
  prevStep: Function;
  nextStep: Function;
}

export const CreateThumbnail: React.FC<CreateThumbnailProps> = ({
  videoPreview,
  thumbnailPreview,
  handleOnDropThumbnail,
  thumbnailPreviewHandler,
  prevStep,
  nextStep,
}) => {
  return (
    <Box>
      {!thumbnailPreview ? (
        !videoPreview ? null : (
          <Flex justifyContent="center">
            <video width="50%">
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Flex>
        )
      ) : (
        <Flex justifyContent="center">
          {/* <AspectRatio ratio={1}> */}
          <Image
            src={thumbnailPreview}
            alt="image"
            boxSize="50%"
            fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
          />
          {/* </AspectRatio> */}
        </Flex>
      )}
      <Dropzone
        onDrop={(acceptedFiles: any, rejectedFiles: any) =>
          handleOnDropThumbnail(acceptedFiles, rejectedFiles)
        }
        // maxSize={1000 * 1}
        multiple={true}
        // accept="video/mp4"
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
              <div
                {...getRootProps({
                  onChange: (e) => thumbnailPreviewHandler(e),
                })}
              >
                <input {...getInputProps()} />

                <Flex
                  direction="column"
                  alignItems="center"
                  border="1px"
                  borderColor="gray.200"
                  bgColor="gray.50"
                >
                  <ArrowUpIcon mt="3rem" />
                  <Text textAlign="center" mb="2rem">
                    ลากไฟล์รูปภาพมาวาง หรือ คลิกเพื่อเลือกไฟล์
                  </Text>
                </Flex>
              </div>
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
          variant="none"
        />
        <IconButton
          aria-label="Search database"
          icon={<ChevronRightIcon />}
          onClick={() => nextStep()}
          fontSize="x-large"
          color="dark.200"
          variant="none"
        />
      </Flex>
    </Box>
  );
};
