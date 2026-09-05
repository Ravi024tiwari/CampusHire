import { create } from 'zustand';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export type ModalType =
  | 'APPLY_JOB'
  | 'RESUME_VIEWER'
  | 'JOB_DETAILS'
  | 'OFFER_LETTER'
  | 'STUDENT_FILTER'
  | null;

interface UIState {
  isMobileMenuOpen: boolean;
  isRecruiterSidebarCollapsed: boolean;
  activeModal: ModalType;
  modalData: any;
  toasts: ToastMessage[];
}

interface UIActions {
  // Mobile drawer
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Recruiter sidebar collapse
  toggleRecruiterSidebar: () => void;
  setRecruiterSidebarCollapsed: (collapsed: boolean) => void;

  // Modals
  openModal: (modal: ModalType, data?: any) => void;
  closeModal: () => void;

  // Toasts
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

export type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set, get) => ({
  // State
  isMobileMenuOpen: false,
  isRecruiterSidebarCollapsed: false,
  activeModal: null,
  modalData: null,
  toasts: [],

  // Actions
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  toggleRecruiterSidebar: () => {
    const next = !get().isRecruiterSidebarCollapsed;
    try {
      localStorage.setItem('campushire_recruiter_sidebar_collapsed', JSON.stringify(next));
    } catch {}
    set({ isRecruiterSidebarCollapsed: next });
  },

  setRecruiterSidebarCollapsed: (collapsed) => {
    try {
      localStorage.setItem('campushire_recruiter_sidebar_collapsed', JSON.stringify(collapsed));
    } catch {}
    set({ isRecruiterSidebarCollapsed: collapsed });
  },

  openModal: (modal, data = null) => set({ activeModal: modal, modalData: data }),

  closeModal: () => set({ activeModal: null, modalData: null }),

  showToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    // Auto dismiss after duration (default 4000ms)
    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        get().dismissToast(id);
      }, duration);
    }
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
