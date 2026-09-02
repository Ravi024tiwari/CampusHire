import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'RECRUITER' | 'TPO_ADMIN' | 'SUPER_ADMIN';
  avatarUrl?: string | null;
  isActive?: boolean;
}

export interface StudentProfileState {
  id?: string;
  collegeId?: string;
  collegeName?: string;
  enrollmentNumber?: string;
  branch?: string;
  batchYear?: number;
  cgpa?: number;
  resumeUrl?: string | null;
  skills?: string[];
  isVerified?: boolean;
}

export interface RecruiterProfileState {
  id?: string;
  companyId?: string;
  companyName?: string;
  companyLogoUrl?: string | null;
  designation?: string;
  isCompanyVerified?: boolean;
}

export interface TpoProfileState {
  id?: string;
  collegeId?: string | null;
  collegeName?: string | null;
  collegeCode?: string | null;
  designation?: string;
  isCollegeVerified?: boolean;
}

export interface AuthState {
  user: UserState | null;
  isAuthenticated: boolean;
  studentProfile: StudentProfileState | null;
  recruiterProfile: RecruiterProfileState | null;
  tpoProfile: TpoProfileState | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  studentProfile: null,
  recruiterProfile: null,
  tpoProfile: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: UserState;
        studentProfile?: StudentProfileState | null;
        recruiterProfile?: RecruiterProfileState | null;
        tpoProfile?: TpoProfileState | null;
      }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (action.payload.studentProfile !== undefined) {
        state.studentProfile = action.payload.studentProfile;
      }
      if (action.payload.recruiterProfile !== undefined) {
        state.recruiterProfile = action.payload.recruiterProfile;
      }
      if (action.payload.tpoProfile !== undefined) {
        state.tpoProfile = action.payload.tpoProfile;
      }
      state.error = null;
    },

    updateUserProfile: (
      state,
      action: PayloadAction<Partial<UserState>>
    ) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    updateStudentProfile: (
      state,
      action: PayloadAction<Partial<StudentProfileState>>
    ) => {
      if (state.studentProfile) {
        state.studentProfile = { ...state.studentProfile, ...action.payload };
      } else {
        state.studentProfile = action.payload as StudentProfileState;
      }
    },

    updateRecruiterProfile: (
      state,
      action: PayloadAction<Partial<RecruiterProfileState>>
    ) => {
      if (state.recruiterProfile) {
        state.recruiterProfile = { ...state.recruiterProfile, ...action.payload };
      } else {
        state.recruiterProfile = action.payload as RecruiterProfileState;
      }
    },

    updateTpoProfile: (
      state,
      action: PayloadAction<Partial<TpoProfileState>>
    ) => {
      if (state.tpoProfile) {
        state.tpoProfile = { ...state.tpoProfile, ...action.payload };
      } else {
        state.tpoProfile = action.payload as TpoProfileState;
      }
    },

    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.studentProfile = null;
      state.recruiterProfile = null;
      state.tpoProfile = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setCredentials,
  updateUserProfile,
  updateStudentProfile,
  updateRecruiterProfile,
  updateTpoProfile,
  setAuthLoading,
  setAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
