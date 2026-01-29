import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import PrevIcon from './icons/PrevIcon';
import NextIcon from './icons/NextIcon';
import InfoIcon from "./icons/InfoIcon";
import { HOLIDAYS_API_URL } from "../api/urls";

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
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  
  const isSunday = (date: Date) => date.getDay() === 0;
  const isTheSameDate = (calendarDate: Date, apiDate: string) => dateFormatterYEAR_MONTH_DAY(calendarDate) === apiDate;

  const hasNationalHoliday = (date: Date) => holidays.some((holiday) => isTheSameDate(date, holiday.date) && holiday.type === NATIONAL_HOLIDAY);
  const observance = selectedDate ? holidays.find(holiday => isTheSameDate(selectedDate, holiday.date) && holiday.type === OBSERVANCE) : null;


  useEffect(() => {
    const controler = new AbortController();
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
            },
            signal: controler.signal
          }
        );

        setHolidays(response.data);
      } catch (error: any) {
        console.error();
      }
    };

    fetchHolidays();

    return () => {
      controler.abort();
    }
  }, []);

  return (
    <div>
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
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 1);
          if (date <= currentDate) return;
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