import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import { register as registerUser } from "../api/auth";
import useClassStore from "../store/store";

type Inputs = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  course: any;
};

export const Register = () => {
  const [type, setType] = useState("teacher"); // ["teacher", "student"]
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<Inputs> = async (user: any) => {
    user.type = type;
    const response = await registerUser(user);
    if (response?.status !== 200) return;
    const { data } = response;
    useClassStore.setState({
      user: {
        isAuth: true,
        ...data,
      },
    });
    navigate("/");
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="flex gap-4 justify-center content-center items-center h-screen">
      <Card className="w-1/3" variant="outline">
        <CardHeader>
          <ChakraLink as={ReactRouterLink} to="/">
            Go Back
          </ChakraLink>
          <Heading>Register</Heading>
        </CardHeader>
        <CardBody>
          <HStack spacing={4} width="full">
            <Button
              colorScheme="teal"
              variant={type === "teacher" ? "solid" : "outline"}
              className="w-1/2"
              onClick={() => setType("teacher")}
            >
              Teacher
            </Button>
            <Button
              colorScheme="teal"
              variant={type === "student" ? "solid" : "outline"}
              className="w-1/2"
              onClick={() => setType("student")}
            >
              Student
            </Button>
          </HStack>
          <form onSubmit={handleSubmit(handleLogin)}>
            <InputGroup gap="4" flexDirection="column" marginY="2">
              <HStack>
                <Input
                  placeholder="Jhon"
                  {...register("firstname", { required: true })}
                />
                <Input
                  placeholder="Doe"
                  {...register("lastname", { required: true })}
                />
              </HStack>
              <Input
                placeholder="username"
                {...register("username", { required: true })}
              />

              <Input
                type="email"
                placeholder="email@ibm.com"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                isInvalid={errors.email ? true : false}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  placeholder="Enter password"
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                  })}
                  isInvalid={errors.password ? true : false}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {type === "student" && (
                <Select>
                  <option value="9-a">9A</option>
                </Select>
              )}
            </InputGroup>
            <div className="flex gap-4">
              <Button
                type="submit"
                className="w-full"
                isDisabled={errors.email || errors.password ? true : false}
              >
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
