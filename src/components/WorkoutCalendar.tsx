import axios from "axios";
import Calendar from "react-calendar";
import PrevIcon from './icons/PrevIcon';
import NextIcon from './icons/NextIcon';
import InfoIcon from "./icons/InfoIcon";
import { HOLIDAYS_API_URL } from "../api/urls";
import { isSunday, isTheSameDate } from "../utility/dateHelperFunctions"
import { useQuery } from '@tanstack/react-query'

type Props = {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

type Holiday = {
  date: string;
  name: string;
  type: string;
};


const WorkoutCalendar = ({ selectedDate, onDateSelect }: Props) => {
  const NATIONAL_HOLIDAY = 'NATIONAL_HOLIDAY';
  const OBSERVANCE = 'OBSERVANCE';

  const { data: holidays = [], isPending, isError } = useQuery<Holiday[]>({
    queryKey: ['calendarData'],
    queryFn: async ({ signal }) => {
      const response = await axios.get(
        HOLIDAYS_API_URL,
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY
          },
          params: {
            country: "PL"
          },
          signal
        }
      )
      return response.data
    }
  })

  const hasNationalHoliday = (date: Date) => holidays.some((holiday) => isTheSameDate(date, holiday.date) && holiday.type === NATIONAL_HOLIDAY);
  const observance = selectedDate ? holidays.find((holiday) => isTheSameDate(selectedDate, holiday.date) && holiday.type === OBSERVANCE) : null;

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>Error</p>;

  return (
    <div data-testid='workout-calendar'>
      <Calendar
        locale='en-GB'
        showNeighboringMonth={false}
        formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
        prevLabel={<span><PrevIcon /></span>}
        nextLabel={<span><NextIcon /></span>}
        next2Label={null}
        prev2Label={null}

        tileDisabled={({ date, view }) => {
          if (view !== 'month') return false;

          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 1);

          return date <= currentDate || isSunday(date) || hasNationalHoliday(date);
        }}

        tileClassName={({ date, view }) => {
          if (view !== 'month') return '';

          if (isSunday(date) || hasNationalHoliday(date)) {
            return 'calendar-national-holiday';
          }
        }}

        value={selectedDate}

        onClickDay={(date) => {
          if (isSunday(date) || hasNationalHoliday(date)) return;
          onDateSelect(date);
        }}
      />

      {observance && (
        <div>
          <p className='flex items-center pt-3 text-sm'><InfoIcon /> It is {observance.name}.</p>
        </div>
      )}

    </div>
  )
}

export default WorkoutCalendar