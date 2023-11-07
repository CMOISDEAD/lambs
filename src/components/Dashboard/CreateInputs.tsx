import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { RxTrash } from "react-icons/rx";

export const CreateInputs = ({ register, remove, update, watch, i }: any) => {
  const [options, setOptions] = useState<string[]>([]);
  const watchType = watch(`questions.${i}.type`);

  const handleRemove = () => remove(i);

  return (
    <FormControl key={i}>
      <HStack spacing={2} justifyContent="space-between" className="mb-2">
        <Text as="b">Question {i + 1}</Text>
        <Button
          onClick={handleRemove}
          colorScheme="red"
          variant="ghost"
          size="sm"
        >
          <RxTrash />
          Remove
        </Button>
      </HStack>
      <HStack spacing={2}>
        <Select width={40} {...register(`questions.${i}.type`)}>
          <option value="text">Text</option>
          <option value="multiple">Multiple</option>
        </Select>
        <Input
          placeholder="question"
          {...register(`questions.${i}.question`)}
        />
        <FormControl
          display="flex"
          alignItems="center"
          width={"72"}
          onChange={(e: any) => update(`questions.${i}.math`, e.target.checked)}
        >
          <FormLabel htmlFor="math-mode" mb="0">
            Enable Math Mode ?
          </FormLabel>
          <Switch id="math-mode" />
        </FormControl>
      </HStack>
      {watchType === "multiple" ? (
        <Stack direction="column" spacing={2}>
          <Input
            className="mt-3"
            placeholder="option 1, option 2, ..."
            onChange={(e) => {
              let data = e.target.value
                .split(",")
                .map((x) => x.trim())
                .filter((x) => x !== "");
              setOptions(data);
              update(`questions.${i}.options`, options);
            }}
          />
          {options.length && (
            <RadioGroup
              name="answer"
              onChange={(value: string) =>
                update(`questions.${i}.answer`, value)
              }
            >
              <Stack direction="row">
                {options.map((option, idx) => (
                  <Radio value={option} key={idx}>
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
        </Stack>
      ) : (
        <Textarea
          placeholder="Here will be the answer"
          className="mt-3"
          resize="none"
          {...register(`questions.${i}.answer`)}
        />
      )}
    </FormControl>
  );
};
