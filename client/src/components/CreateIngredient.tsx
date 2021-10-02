import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";

import { Input, IconButton, Button } from "@chakra-ui/react";
import React, { useState } from "react";
// import { useCreateIngredientMutation } from "../generated/graphql";
import { useGetPostFromUrl } from "../util/useGetPostFromUrl";
import { Layout } from "./Layout";
import { Wrapper } from "./Wrapper";

// get postId from the url

export const CreateIngredient: React.FC = ({}) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient: "",
      amount: "",
      unit: "",
    },
  ]);

  const handleChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values: any = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddField = (index: any) => {
    const values = [...inputFields];
    values.splice(index + 1, 0, {
      ingredient: "",
      amount: "",
      unit: "",
    });
    setInputFields(values);
  };

  const handleRemoveField = (index: any) => {
    const values = [...inputFields];
    if (values.length > 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  return (
    <Wrapper>
      <h1>Add ingredient</h1>
      <form>
        {inputFields.map((inputField, index) => (
          <Flex key={index}>
            <Input
              name="ingredient"
              type="text"
              m={1}
              borderColor="gray.300"
              value={inputField.ingredient}
              placeholder="วัตถุดิบ"
              onChange={(event) => handleChangeInput(index, event)}
            ></Input>
            <Input
              name="amount"
              type="text"
              m={1}
              borderColor="gray.300"
              value={inputField.amount}
              placeholder="ปริมาณ"
              onChange={(event) => handleChangeInput(index, event)}
            ></Input>
            <Input
              name="unit"
              type="text"
              m={1}
              borderColor="gray.300"
              placeholder="หน่วย"
              value={inputField.unit}
              onChange={(event) => handleChangeInput(index, event)}
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
        ))}
      </form>
    </Wrapper>
  );
};
