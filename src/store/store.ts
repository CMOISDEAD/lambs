import { create } from "zustand";

interface classStore {
  user: {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    isAuth: boolean;
    role: string;
  };
  exams: any[];
  courses: any[];
}

const useClassStore = create<classStore>()((_set) => ({
  user: {
    role: "teacher",
    isAuth: false,
  },
  exams: [],
  courses: [],
}));

export default useClassStore;
