import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  mt?: string;
}

// export const XWrapper = ({ children, ...props }: Props) => {
//   return (
//     <FullBox {...props}>
//       <Flex>
//         <Box>{children}</Box>
//       </Flex>
//     </FullBox>
//   );
// };

// interface FullBoxProps {
//   mt?: string;
//   color?: string;
// }

// const FullBox = styled.div<FullBoxProps>`
//   width: 100%;
//   margin-top: ${({ mt }) => mt || ""};
//   color: ${({ color }) => color || "black"};
// `;

// const Flex = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Box = styled.div`
//   @media (max-width: 40em) {
//     max-width: 95%;
//   }
//   max-width: 30%;
// `;

// if chakra ui
interface Props {
  children: ReactNode;
}

export const XWrapper = ({ children, ...props }: Props) => {
  return (
    <Box width="100%" {...props}>
      <Flex flexDirection="column" alignItems="center">
        <Box maxWidth={["95%", "30%"]}>{children}</Box>
      </Flex>
    </Box>
  );
};
