import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import useClassStore from "../store/store";

// import instance from "../api/instace";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<Inputs> = async (data: any) => {
    // const response = await instance.post("/user", data);
    console.log(data);
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
          <Heading>Login</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(handleLogin)}>
            <InputGroup gap="4" flexDirection="column" marginY="2">
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
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
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
            </InputGroup>
            <div className="flex gap-4">
              <Button
                type="submit"
                isDisabled={errors.email || errors.password ? true : false}
              >
                Login
              </Button>
              <Button isDisabled>Recover</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
