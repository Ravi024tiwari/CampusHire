import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'RECRUITER' | 'TPO_ADMIN' | 'SUPER_ADMIN';
  avatarUrl?: string | null;
  isActive?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setHasHydrated: (hydrated: boolean) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  resetAuth: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isLoading: true,
      hasHydrated: false,
      error: null,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
          error: null,
        });
      },

      setError: (error) => set({ error }),

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      refreshUser: async () => {
        set({ isLoading: true });
        try {
          const response = await apiClient.get<ApiResponse<{ user: User }>>('/api/auth/me');
          const result = response.data;
          
          if (result.success && result.data?.user) {
            set({
              user: result.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return;
          }
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (err: any) {
          // If 401 unauthenticated, smoothly reset without loud errors
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: err.status === 401 ? null : (err.message || 'Session verification failed'),
          });
        }
      },

      logout: async () => {
        try {
          await apiClient.post('/api/auth/logout');
        } catch (err) {
          console.error('[AuthStore] Logout error:', err);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      },

      resetAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'campushire_auth_store', // unique localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist safe user profile metadata; do NOT persist transient loading states
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
