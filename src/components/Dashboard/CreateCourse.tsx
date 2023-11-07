import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { createCourse } from "../../api/course";
import useClassStore from "../../store/store";
import { refresh } from "../../utils";

interface Inputs {
  name: string;
  teacher: any;
}

export const CreateCourse = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { user } = useClassStore.getState();
    const response = await createCourse(data, user);
    if (response?.status !== 200) return console.error("Error");
    refresh();
  };

  return (
    <Card>
      <CardHeader>
        <Heading>Create Course</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack marginY={5}>
            <Input
              placeholder="Course Name"
              {...register("name", { required: true })}
            />
          </HStack>
          <Button type="submit" colorScheme="teal" width="full">
            Create
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
