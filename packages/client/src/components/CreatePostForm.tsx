import { InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import React from "react";
import FormFieldLabel from "./form/FormFieldLabel/FormFieldLabel";
import { InputField } from "./InputField";

interface CreatePostFormProps {}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({}) => {
  return (
    <Box mt={4}>
      <Box>
        <FormFieldLabel label="Menu" required />
        <InputField name="title" placeholder="Menu Name" label="" />
      </Box>

      <Box mt={4}>
        <FormFieldLabel label="Details" />
        <InputField
          textarea={true}
          name="text"
          // placeholder="รายละเอียดเกี่ยวกับเมนู"
          placeholder="Details about the menu"
          label=""
        />
      </Box>

      <Box mt={4}>
        <FormFieldLabel label="Cooking time" />

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
        <FormFieldLabel label="Portion for" />
        <InputGroup>
          <InputField name="portion" placeholder="2" type="number" />

          <InputRightAddon>people</InputRightAddon>
        </InputGroup>
      </Box>

      <Box mt={4}>
        <FormFieldLabel label="Tip/Advice" />
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
