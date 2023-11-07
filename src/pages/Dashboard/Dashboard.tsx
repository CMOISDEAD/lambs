import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { CreateCourse } from "../../components/Dashboard/CreateCourse";
import { CreateExam } from "../../components/Dashboard/CreateExam";
import { CreateStudent } from "../../components/Dashboard/CreateStudent";
import { ListCourse } from "../../components/Dashboard/ListCourse";
import { ListExams } from "../../components/Dashboard/ListExam";

export const Dashboard = () => {
  return (
    <div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Exams</Tab>
          <Tab>Course</Tab>
          <Tab>Create Exam</Tab>
          <Tab>Create Course</Tab>
          <Tab>Add Students</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ListExams />
          </TabPanel>
          <TabPanel>
            <ListCourse />
          </TabPanel>
          <TabPanel>
            <CreateExam />
          </TabPanel>
          <TabPanel>
            <CreateCourse />
          </TabPanel>
          <TabPanel>
            <CreateStudent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
