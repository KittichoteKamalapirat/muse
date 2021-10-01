import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";

import { Input, IconButton, Button } from "@chakra-ui/react";
import React, { useState } from "react";
// import { useCreateIngredientMutation } from "../generated/graphql";
import { useGetPostFromUrl } from "../util/useGetPostFromUrl";
import { Layout } from "./Layout";
import { Wrapper } from "./Wrapper";

// get postId from the url
interface CreateIngredientProps {}

export const CreateIngredient: React.FC<CreateIngredientProps> = ({}) => {
  const { data, loading } = useGetPostFromUrl();

  //   const [, createIngredient] = useCreateIngredientMutation();
  const [inputFields, setInputFields] = useState([
    {
      ingredient: "",
      amount: 0,
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
      amount: 0,
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    inputFields.map(async (inputField) => {
      // recheck this logic
      if (typeof inputField.amount === "string") {
        inputField = { ...inputField };
        inputField.amount = parseInt(inputField.amount as any);
      }
      //   await createIngredient({ postId: data!.post!.id, input: inputField });
    });
  };

  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }

  //   if (!data?.post) {
  //     //finish downloading, cannot finda post( like wrong id)
  //     return (
  //       <Layout>
  //         <div>could not find a post</div>
  //       </Layout>
  //     );
  //   }

  return (
    <Wrapper variant="small">
      <h1>Add ingredient</h1>
      <form onSubmit={() => handleSubmit}>
        {inputFields.map((inputField, index) => (
          <Flex key={index}>
            <Input
              name="ingredient"
              type="text"
              borderColor="grey"
              value={inputField.ingredient}
              onChange={(event) => handleChangeInput(index, event)}
            ></Input>
            <Input
              name="amount"
              type="number"
              borderColor="grey"
              value={inputField.amount}
              onChange={(event) => handleChangeInput(index, event)}
            ></Input>
            <Input
              name="unit"
              type="text"
              borderColor="grey"
              value={inputField.unit}
              onChange={(event) => handleChangeInput(index, event)}
            ></Input>
            <IconButton
              onClick={() => handleAddField(index)}
              aria-label="Search database"
              icon={<AddIcon />}
            />
            <IconButton
              onClick={() => handleRemoveField(index)}
              aria-label="Search database"
              icon={<MinusIcon />}
            />
          </Flex>
        ))}

        <Button onClick={(e) => handleSubmit(e)}>Add Ingredients</Button>
      </form>
    </Wrapper>
  );
};
