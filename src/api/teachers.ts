import instance from "./instace";

interface Teacher { }

export const getTeachers = async () => {
  try {
    return await instance.get("/teacher");
  } catch (error) {
    console.error(error);
  }
};

export const getTeacher = async (id: number) => {
  try {
    return await instance.get(`/teacher/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const createTeacher = async (teacher: Teacher) => {
  try {
    return await instance.post("/teacher", { data: teacher });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTeacher = async (id: number) => {
  try {
    return await instance.delete("/teacher", { data: { id } });
  } catch (error) {
    console.error(error);
  }
};
