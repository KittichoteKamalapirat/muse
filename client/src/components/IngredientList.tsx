import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Ingredient } from "../generated/graphql";
import { Layout } from "./Layout";
import { Wrapper } from "./Wrapper";

interface IngredientListProps {
  ingredients: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  // ingredient
  return (
    <Wrapper>
      <h1>Ingredient List</h1>

      {ingredients.map((ingredient) => (
        <Box>
          <Flex key={ingredient.ingredient} justifyContent="space-between">
            <div>{ingredient.ingredient}</div>
            <div>
              {ingredient.amount} {ingredient.unit}
            </div>
          </Flex>
          <Divider />
        </Box>
      ))}
    </Wrapper>
  );
};

export default IngredientList;
