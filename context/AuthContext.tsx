'use client';

import React, { useEffect } from 'react';
import { useAuthStore, User } from '@/store/useAuthStore';

export type { User };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const refreshUser = useAuthStore((state) => state.refreshUser);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return <>{children}</>;
}

/**
 * Convenience hook that proxies directly to the Zustand useAuthStore.
 * Allows existing code to use useAuth() while powered by Zustand.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const refreshUser = useAuthStore((state) => state.refreshUser);

  return {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    logout,
    refreshUser,
  };
}
