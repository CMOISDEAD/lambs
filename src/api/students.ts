import instance from "./instace";

interface Student { }

export const getStudents = async () => {
  try {
    return await instance.get("/student");
  } catch (error) {
    console.error(error);
  }
};

export const getStudent = async (id: number) => {
  try {
    return await instance.get(`/student/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const createStudent = async (student: Student) => {
  try {
    return await instance.post("/student", { data: student });
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudent = async (id: number) => {
  try {
    return await instance.delete("/student", { data: { id } });
  } catch (error) {
    console.error(error);
  }
};
