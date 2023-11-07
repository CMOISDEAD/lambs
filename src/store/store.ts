import { create } from "zustand";

interface classStore {
  user: {
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    isAuth: boolean;
    type: string;
    courseId?: number;
    course: {
      name: string;
      exams: any[];
    };
  };
  exams: any[];
  courses: any[];
}

const useClassStore = create<classStore>()((_set) => ({
  user: {
    type: "teacher",
    isAuth: false,
  },
  exams: [],
  courses: [],
}));

export default useClassStore;
