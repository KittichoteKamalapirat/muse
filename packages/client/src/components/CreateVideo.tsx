import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { urlResolver } from "../lib/UrlResolver";
import { FileInput } from "../types/utils/FileInput";
import { FileMetadata } from "../types/utils/FileMetadata";
import { ResourceType } from "../types/utils/ResourceType";
import getRESTOptions from "../util/getRESTOptions";
import FormActionButtons from "./form/FormActionButtons/FormActionButtons";
import formatFilename from "./formatFilename";
import { UploadVideoIcon } from "./Icons/UploadVideoIcon";
import { Loading } from "./skeletons/Loading";

interface CreateVideoProps {
  nextStep: () => void;
  handleMetadata: Function;
  videoS3UrlAndID: FileMetadata | null;
  setVideoS3UrlAndID: React.Dispatch<React.SetStateAction<FileMetadata | null>>;
  isGeneratingThumbnail: boolean;
  autoThumbnailS3UrlAndId: FileMetadata | null;
}

export const CreateVideo: React.FC<CreateVideoProps> = ({
  nextStep,
  handleMetadata,
  videoS3UrlAndID,
  setVideoS3UrlAndID,
  isGeneratingThumbnail,
  autoThumbnailS3UrlAndId,
}) => {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState({ file: null } as any); // is what uploaded to s3
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleOnDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    setIsUploading(true);
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setVideoFile({ file: acceptedFiles[0] });
  };

  useEffect(() => {
    if (videoFile.file) {
      const input: FileInput = {
        name: formatFilename(videoFile.file.name),
        fileType: videoFile.file.type,
        resourceType: ResourceType.POST,
      };

      // sign with by my api
      axios.post(urlResolver.signS3(), input).then((response) => {
        const options = getRESTOptions(videoFile.file.type);

        // save to s3
        axios.put(response.data.sign, videoFile.file, options).then(() => {
          setVideoS3UrlAndID({ url: response.data.url, id: response.data.id });
          setIsUploading(false);
        });
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
  }, [videoFile.file, setVideoS3UrlAndID]);

  return (
    <Box>
      {isUploading && <Loading text="uploading video" />}
      {!isUploading && (
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles) =>
            handleOnDropVideo(acceptedFiles, rejectedFiles)
          }
          aria-label="uploadPostVideo"
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
                    <Box width="100%">
                      <video
                        controls
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
      )}

      {/* hide if no s3 or is creating auto thumbnail */}
      {videoS3UrlAndID &&
        autoThumbnailS3UrlAndId &&
        !isGeneratingThumbnail &&
        !isUploading && (
          <FormActionButtons
            primaryText="Next"
            primaryAriaLabel="Go to create thumbnail tab"
            onPrimaryClick={nextStep}
            secondaryText="Back"
            onSecondaryClick={() => router.back()}
          />
        )}
      {/* if <Loading/>  -> too much padding */}
      {/* todo create reusable component */}
      {isGeneratingThumbnail && (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="brand"
            size="xl"
          />
          <Text color="brand" fontWeight="bold" textAlign="center">
            Generating thumbnail...
          </Text>
        </Flex>
      )}
    </Box>
  );
};
