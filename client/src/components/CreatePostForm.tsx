import {
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Dropzone from "react-dropzone";
import React from "react";
import { InputField } from "./InputField";
import { IconButton } from "@chakra-ui/react";

interface CreatePostFormProps {
  videoPreview: string;
  thumbnailPreview: string;
  nextStep: Function;
  prevstep: Function;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  videoPreview,
  thumbnailPreview,
  nextStep,
  prevstep,
}) => {
  return (
    <Box mt={4}>
      {/* {!videoPreview ? null : (
        <Box>
          <video controls width="50%">
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      )} */}
      <Flex justifyContent="center">
        {!thumbnailPreview ? null : (
          <Box flex={1} m={1}>
            <Image
              src={thumbnailPreview}
              alt="image"
              fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
            />
          </Box>
        )}

        <Box flex={2}>
          {" "}
          <InputField name="title" placeholder="ชื่อเมนู" label="" />
          <InputField
            textarea={true}
            name="text"
            placeholder="รายละเอียดเกี่ยวกับเมนู"
            label=""
          />
        </Box>
      </Flex>

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
    </Box>
  );
};
