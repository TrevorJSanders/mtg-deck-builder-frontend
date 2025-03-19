import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 24,    // 24 hours
      retry: 1,                       // Only retry once
      retryDelay: 3000,               // Wait 3 seconds before retrying
      },
    }
  });

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://mtg-deck-builder-backend.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

if (process.env.NODE_ENV === 'development') {
  apiClient.interceptors.request.use(request => {
    console.log('Starting Request', request.url);
    return request;
  });
  
  apiClient.interceptors.response.use(response => {
    console.log('Response:', response.config.url, response.status);
    return response;
  });
}