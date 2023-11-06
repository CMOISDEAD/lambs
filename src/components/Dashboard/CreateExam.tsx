import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { RxPlus } from "react-icons/rx";

import { createExam } from "../../api/exams";
import useClassStore from "../../store/store";
import { generateRoomCode } from "../../utils";
import { CreateInputs } from "./CreateInputs";

interface Inputs {
  name: string;
  code: number | null;
  courseId?: number;
  course: any;
  questions: any[];
  start: string;
  end: string;
  teacher: any;
}

export const CreateExam = () => {
  const { courses } = useClassStore.getState();
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAdd = () => {
    append({ type: "text", question: "" });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { user } = useClassStore.getState();
    const response = await createExam(data, user);
    if (!response || response.error) return;
    const { exams } = response;
    useClassStore.setState({ exams });
  };

  return (
    <Card>
      <CardHeader>
        <Heading>Create Exam</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <HStack spacing={2}>
            <Button onClick={handleAdd} colorScheme="teal">
              <RxPlus />
            </Button>
            <Input
              placeholder="exam name"
              {...register("name", {
                required: true,
              })}
            />
            <Select
              {...register("courseId", { required: true, valueAsNumber: true })}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </Select>
            <Input
              width={60}
              type="datetime-local"
              {...register("start", { required: true, valueAsDate: true })}
            />
            <Input
              width={60}
              type="datetime-local"
              {...register("end", { required: true, valueAsDate: true })}
            />
            <Input
              width={28}
              type="number"
              placeholder="2312"
              {...register("code", {
                value: generateRoomCode(),
              })}
            />
          </HStack>
          <Text as="b" fontSize="xl">
            Number of questions: {fields.length}
          </Text>
          {fields.map((question, i) => (
            <CreateInputs
              key={question.id}
              i={i}
              watch={watch}
              update={setValue}
              remove={remove}
              question={question}
              register={register}
            />
          ))}
          <Button type="submit">Create Exam</Button>
        </form>
      </CardBody>
    </Card>
  );
};
