import { InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import React from "react";
import { InputField } from "./InputField";

interface CreatePostFormProps {}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({}) => {
  return (
    <Box mt={4}>
      <Box>
        <Heading fontSize="md">Menu</Heading>
        <InputField name="title" placeholder="Menu Name" label="" />
      </Box>

      <Box mt={4}>
        <Heading fontSize="md">Details</Heading>
        <InputField
          textarea={true}
          name="text"
          // placeholder="รายละเอียดเกี่ยวกับเมนู"
          placeholder="Details about the menu"
          label=""
        />
      </Box>

      <Box mt={4}>
        <Heading fontSize="md">Cooking time</Heading>

        <Flex justifyContent="left">
          <Box mr={2}>
            <InputField
              name="cooktime"
              // placeholder="เวลาในการทำโดยประมาณ"
              placeholder="30"
              label=""
            />
          </Box>

          <Select placeholder="mins" width="6rem" variant="outline">
            {/* <option value="mins">mins</option> */}
            <option value="hrs">hrs</option>
          </Select>
        </Flex>
      </Box>

      <Box mt={4}>
        <Heading fontSize="md" whiteSpace="nowrap">
          Portion for
        </Heading>
        <InputGroup>
          <InputField name="portion" placeholder="2" type="number" />

          <InputRightAddon>people</InputRightAddon>
        </InputGroup>
      </Box>

      <Box mt={4}>
        <Heading fontSize="md">Tip/Advice</Heading>
        <InputField
          textarea={true}
          name="advice"
          // placeholder="ข้อแนะนำ"
          placeholder="Add advice here"
          label=""
        />
      </Box>
    </Box>
  );
};
