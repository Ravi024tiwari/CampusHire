import { create } from 'zustand';

export interface FilterState {
  searchQuery: string;
  selectedBranch: string;
  selectedBatchYear: string;
  minCgpa: number | '';
  selectedRoleType: string;
  selectedLocation: string;
  sortBy: 'latest' | 'salary_high' | 'salary_low' | 'deadline';
}

interface FilterActions {
  setSearchQuery: (query: string) => void;
  setSelectedBranch: (branch: string) => void;
  setSelectedBatchYear: (year: string) => void;
  setMinCgpa: (cgpa: number | '') => void;
  setSelectedRoleType: (roleType: string) => void;
  setSelectedLocation: (location: string) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  selectedBranch: 'ALL',
  selectedBatchYear: 'ALL',
  minCgpa: '',
  selectedRoleType: 'ALL',
  selectedLocation: 'ALL',
  sortBy: 'latest',
};

export type FilterStore = FilterState & FilterActions;

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilters,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedBranch: (selectedBranch) => set({ selectedBranch }),
  setSelectedBatchYear: (selectedBatchYear) => set({ selectedBatchYear }),
  setMinCgpa: (minCgpa) => set({ minCgpa }),
  setSelectedRoleType: (selectedRoleType) => set({ selectedRoleType }),
  setSelectedLocation: (selectedLocation) => set({ selectedLocation }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(initialFilters),
}));
