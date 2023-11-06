import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RxTrash } from "react-icons/rx";

import useClassStore from "../../store/store";

export const ListExams = () => {
  const { exams } = useClassStore((state) => state);

  return (
    <Card>
      <CardHeader>
        <Heading>List of Exams</Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Code </Th>
                <Th>Name </Th>
                <Th>Course </Th>
                <Th isNumeric># questions</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {exams.map((exam, i) => (
                <Tr key={i}>
                  <Td>
                    <Badge colorScheme="green">{exam.code}</Badge>
                  </Td>
                  <Td>{exam.name}</Td>
                  <Td>{exam.course?.name}</Td>
                  <Td isNumeric>{exam.questions?.length}</Td>
                  <Td isNumeric>
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => {
                        useClassStore.setState({
                          exams: exams.filter((_, index) => index !== i),
                        });
                      }}
                    >
                      <RxTrash />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
