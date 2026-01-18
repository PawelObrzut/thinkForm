import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import PrevIcon from './icons/PrevIcon';
import NextIcon from './icons/NextIcon';
import InfoIcon from "./icons/InfoIcon";
import { HOLIDAYS_API_URL } from "../api/urls"

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
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const NATIONAL_HOLIDAY = 'NATIONAL_HOLIDAY';
  const OBSERVANCE = 'OBSERVANCE';
  
  const dateFormatterYEAR_MONTH_DAY = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const isSunday = (date: Date) => date.getDay() === 0;
  const isTheSameDate = (calendarDate: Date, apiDate: string) => dateFormatterYEAR_MONTH_DAY(calendarDate) === apiDate;

  const hasNationalHoliday = (date: Date) => holidays.some((holiday) => isTheSameDate(date, holiday.date) && holiday.type === NATIONAL_HOLIDAY);
  const observance = selectedDate ? holidays.find( holiday => isTheSameDate(selectedDate, holiday.date) && holiday.type === OBSERVANCE ) : null;


  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          HOLIDAYS_API_URL,
          {
            headers: {
              "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY
            },
            params: {
              country: "PL"
            }
          }
        );

        setHolidays(response.data);
      } catch (error: any) {
        console.error();
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div>
      <Calendar
        locale='en-GB'
        showNeighboringMonth={false}
        formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
        prevLabel={<span><PrevIcon /></span>}
        nextLabel={<span><NextIcon /></span>}

        tileDisabled={({ date, view }) => {
          if (view !== 'month') return false;
          return isSunday(date) || hasNationalHoliday(date);
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