import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { getCourses } from "../../api/course";
import { getExams } from "../../api/exams";
import useClassStore from "../../store/store";
import { parseQuestions } from "../../utils";
import { Navbar } from "../Navbar";

export const Root = () => {
  useEffect(() => {
    (async () => {
      const exams = parseQuestions(await getExams());
      const courses = await getCourses();
      useClassStore.setState({ exams, courses });
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};
