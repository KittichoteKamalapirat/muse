import { ChevronLeftIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import Dropzone from "react-dropzone";

interface CreateThumbnailProps {
  videoPreview: any;
  thumbnailPreview: any;
  handleOnDropThumbnail: Function;
  thumbnailPreviewHandler: Function;
  prevStep: Function;
  nextStep: Function;
  autoThumbnailUrl: string;
}

export const CreateThumbnail: React.FC<CreateThumbnailProps> = ({
  videoPreview,
  thumbnailPreview,
  handleOnDropThumbnail,
  thumbnailPreviewHandler,
  prevStep,
  nextStep,
  autoThumbnailUrl,
}) => {
  console.log({ autoThumbnailUrl });
  if (videoPreview) {
    // console.log(videoPreview);
    // const objectURL = URL.createObjectURL(videoPreview);
    // console.log(objectURL);/
  }

  return (
    <Box>
      {!thumbnailPreview ? (
        !videoPreview ? null : (
          <Flex justifyContent="center">
            <Image src={autoThumbnailUrl} alt="auto-thumbnail-url" />
          </Flex>
        )
      ) : (
        <Flex justifyContent="center">
          {/* <AspectRatio ratio={1}> */}
          <Image
            src={thumbnailPreview}
            alt="image"
            boxSize="90%"
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
              <Box
                {...getRootProps({
                  onChange: (e) => thumbnailPreviewHandler(e),
                })}
              >
                <input {...getInputProps()} />

                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  border={!thumbnailPreview ? "1px" : undefined}
                  borderColor="gray.400"
                  borderStyle="dashed"
                >
                  {!thumbnailPreview ? (
                    <PlusSquareIcon mr={2} />
                  ) : (
                    <Image
                      border="1px"
                      borderColor="black"
                      mr={2}
                      borderRadius="20%"
                      src={thumbnailPreview}
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
