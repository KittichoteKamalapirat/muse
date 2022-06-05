import { InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import { PostDetailsFormNames } from "../pages/create-post";
import { CooktimeUnitEnum } from "../types/utils/CooktimeUnitEnum";
import FormFieldLabel from "./form/FormFieldLabel";
import { InputField } from "./InputField";

interface CreatePostFormProps {}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({}) => {
  return (
    <Box mt={4}>
      <Box>
        <FormFieldLabel label="Menu" required />
        <InputField
          name={PostDetailsFormNames.TITLE}
          placeholder="Menu Name"
          label=""
        />
      </Box>

      <Box mt={4}>
        <FormFieldLabel label="Details" />
        <InputField
          textarea={true}
          name={PostDetailsFormNames.TEXT}
          // placeholder="รายละเอียดเกี่ยวกับเมนู"
          placeholder="Details about the menu"
          label=""
        />
      </Box>

      <Box mt={4}>
        <FormFieldLabel label="Cooking time" />

        <Flex justifyContent="left" gap={2}>
          <Box>
            <InputField
              name={PostDetailsFormNames.COOKTIME_LENGTH}
              // placeholder="เวลาในการทำโดยประมาณ"
              placeholder="30"
              label=""
              type="number"
            />
          </Box>

          <Field
            as="select"
            name={PostDetailsFormNames.COOKTIME_UNIT}
            component={Select}
            // placeholder={CooktimeUnitEnum.MINUTES}
            width="6rem"
            variant="outline"
          >
            <option value={CooktimeUnitEnum.MINUTES}>mins</option>
            <option value={CooktimeUnitEnum.HOURS}>hrs</option>
          </Field>
        </Flex>
      </Box>

      <Box mt={4}>
        <FormFieldLabel label="Portion for" />
        <InputGroup>
          <InputField
            name={PostDetailsFormNames.PORTION}
            placeholder="2"
            type="number"
          />

          <InputRightAddon>people</InputRightAddon>
        </InputGroup>
      </Box>

      <Box mt={4}>
        <FormFieldLabel label="Tip/Advice" />
        <InputField
          textarea={true}
          name={PostDetailsFormNames.ADVICE}
          // placeholder="ข้อแนะนำ"
          placeholder="Add advice here"
          label=""
        />
      </Box>
    </Box>
  );
};
