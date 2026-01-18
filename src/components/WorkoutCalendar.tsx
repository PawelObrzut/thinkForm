import React from 'react'
import Calendar from "react-calendar";
import PrevIcon from './icons/PrevIcon';
import NextIcon from './icons/NextIcon';

const WorkoutCalendar = () => {
  return (
    <div>
      <Calendar
        locale='en-GB'
        showNeighboringMonth={false}
        formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
        prevLabel={<span><PrevIcon /></span>}
        nextLabel={<span><NextIcon /></span>}
      />
    </div>
  )
}

export default WorkoutCalendar