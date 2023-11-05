import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { RxPlus } from "react-icons/rx";

import useClassStore from "../../store/store";
import { generateRoomCode } from "../../utils";
import { CreateInputs } from "./CreateInputs";

interface Inputs {
  name: string;
  code: number | null;
  questions: any[];
}

export const CreateExam = () => {
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    useClassStore.setState({
      exams: [...useClassStore.getState().exams, data],
    });
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
            <Input
              width={20}
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
