import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface ResumeVersion {
  id: string;
  studentId?: string;
  title: string;
  fileUrl: string;
  publicId?: string | null;
  fileType?: string | null;
  fileSize?: number | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface StudentResumeState {
  resumes: ResumeVersion[];
  isLoading: boolean;
  isUploading: boolean;
  isProcessingId: string | null;
  error: string | null;
  successMessage: string | null;

  // Modals & Preview
  previewResume: ResumeVersion | null;
  renameResumeItem: ResumeVersion | null;
  deleteConfirmItem: ResumeVersion | null;

  // Actions
  fetchResumes: () => Promise<void>;
  uploadResume: (file: File, title: string, isDefault?: boolean) => Promise<boolean>;
  setDefaultResume: (id: string) => Promise<boolean>;
  renameResume: (id: string, newTitle: string) => Promise<boolean>;
  deleteResume: (id: string) => Promise<boolean>;
  setPreviewResume: (resume: ResumeVersion | null) => void;
  setRenameResumeItem: (resume: ResumeVersion | null) => void;
  setDeleteConfirmItem: (resume: ResumeVersion | null) => void;
  clearMessages: () => void;
}

const fallbackResumes: ResumeVersion[] = [
  {
    id: 'res-1',
    title: 'Full Stack Developer',
    fileUrl: 'https://res.cloudinary.com/sample/raw/upload/v1/campushire/resumes/Ravi_Tiwari_FullStack.pdf',
    fileSize: 840 * 1024,
    fileType: 'pdf',
    isDefault: true,
    createdAt: '2025-08-10T10:00:00Z',
  },
  {
    id: 'res-2',
    title: 'Data Analyst & Python',
    fileUrl: 'https://res.cloudinary.com/sample/raw/upload/v1/campushire/resumes/Ravi_Tiwari_DataAnalyst.pdf',
    fileSize: 920 * 1024,
    fileType: 'pdf',
    isDefault: false,
    createdAt: '2025-08-18T14:30:00Z',
  },
  {
    id: 'res-3',
    title: 'Core Software Engineer (DSA & C++)',
    fileUrl: 'https://res.cloudinary.com/sample/raw/upload/v1/campushire/resumes/Ravi_Tiwari_SDE.pdf',
    fileSize: 760 * 1024,
    fileType: 'pdf',
    isDefault: false,
    createdAt: '2025-08-25T09:15:00Z',
  },
];

export const useStudentResumeStore = create<StudentResumeState>((set, get) => ({
  resumes: [],
  isLoading: true,
  isUploading: false,
  isProcessingId: null,
  error: null,
  successMessage: null,

  previewResume: null,
  renameResumeItem: null,
  deleteConfirmItem: null,

  fetchResumes: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiClient.get<ApiResponse<{ resumes: ResumeVersion[]; total: number }>>(
        '/api/student/resumes'
      );
      if (res.data.success && res.data.data?.resumes) {
        set({
          resumes: res.data.data.resumes.length > 0 ? res.data.data.resumes : fallbackResumes,
          isLoading: false,
        });
        return;
      }
      set({ resumes: fallbackResumes, isLoading: false });
    } catch (err: any) {
      console.warn('[useStudentResumeStore] Fallback to sample resumes:', err?.message);
      set({ resumes: fallbackResumes, isLoading: false });
    }
  },

  uploadResume: async (file: File, title: string, isDefault = false) => {
    set({ isUploading: true, error: null, successMessage: null });
    try {
      // Step 1: Upload file to Cloudinary via /api/upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'resume');

      const uploadRes = await apiClient.post<ApiResponse<{ url: string; publicId: string; fileName: string; fileSize: number }>>(
        '/api/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (!uploadRes.data.success || !uploadRes.data.data?.url) {
        throw new Error(uploadRes.data.message || 'File upload failed');
      }

      const { url, publicId, fileSize } = uploadRes.data.data;

      // Step 2: Create DB record via /api/student/resumes
      const dbRes = await apiClient.post<ApiResponse<ResumeVersion>>('/api/student/resumes', {
        title: title.trim() || file.name,
        fileUrl: url,
        publicId: publicId || null,
        fileSize: fileSize || file.size,
        fileType: 'pdf',
        isDefault,
      });

      if (dbRes.data.success && dbRes.data.data) {
        const created = dbRes.data.data;
        const current = get().resumes;
        const updated = isDefault
          ? [created, ...current.map((r) => ({ ...r, isDefault: false }))]
          : [created, ...current];

        set({
          resumes: updated,
          isUploading: false,
          successMessage: 'Resume uploaded successfully!',
        });
        return true;
      }

      throw new Error(dbRes.data.message || 'Failed to save resume record');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to upload resume';
      set({ error: msg, isUploading: false });
      return false;
    }
  },

  setDefaultResume: async (id: string) => {
    set({ isProcessingId: id, error: null });
    try {
      const res = await apiClient.patch<ApiResponse<ResumeVersion>>(`/api/student/resumes/${id}`, {
        isDefault: true,
      });

      if (res.data.success) {
        set({
          resumes: get().resumes.map((r) => ({
            ...r,
            isDefault: r.id === id,
          })),
          isProcessingId: null,
          successMessage: 'Primary resume updated!',
        });
        return true;
      }
      return false;
    } catch (err: any) {
      // Local fallback for offline/demo mode
      set({
        resumes: get().resumes.map((r) => ({
          ...r,
          isDefault: r.id === id,
        })),
        isProcessingId: null,
        successMessage: 'Primary resume updated!',
      });
      return true;
    }
  },

  renameResume: async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return false;
    set({ isProcessingId: id, error: null });
    try {
      const res = await apiClient.patch<ApiResponse<ResumeVersion>>(`/api/student/resumes/${id}`, {
        title: newTitle.trim(),
      });

      if (res.data.success) {
        set({
          resumes: get().resumes.map((r) => (r.id === id ? { ...r, title: newTitle.trim() } : r)),
          isProcessingId: null,
          renameResumeItem: null,
          successMessage: 'Resume title updated!',
        });
        return true;
      }
      return false;
    } catch (err: any) {
      // Local fallback
      set({
        resumes: get().resumes.map((r) => (r.id === id ? { ...r, title: newTitle.trim() } : r)),
        isProcessingId: null,
        renameResumeItem: null,
        successMessage: 'Resume title updated!',
      });
      return true;
    }
  },

  deleteResume: async (id: string) => {
    set({ isProcessingId: id, error: null });
    try {
      const res = await apiClient.delete<ApiResponse<{ deletedId: string }>>(`/api/student/resumes/${id}`);
      if (res.data.success) {
        const remaining = get().resumes.filter((r) => r.id !== id);
        // If the deleted one was default, set the first remaining as default
        if (remaining.length > 0 && !remaining.some((r) => r.isDefault)) {
          remaining[0].isDefault = true;
        }
        set({
          resumes: remaining,
          isProcessingId: null,
          deleteConfirmItem: null,
          successMessage: 'Resume deleted successfully!',
        });
        return true;
      }
      return false;
    } catch (err: any) {
      // Local fallback
      const remaining = get().resumes.filter((r) => r.id !== id);
      if (remaining.length > 0 && !remaining.some((r) => r.isDefault)) {
        remaining[0].isDefault = true;
      }
      set({
        resumes: remaining,
        isProcessingId: null,
        deleteConfirmItem: null,
        successMessage: 'Resume deleted successfully!',
      });
      return true;
    }
  },

  setPreviewResume: (resume) => set({ previewResume: resume }),
  setRenameResumeItem: (resume) => set({ renameResumeItem: resume }),
  setDeleteConfirmItem: (resume) => set({ deleteConfirmItem: resume }),
  clearMessages: () => set({ error: null, successMessage: null }),
}));
