import { IconButton } from "@chakra-ui/button";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { Form } from "formik";
import React from "react";
import { IngredientInput } from "../generated/graphql";

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
  return (
    <Box>
      <Form>
        <Heading fontSize="lg">Ingredient need</Heading>

        <Flex justifyContent="space-between">
          <Text
            flex={1}
            m={1}
            color="gray.800"
            fontSize="sm"
            textAlign="center"
          >
            Ingredient
          </Text>
          <Text
            flex={1}
            m={1}
            color="gray.800"
            fontSize="sm"
            textAlign="center"
          >
            Amount
          </Text>
          <Text
            flex={1}
            m={1}
            color="gray.800"
            fontSize="sm"
            textAlign="center"
          >
            Unit
          </Text>
          <Text flex={1}></Text>
          <Text flex={1}></Text>
        </Flex>
        {ingredientsField.map((inputField, index) => (
          <Box key={index}>
            <Flex>
              <Input
                name="ingredient"
                type="text"
                m={1}
                borderColor="gray.300"
                value={inputField.ingredient}
                placeholder="วัตถุดิบ"
                onChange={(event) => handleChangeInput(index, event)}
                variant="flushed"
              ></Input>
              <Input
                name="amount"
                type="number"
                m={1}
                borderColor="gray.300"
                value={inputField.amount}
                placeholder="ปริมาณ"
                onChange={(event) => handleChangeInput(index, event)}
                variant="flushed"
              ></Input>
              <Input
                name="unit"
                type="text"
                m={1}
                borderColor="gray.300"
                placeholder="หน่วย"
                value={inputField.unit}
                onChange={(event) => handleChangeInput(index, event)}
                variant="flushed"
              ></Input>
              <IconButton
                onClick={() => handleAddField(index)}
                aria-label="Add ingredient"
                bgColor="white"
                icon={<AddIcon width={3} />}
              />
              <IconButton
                onClick={() => handleRemoveField(index)}
                aria-label="Remove ingredient"
                bgColor="white"
                icon={<MinusIcon width={3} />}
              />
            </Flex>
            <Divider variant="dashed" />
          </Box>
        ))}
      </Form>
      <Divider my={2} />
      <Form>
        <Heading fontSize="md">ขั้นตอน</Heading>
        {instructionField.map((inputField, index) => (
          <Flex key={index} m={1} alignItems="center">
            <Text mr={2}>{index + 1}. </Text>
            <Input
              name="instruction"
              type="textarea"
              borderColor="gray.300"
              value={inputField}
              placeholder="โปรดกรอกขั้นตอนการทำตรงนี้"
              onChange={(event) => handleInstructionChangeInput(index, event)}
              variant="flushed"
            ></Input>

            <IconButton
              onClick={() => handleAddInstructionField(index)}
              aria-label="เพิ่มขั้นตอน"
              bgColor="white"
              icon={<AddIcon width={3} />}
            />
            <IconButton
              onClick={() => handleRemoveInstructionField(index)}
              aria-label="ลดขั้นตอน"
              bgColor="white"
              icon={<MinusIcon width={3} />}
            />
          </Flex>
        ))}
      </Form>
    </Box>
  );
};
