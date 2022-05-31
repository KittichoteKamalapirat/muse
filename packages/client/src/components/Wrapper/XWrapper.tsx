import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

// XWRapper adds maxW too all screen and also center them

interface Props {
  children: ReactNode;
  width?: string;
  mt?: string | number;
  mb?: string | number;
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

export const XWrapper = ({
  children,
  width = "100%",
  mt,
  mb,
  ...props
}: Props) => {
  return (
    <Box width="100%" mt={mt} mb={mb} {...props}>
      <Flex flexDirection="column" alignItems="center">
        <Box maxWidth={["95%", "70%", "40%"]} width={width}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
