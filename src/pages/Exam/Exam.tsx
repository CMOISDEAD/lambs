import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Latex from "react-latex-next";
import { useNavigate, useParams } from "react-router-dom";

import { gradeExam } from "../../api/exams";
import useClassStore from "../../store/store";
import { refresh } from "../../utils";

export const Exam = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { exams, user } = useClassStore();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [examId, setExamId] = useState<number>();
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = exams.filter((exam: any) => exam.code == code)[0];
    const isCourse = user.courseId === filtered.courseId;
    if (!filtered || !isCourse) return navigate("/");
    setQuestions(filtered.questions);
    setExamId(filtered.id);
  }, [code]);

  const updateAnswers = (
    opts: any,
    value: string,
    answer: any,
    idx: number,
  ) => {
    // FIX: points doesn't decrease when changing answer
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
    if (opts === undefined) return;
    const filtered = opts.filter((opt: any) => opt === value)[0];
    if (filtered === answer) setPoints(points + 1);
  };

  const handleComplete = async () => {
    const data = {
      examId,
      userId: user.id,
      grade: points,
    };
    await gradeExam(data);
    refresh();
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    navigate("/");
  }

  return (
    <div className="flex justify-center content-center items-center">
      <Card variant="outline" width="5xl" height="xl">
        <CardHeader>
          <Badge colorScheme="purple" variant="solid" size="lg">
            # {code}
          </Badge>
          <Progress value={tabIndex} min={0} max={questions.length} />
        </CardHeader>
        <CardBody>
          <Tabs variant="enclosed" index={tabIndex} onChange={setTabIndex}>
            <TabList>
              {questions.map((_, i) => (
                <Tab
                  key={i}
                  isDisabled={i === 0 ? false : answers[i - 1] ? false : true}
                >
                  {i + 1}
                </Tab>
              ))}
              <Tab isDisabled={answers[questions.length - 1] ? false : true}>
                Complete
              </Tab>
            </TabList>
            <TabPanels>
              {questions.map(({ question, answer, options, type, math }, i) => (
                <TabPanel key={i}>
                  <div className="flex flex-col gap-4 my-5">
                    <Heading size="xl">Question {i + 1}</Heading>
                    {math ? (
                      <Latex>{question}</Latex>
                    ) : (
                      <Text fontSize="xl">{question}</Text>
                    )}
                  </div>
                  <Divider />
                  <form className="my-5">
                    {type === "multiple" ? (
                      <RadioGroup
                        onChange={(value) => {
                          updateAnswers(questions[i].options, value, answer, i);
                        }}
                        value={answers[i]}
                      >
                        <Stack gap={10}>
                          {options &&
                            options.map((opt: any, idx: number) => (
                              <Radio value={opt} key={idx}>
                                <Latex>{opt}</Latex>
                              </Radio>
                            ))}
                        </Stack>
                      </RadioGroup>
                    ) : (
                      <Stack spacing={4}>
                        <Textarea
                          placeholder="Your answer here..."
                          value={answers[i]}
                          onChange={(e) =>
                            updateAnswers(
                              questions[i]?.options,
                              e.target.value,
                              answer,
                              i,
                            )
                          }
                        />
                        {math && (
                          <Latex>{answers[i] || "Your answer here..."}</Latex>
                        )}
                      </Stack>
                    )}
                  </form>
                </TabPanel>
              ))}
              <TabPanel>
                <div className="flex flex-col gap-4 my-5">
                  <Heading size="xl">Complete</Heading>
                  <Text fontSize="xl">
                    Are you sure you want to complete the exam?
                  </Text>
                  <Button
                    onClick={handleComplete}
                    variant="solid"
                    colorScheme="green"
                  >
                    Complete, Submit and Exit...
                  </Button>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} variant="" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Punctuation is...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <Text fontSize="9xl" textAlign="center" color="teal" className="font-bold">
            {points} / {questions.length}
          </Text>
          <Text fontSize="lg" textAlign="center" color="teal">
            {Math.round((points / questions.length) * 100)} % of the exam
          </Text>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCloseModal} width="full">
              Close and Exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
