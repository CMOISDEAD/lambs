import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const StudentsTable = () => {
  return (
    <Card>
      <CardHeader>
        <Heading>Students</Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Course </Th>
                <Th>Name </Th>
                <Th>Exam </Th>
                <Th>Grade </Th>
              </Tr>
            </Thead>
            <Tbody> </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
