import instance from "./instace";

// NOTE: this should be in a global types file
interface Exam {
  questions?: any[];
  teacher: any;
}

export const getExams = async () => {
  try {
    const { status, data } = await instance.get("/api/exam");
    if (status === 200) return data;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getExam = async (id: number) => {
  try {
    return await instance.get(`/api/exam/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching exam");
  }
};

export const createExam = async (base: Exam, user: any) => {
  const exam = {
    ...base,
    teacherId: user.id,
    content: JSON.stringify(base.questions),
  };
  delete exam.questions;
  try {
    const response = await instance.post("/api/exam", exam);
    if (response.status !== 200) return { error: "Error creating exam" };
    const { data } = response;
    const allExams = await getExams();
    return { exam: data, exams: allExams };
  } catch (error) {
    console.error(error);
    return { error: "Error creating exam" };
  }
};

export const deleteExam = async (id: number) => {
  try {
    return await instance.delete("/api/exam", { data: { id } });
  } catch (error) {
    console.error(error);
  }
};

export const gradeExam = async (data: any) => {
  try {
    return await instance.post("/api/exam/grade", data);
  } catch (e) {
    console.error(e);
  }
};

export const getGrade = async (id: number) => {
  try {
    const { status, data } = await instance.get(`/api/exam/grade/${id}`);
    if (status === 200) return data;
  } catch (error) {
    console.error(error);
  }
};
