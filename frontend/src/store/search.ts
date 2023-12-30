import { create } from "zustand";

interface SearchStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Estado para la barra de busqueda
export const useSearchStore = create<SearchStore>((set) => ({
  // Estado inicial
  searchTerm: "",
  // Funcion
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
