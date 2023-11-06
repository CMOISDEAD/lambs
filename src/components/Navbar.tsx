import {
  Avatar,
  Button,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { RxArchive, RxMoon, RxSun } from "react-icons/rx";
import { Link } from "react-router-dom";

import useClassStore from "../store/store";

export const Navbar = () => {
  const { user } = useClassStore();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav className="flex justify-between content-center items-center py-2 px-4 w-full">
      <Link to="/">
        <Heading size="md" className="flex gap-2 content-center items-center">
          <RxArchive /> RN
        </Heading>
      </Link>
      <div className="inline-flex gap-2 content-center items-center">
        {user.role !== "teacher" && (
          <Link to="dashboard">
            <Button colorScheme="teal" variant="ghost">
              Dashboard
            </Button>
          </Link>
        )}
        {!user.isAuth ? (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        ) : (
          <Popover variant="outline">
            <PopoverTrigger>
              <Avatar
                src=""
                size="sm"
                name={`${user.firstname} ${user.lastname}`}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Stack>
                  <Text fontSize="sm">{`${user.firstname} ${user.lastname}`}</Text>
                  <Text
                    fontSize="sm"
                    color="teal"
                    className="underline"
                  >{`${user.email}`}</Text>
                </Stack>
              </PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Link to="/">
                    <Button isDisabled width="full">
                      Profile
                    </Button>
                  </Link>
                  <Link to="/logout">
                    <Button width="full">Logout</Button>
                  </Link>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? <RxMoon /> : <RxSun />}
        </Button>
      </div>
    </nav>
  );
};
