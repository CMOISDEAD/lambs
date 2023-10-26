import { Button, useColorMode } from "@chakra-ui/react";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <nav className="bg-gray-800">
      New Navbar
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </nav>
  );
};
