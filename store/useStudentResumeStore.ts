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
          resumes: res.data.data.resumes,
          isLoading: false,
        });
        return;
      }
      set({ resumes: [], isLoading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch resumes';
      console.error('[useStudentResumeStore] Error fetching resumes:', msg);
      set({ resumes: [], isLoading: false, error: msg });
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
        const isDef = created.isDefault || isDefault;
        const updated = isDef
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
      const msg = err.response?.data?.message || err.message || 'Failed to update default resume';
      set({ isProcessingId: null, error: msg });
      return false;
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
      const msg = err.response?.data?.message || err.message || 'Failed to rename resume';
      set({ isProcessingId: null, error: msg });
      return false;
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
      const msg = err.response?.data?.message || err.message || 'Failed to delete resume';
      set({ isProcessingId: null, error: msg });
      return false;
    }
  },

  setPreviewResume: (resume) => set({ previewResume: resume }),
  setRenameResumeItem: (resume) => set({ renameResumeItem: resume }),
  setDeleteConfirmItem: (resume) => set({ deleteConfirmItem: resume }),
  clearMessages: () => set({ error: null, successMessage: null }),
}));
