import { getCourses } from "../api/course";
import { getExams } from "../api/exams";
import useClassStore from "../store/store";

export const generateRoomCode = () => {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code;
};

export const parseQuestions = (questions: any[]) => {
  return questions.map((question) => {
    const { content, ...rest } = question;
    return {
      ...rest,
      questions: JSON.parse(content),
    };
  });
};

export const refresh = async () => {
  const exams = parseQuestions(await getExams());
  const courses = await getCourses();
  useClassStore.setState({ exams, courses });
  return { exams, courses };
};
