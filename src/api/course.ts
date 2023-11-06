import instance from "./instace";

interface Course {
  teacherId: any;
}

export const getCourses = async () => {
  try {
    const response = await instance.get("/api/course");
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getCourse = async (id: number) => {
  try {
    return await instance.get(`/api/course/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const createCourse = async (course: Course, user: any) => {
  delete user.isAuth;
  delete user.type;
  course.teacherId = user.id;
  try {
    return await instance.post("/api/course", course);
  } catch (error) {
    console.error(error);
  }
};

export const deleteCourse = async (id: number) => {
  try {
    return await instance.delete("/api/course", { data: { id } });
  } catch (error) {
    console.error(error);
  }
};
