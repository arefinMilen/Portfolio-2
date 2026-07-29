import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '@/types/portfolio';

interface UIState {
  activeSection: string;
  activeSkillCategory: string;
  activeProjectCategory: string;
  selectedProject: Project | null;
  isProjectModalOpen: boolean;
  isMobileMenuOpen: boolean;
  soundEnabled: boolean;
  searchQuery: string;
}

const initialState: UIState = {
  activeSection: 'home',
  activeSkillCategory: 'all',
  activeProjectCategory: 'all',
  selectedProject: null,
  isProjectModalOpen: false,
  isMobileMenuOpen: false,
  soundEnabled: true,
  searchQuery: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setActiveSkillCategory: (state, action: PayloadAction<string>) => {
      state.activeSkillCategory = action.payload;
    },
    setActiveProjectCategory: (state, action: PayloadAction<string>) => {
      state.activeProjectCategory = action.payload;
    },
    openProjectModal: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
      state.isProjectModalOpen = true;
    },
    closeProjectModal: (state) => {
      state.isProjectModalOpen = false;
      state.selectedProject = null;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setActiveSection,
  setActiveSkillCategory,
  setActiveProjectCategory,
  openProjectModal,
  closeProjectModal,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSound,
  setSearchQuery,
} = uiSlice.actions;

export default uiSlice.reducer;
