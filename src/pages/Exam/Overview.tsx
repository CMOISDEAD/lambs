import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Latex from "react-latex-next";
import { useParams } from "react-router-dom";

import { getExam } from "../../api/exams";

interface Exam {
  id: number;
  name: string;
  code: number;
  courseId: number;
  active: boolean;
  teacherId: number;
  questions: any;
  content: string;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
  teacher: any;
  studentsGrades: any[];
}

export const Overview = () => {
  const [exam, setExam] = useState<Exam>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!id) return;
      const response = await getExam(Number(id));
      const { data } = response;
      const parsed = {
        ...data,
        questions: JSON.parse(data.content),
      };
      setExam(parsed);
      console.log(parsed);
    })();
  }, []);

  return (
    <Card>
      <CardHeader>
        <Heading>Exam</Heading>
      </CardHeader>
      <CardBody>
        <HStack justifyContent="space-between" justifyItems="center">
          <Heading size="md">{exam?.name}</Heading>
          <Badge colorScheme="teal">{exam?.code}</Badge>
        </HStack>
        <Divider my="5" />
        <div>
          {exam?.questions.map((question: any, i: number) => (
            <div key={i} className="my-5">
              <Heading size="sm" mb="2">
                <Latex>{question.question}</Latex>
              </Heading>
              {question.type === "multiple" ? (
                <UnorderedList>
                  <div>
                    {question.options.map((option: any, j: number) => (
                      <ListItem
                        key={j}
                        bg={question.answer === option ? "teal" : ""}
                      >
                        <Latex>{option}</Latex>
                      </ListItem>
                    ))}
                  </div>
                </UnorderedList>
              ) : (
                <Textarea
                  placeholder="answer"
                  value={question.answer}
                  isDisabled
                />
              )}
            </div>
          ))}
        </div>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Student ID</Th>
                <Th>First name</Th>
                <Th>Last name</Th>
                <Th>Grade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {exam?.studentsGrades.map((grade: any, i: number) => (
                <Tr key={i}>
                  <Td>{grade.student.id}</Td>
                  <Td>{grade.student.firstname}</Td>
                  <Td>{grade.student.lastname}</Td>
                  <Td>{grade.grade}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
