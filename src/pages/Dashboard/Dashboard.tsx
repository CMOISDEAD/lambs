import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { CreateCourse } from "../../components/Dashboard/CreateCourse";
import { CreateExam } from "../../components/Dashboard/CreateExam";
import { ListExams } from "../../components/Dashboard/ListExam";
import { StudentsTable } from "../../components/Dashboard/StudentsTable";

export const Dashboard = () => {
  return (
    <div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Exams</Tab>
          <Tab>Groups</Tab>
          <Tab>Create Exam</Tab>
          <Tab>Create Course</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ListExams />
          </TabPanel>
          <TabPanel>
            <StudentsTable />
          </TabPanel>
          <TabPanel>
            <CreateExam />
          </TabPanel>
          <TabPanel>
            <CreateCourse />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
