import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HOLIDAYS_API_URL } from '../api/urls';


export type Holiday = {
  date: string;
  name: string;
  type: string;
};

export function useHolidays() {
  return useQuery<Holiday[]>({
    queryKey: ['calendarData'],
    queryFn: ({ signal }) =>
      axios
        .get(HOLIDAYS_API_URL, {
          signal,
          headers: { 'X-Api-Key': import.meta.env.VITE_API_NINJA_KEY },
          params: { country: 'PL' },
        })
        .then(res => res.data),
  });
}