import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Ingredient } from "../generated/graphql";
import { Layout } from "./Layout/Layout";
import { Wrapper } from "./Wrapper";

interface IngredientListProps {
  ingredients: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  // ingredient
  return (
    <Box>
      {ingredients.map((ingredient, index) => (
        <Box key={index}>
          <Flex justifyContent="space-between">
            <div>{ingredient.ingredient}</div>
            <div>
              {ingredient.amount} {ingredient.unit}
            </div>
          </Flex>
          <Divider variant="dashed" />
        </Box>
      ))}
    </Box>
  );
};

export default IngredientList;
