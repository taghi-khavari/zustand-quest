import { create } from "zustand";

type FilterState = {
  search: string;
  selectedTag: string;
  setSearch: (search: string) => void;
  setSelectedTag: (selectedTag: string) => void;
};

export const useFilterStore = create<FilterState>()((set) => ({
  search: "",
  selectedTag: "all",
  setSearch: (search) => set({ search }),
  setSelectedTag: (selectedTag) => set({ selectedTag })
}));
