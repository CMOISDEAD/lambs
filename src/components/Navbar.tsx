import { Link } from "react-router-dom";
import { Avatar, Button, Heading, useColorMode } from "@chakra-ui/react";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <nav className="flex justify-between content-center items-center py-2 px-4 w-full">
      <Link to="/">
        <Heading size="md">RN</Heading>
      </Link>
      <div className="inline-flex gap-2 content-center items-center">
        <Avatar
          name="Camilo Davila"
          src="https://bit.ly/dan-abramov"
          size="sm"
        />
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? "🌚" : "🌞"}
        </Button>
      </div>
    </nav>
  );
};
