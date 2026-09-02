import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

// Load persisted state from localStorage (browser-only)
const loadPersistedState = () => {
  if (typeof window === 'undefined') return undefined;
  try {
    const serializedAuth = localStorage.getItem('campushire_auth_state');
    if (!serializedAuth) return undefined;
    const parsedAuth = JSON.parse(serializedAuth);
    return {
      auth: {
        ...parsedAuth,
        loading: false,
        error: null,
      },
    };
  } catch (e) {
    console.warn('Failed to load persisted Redux state:', e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadPersistedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist state to localStorage on changes (browser-only)
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const state = store.getState();
      const authToPersist = {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        studentProfile: state.auth.studentProfile,
        recruiterProfile: state.auth.recruiterProfile,
        tpoProfile: state.auth.tpoProfile,
      };
      localStorage.setItem('campushire_auth_state', JSON.stringify(authToPersist));
    } catch (e) {
      console.warn('Failed to persist Redux state to localStorage:', e);
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
