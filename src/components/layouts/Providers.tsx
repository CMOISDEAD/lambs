import { ReactNode } from "react";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
};
