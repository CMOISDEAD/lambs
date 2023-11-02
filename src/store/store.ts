import { create } from "zustand";

interface BearState {
  user: {
    isAuth: boolean;
  };
}

const useClassStore = create<BearState>()((_set) => ({
  user: {
    isAuth: false,
  },
}));

export default useClassStore;
