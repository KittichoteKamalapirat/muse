import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import "../components/App.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  // for some reasons, can't log anything here if want to start in the process
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

// export default MyApp;
export default MyApp;
