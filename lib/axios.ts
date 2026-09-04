import axios, { AxiosError } from 'axios';
import type { ApiResponse } from '@/lib/api-response';

/**
 * Standardized Production Axios Client Instance
 * Features:
 * - Relative same-origin baseURL support
 * - JSON headers and cookie credentials support
 * - Response interceptors extracting standardized ApiResponse errors
 */
export const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    let serverMessage = 'An unexpected error occurred. Please try again.';

    if (error.response?.data) {
      const data = error.response.data;
      if (typeof data === 'string') {
        serverMessage = data;
      } else if (typeof data === 'object' && data !== null) {
        if (data.error && typeof data.error === 'string') {
          serverMessage = data.error;
        } else if (data.message && typeof data.message === 'string') {
          serverMessage = data.message;
        }
      }
    } else if (error.message && typeof error.message === 'string') {
      serverMessage = error.message;
    }

    // Preserve full Axios error object while attaching extracted fields
    error.message = serverMessage;
    (error as any).status = error.response?.status;
    (error as any).data = error.response?.data;
    (error as any).errors = error.response?.data?.errors;

    return Promise.reject(error);
  }
);

export default apiClient;

