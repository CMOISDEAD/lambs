import instance from "./instace";

interface Student { }

export const getStudents = async () => {
  try {
    return await instance.get("/api/student");
  } catch (error) {
    console.error(error);
  }
};

export const getStudent = async (id: number) => {
  try {
    return await instance.get(`/api/student/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const createStudent = async (data: Student) => {
  try {
    console.log(data);
    return await instance.post("/api/student", data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudent = async (id: number) => {
  try {
    return await instance.delete("/api/student", { data: { id } });
  } catch (error) {
    console.error(error);
  }
};
