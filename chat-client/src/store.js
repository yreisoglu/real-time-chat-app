import create from "zustand";

const useStore = create((set) => ({
  currentUsername: "",
  setCurrentUsername: (username) => set((state) => ({ currentUsername: username })),
}));

export default useStore;
