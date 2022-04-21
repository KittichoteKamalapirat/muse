import { Image } from "@chakra-ui/image";
import { InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import React from "react";
import { InputField } from "./InputField";

interface CreatePostFormProps {
  nextStep: Function;
  prevstep: Function;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  nextStep,
  prevstep,
}) => {
  return (
    <Box mt={4}>
      <Flex justifyContent="center">
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
            <InputField
              name="portion"
              placeholder="2"
              type="number"
              variant="flushed"
            />

            <InputRightAddon mt={2}>people</InputRightAddon>
          </InputGroup>
        </Flex>
        <Divider my={2} />
        <Box>
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
