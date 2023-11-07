import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

import { getGrade } from "../api/exams";
import useClassStore from "../store/store";

export const Profile = () => {
  const [grades, setGrades] = useState([]);
  const { user } = useClassStore.getState();
  const { course } = user;

  useEffect(() => {
    (async () => {
      const data = await getGrade(Number(user.id));
      setGrades(data);
    })();
  }, []);

  const findGrade = (examId: number) => {
    const filtered = grades.filter((grade: any) => grade.examId === examId)[0];
    if (!filtered) return "Not graded";
    // @ts-ignore
    return filtered?.grade;
  };

  return (
    <Card>
      <CardHeader>
        <Heading onClick={() => console.log(grades)}>Profile</Heading>
      </CardHeader>
      <CardBody>
        <Heading size="lg">{course.name}</Heading>
        <Divider my="5" />
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Td>Code</Td>
                <Td>Exams</Td>
                <Td>Start hour</Td>
                <Td>End hour</Td>
                <Td>Grade</Td>
              </Tr>
            </Thead>
            <Tbody>
              {course.exams.map((exam: any, i: number) => (
                <Tr key={i}>
                  <Td>
                    <Badge colorScheme="teal">{exam.code}</Badge>
                  </Td>
                  <Td>{exam.name}</Td>
                  <Td>{moment(Date.parse(exam.start)).fromNow()}</Td>
                  <Td>{moment(Date.parse(exam.end)).fromNow()}</Td>
                  <Td>{findGrade(exam.id)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
