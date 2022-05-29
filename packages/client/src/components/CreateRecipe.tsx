import { IconButton } from "@chakra-ui/button";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { Form } from "formik";
import React from "react";
import { IngredientInput } from "../generated/graphql";
import FormFieldLabel from "./form/FormFieldLabel/FormFieldLabel";

import unitOptions from "../../constants/unitOptions";
import { SelectOption } from "../types/utils/SelectOption";
import SelectField from "./form/SelectField";
import { useBreakpointValue } from "@chakra-ui/react";

interface CreateRecipeProps {
  ingredientsField: IngredientInput[];
  instructionField: string[];
  handleChangeInput: Function;
  handleAddField: Function;
  handleRemoveField: Function;
  handleInstructionChangeInput: Function;
  handleAddInstructionField: Function;
  handleRemoveInstructionField: Function;
}

export const CreateRecipe: React.FC<CreateRecipeProps> = ({
  ingredientsField,
  instructionField,
  handleChangeInput,
  handleAddField,
  handleRemoveField,
  handleInstructionChangeInput,
  handleAddInstructionField,
  handleRemoveInstructionField,
}) => {
  console.log(ingredientsField);
  const buttonSizes = useBreakpointValue(["xs", "md"]);
  return (
    <Box mt={4}>
      <Form>
        <FormFieldLabel label="Ingredients" required />

        <Flex justifyContent="space-between">
          <Text
            flex={2}
            m={1}
            color="gray.800"
            fontSize="sm"
            textAlign="center"
          >
            Ingredient
          </Text>

          <Text
            flex={2}
            m={1}
            color="gray.800"
            fontSize="sm"
            textAlign="center"
          >
            Unit
          </Text>
          <Text
            flex={2}
            m={1}
            color="gray.800"
            fontSize="sm"
            textAlign="center"
          >
            Amount
          </Text>
          <Text flex={1}></Text>
          <Text flex={1}></Text>
        </Flex>
        {ingredientsField.map((inputField, index) => (
          <Box key={index}>
            <Flex alignItems="center">
              <Text mr={2}>{index + 1}. </Text>
              <Input
                name="ingredient"
                type="text"
                m={1}
                borderColor="gray.300"
                value={inputField.ingredient}
                // placeholder="วัตถุดิบ"
                placeholder="ex. tomato, salt"
                onChange={(event) => handleChangeInput(index, event)}
                flex={1}
                pl={1}
              />

              <Box flex={1}>
                <SelectField
                  options={unitOptions(inputField.ingredient)}
                  name="unit"
                  placeholder="ex. gram, milliliter xxxxxxx"
                  onChange={(option, action) => {
                    // first argument -> label and value object, second argument has name
                    // TODO this might break due to react select type mistake
                    const target = {
                      name: action.name,
                      value: (option as unknown as SelectOption).value,
                    };
                    const event = { target };
                    // so handleChangeInput can read event.target.name and event.target.value
                    handleChangeInput(index, event);
                  }}
                />
              </Box>

              {/* <Input
                name="unit"
                type="text"
                m={1}
                borderColor="gray.300"
                // placeholder="หน่วย"
                placeholder="unit"
                value={inputField.unit}
                onChange={(event) => handleChangeInput(index, event)}
              /> */}
              <Input
                name="amount"
                type="number"
                m={1}
                borderColor="gray.300"
                value={inputField.amount}
                // placeholder="ปริมาณ"
                placeholder="ex. 20, 0.5"
                onChange={(event) => handleChangeInput(index, event)}
                disabled={inputField.unit === "eyeball"}
                flex={1}
                pl={1}
              />

              <IconButton
                onClick={() => handleAddField(index)}
                aria-label="Add ingredient"
                bgColor="white"
                size={buttonSizes}
                // size="sm"
                icon={<AddIcon width={3} color="gray.600" />}
              />
              <IconButton
                onClick={() => handleRemoveField(index)}
                aria-label="Remove ingredient"
                bgColor="white"
                size={buttonSizes}
                // size="sm"
                icon={<MinusIcon width={3} color="gray.600" />}
              />
            </Flex>
          </Box>
        ))}
      </Form>
      <Divider my={2} />
      <Form>
        <FormFieldLabel label="Instruction" />
        {/* <Heading fontSize="md">ขั้นตอน</Heading> */}
        {instructionField.map((inputField, index) => (
          <Flex key={index} m={1} alignItems="center">
            <Text mr={2}>{index + 1}. </Text>
            <Input
              name="instruction"
              type="textarea"
              borderColor="gray.300"
              value={inputField}
              placeholder="Add the instruction here"
              // placeholder="โปรดกรอกขั้นตอนการทำตรงนี้"
              onChange={(event) => handleInstructionChangeInput(index, event)}
            />

            <IconButton
              onClick={() => handleAddInstructionField(index)}
              aria-label="addInstruction"
              bgColor="white"
              size={buttonSizes}
              icon={<AddIcon width={3} color="gray.600" />}
            />
            <IconButton
              onClick={() => handleRemoveInstructionField(index)}
              aria-label="removeInstruction"
              bgColor="white"
              size={buttonSizes}
              icon={<MinusIcon width={3} color="gray.600" />}
            />
          </Flex>
        ))}
      </Form>
    </Box>
  );
};
