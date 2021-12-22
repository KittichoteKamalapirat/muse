import {
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import Dropzone from "react-dropzone";
import React from "react";
import { InputField } from "./InputField";
import { IconButton, Select } from "@chakra-ui/react";

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
          <Heading fontSize="md">Menu</Heading>
          <InputField name="title" placeholder="ชื่อเมนู" label="" />
          <Heading fontSize="md">Details</Heading>
          <InputField
            textarea={true}
            name="text"
            placeholder="รายละเอียดเกี่ยวกับเมนู"
            label=""
          />
        </Box>
      </Flex>
      <Divider my={2} />
      <Box>
        <Flex alignItems="center">
          <Heading fontSize="md">Cooking time</Heading>

          <Flex justifyContent="left">
            <Box width="4rem" ml={2}>
              <InputField
                name="cooktime"
                variant="flushed"
                // placeholder="เวลาในการทำโดยประมาณ"
                placeholder="30"
                label=""
              />
            </Box>
            <Select placeholder="mins" mt={2} width="6rem">
              {/* <option value="mins">mins</option> */}
              <option value="hrs">hrs</option>
            </Select>
          </Flex>
        </Flex>

        <Divider my={2} />
        <Flex alignItems="center">
          <Heading fontSize="md" whiteSpace="nowrap">
            Portion for
          </Heading>

          <InputGroup size="sm" ml={2}>
            {/* <InputLeftAddon children="ปริมาณสำหรับ" mt={2} /> */}
            <InputField
              name="portion"
              placeholder="2"
              type="number"
              variant="flushed"
            />

            <InputRightAddon children="people" mt={2} />
            {/* <InputRightAddon
              children={parseInt(portion) > 1 ? "people" : "person"}
              mt={2}
            /> */}
          </InputGroup>
        </Flex>
        <Divider my={2} />
        <Box>
          {/* <Heading fontSize="md">ข้อแนะนำ</Heading> */}
          <Heading fontSize="md">Tip/Advice</Heading>
          <InputField
            textarea={true}
            name="advice"
            placeholder="ข้อแนะนำ"
            label=""
          />
        </Box>
      </Box>
      <Divider my={2} />
    </Box>
  );
};
