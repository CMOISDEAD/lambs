import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { RxTrash } from "react-icons/rx";

import useClassStore from "../../store/store";

export const ListCourse = () => {
  const { courses } = useClassStore.getState();

  return (
    <Card>
      <CardHeader>
        <Heading>Courses</Heading>
      </CardHeader>
      <CardBody>
        {courses.map((course, i) => (
          <div key={i}>
            <HStack
              spacing={4}
              justifyContent="space-between"
              justifyItems="center"
            >
              <Heading size="md">{course.name}</Heading>
              <Button colorScheme="red" variant="ghost" size="sm">
                <RxTrash />
              </Button>
            </HStack>
            <Divider my="5" />
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>id </Th>
                    <Th>First name </Th>
                    <Th>Last name </Th>
                    <Th>email</Th>
                    <Th>Created at</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {course.students.map((student: any, i: number) => (
                    <Tr key={i}>
                      <Td>{student.id}</Td>
                      <Td>{student.firstname}</Td>
                      <Td>{student.lastname}</Td>
                      <Td>{student.email}</Td>
                      <Td>{moment(Date.parse(student.createdAt)).fromNow()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
