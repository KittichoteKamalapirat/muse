// import { Box, Divider, Flex } from "@chakra-ui/react";
// import React, { useEffect } from "react";
// import { useIngredientsQuery } from "../generated/graphql";
// import { Layout } from "./Layout";
// import { Wrapper } from "./Wrapper";

// interface IngredientListProps {
//   postId: number;
// }

// export const IngredientList: React.FC<IngredientListProps> = ({ postId }) => {
//   // ingredient
//   const [{ data, error, fetching }] = useIngredientsQuery({
//     pause: postId === -1, //-1 won't by an id of any posts, just indication that we got bad url parameter
//     variables: {
//       postId: postId,
//     },
//   });

//   if (fetching) {
//     return (
//       <Layout>
//         <div>loading ingredient...</div>
//       </Layout>
//     );
//   }

//   return (
//     <Wrapper>
//       <h1>Ingredient List</h1>
//       {data?.ingredients.length}

//       {data?.ingredients.map((ingredient) => (
//         <Box>
//           <Flex justifyContent="space-between">
//             <div>{ingredient.ingredient}</div>
//             <div>
//               {ingredient.amount} {ingredient.unit}
//             </div>
//           </Flex>
//           <Divider />
//         </Box>
//       ))}
//     </Wrapper>
//   );
// };
