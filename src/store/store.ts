import { create } from "zustand";

interface classStore {
  user: {
    role: string;
    isAuth: boolean;
  };
  exams: any[];
}

const useClassStore = create<classStore>()((_set) => ({
  user: {
    role: "teacher",
    isAuth: false,
  },
  exams: [],
}));

export default useClassStore;
