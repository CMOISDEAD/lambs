import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { createStudent } from "../../api/students";
import useClassStore from "../../store/store";
import { refresh } from "../../utils";

interface Inputs {
  name: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  courseId: string;
}

export const CreateStudent = () => {
  const { courses } = useClassStore.getState();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const filtered = courses.filter((course) => course.id == data.courseId)[0];
    if (!filtered) return console.log("no course found");
    const response = await createStudent(data);
    if (response?.status !== 200) return console.log("Something go wrong");
    console.log("user:", response.data);
    refresh();
  };

  return (
    <Card>
      <CardHeader>
        <Heading>Create Student</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <HStack>
              <Input placeholder="Jhon" {...register("firstname")} />
              <Input placeholder="Doe" {...register("lastname")} />
            </HStack>
            <Input placeholder="jhondoe" {...register("username")} />
            <Input
              type="email"
              placeholder="jhon@gmail.com"
              {...register("email")}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <Select {...register("courseId", { required: true })}>
              {courses.map((course, i) => (
                <option value={course.id} key={i}>
                  {course.name}
                </option>
              ))}
            </Select>
            <Button type="submit" colorScheme="teal" width="full">
              Create
            </Button>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
};
