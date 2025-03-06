import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24,
      },
    }
  });

export const apiClient = axios.create({
  baseURL: 'https://mtg-deck-builder-backend.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});