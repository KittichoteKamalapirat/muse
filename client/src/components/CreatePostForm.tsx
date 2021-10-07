import { ArrowUpIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Dropzone from "react-dropzone";
import React from "react";
import { InputField } from "./InputField";

interface CreatePostFormProps {
  videoPreview: any;
  thumbnailPreview: any;
  handleOnDropThumbnail: Function;
  thumbnailPreviewHandler: Function;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  videoPreview,
  thumbnailPreview,
  handleOnDropThumbnail,
  thumbnailPreviewHandler,
}) => {
  return (
    <Box mt={4}>
      <InputField name="title" placeholder="ชื่อเมนู" label="" />
      <InputField
        textarea={true}
        name="text"
        placeholder="รายละเอียดเกี่ยวกับเมนู"
        label=""
      />

      <InputField name="cooktime" placeholder="เวลาในการทำโดยประมาณ" label="" />

      <InputGroup size="sm">
        <InputLeftAddon children="ปริมาณสำหรับ" mt={2} />
        <InputField name="portion" placeholder="2" type="number" />
        <InputRightAddon children="คน" mt={2} />
      </InputGroup>

      <InputField
        textarea={true}
        name="advice"
        placeholder="ข้อแนะนำ"
        label=""
      />
      <Dropzone
        onDrop={(acceptedFiles: any, rejectedFiles: any) =>
          handleOnDropThumbnail(acceptedFiles, rejectedFiles)
        }
        // maxSize={1000 * 1}
        multiple={false}
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

                {!videoPreview ? null : !thumbnailPreview ? (
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
              </div>
            </Box>
          </Box>
        )}
      </Dropzone>
    </Box>
  );
};
