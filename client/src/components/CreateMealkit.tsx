import { Box, Heading } from "@chakra-ui/react";
import { Form } from "formik";
import React, { useState } from "react";
import { InputField } from "./InputField";

interface CreateMealkitProps {}

export const CreateMealkit: React.FC<CreateMealkitProps> = ({}) => {
  const [input, setInput] = useState({
    price: "",
    portion: "",
    items: "",
    images: "",
  });

  return (
    <Box>
      <Form>
        <Heading>Create a meal kit</Heading>
        <InputField
          name="price"
          type="number"
          value={input.price}
          placeholder="price"
          onChange={(e) => setInput({ ...input, price: e.target.value })}
        ></InputField>

        <InputField
          name="portion"
          type="number"
          value={input.portion}
          placeholder="portion"
          onChange={(e) => setInput({ ...input, portion: e.target.value })}
        ></InputField>

        <InputField
          name="items"
          type="text"
          value={input.items}
          placeholder="items"
          onChange={(e) => setInput({ ...input, items: e.target.value })}
        ></InputField>

        <InputField
          name="images"
          type="text"
          value={input.images}
          placeholder="images"
          onChange={(e) => setInput({ ...input, images: e.target.value })}
        ></InputField>
      </Form>
    </Box>
  );
};
