export const dateFormatterYEAR_MONTH_DAY = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isSunday = (date: Date) => date.getDay() === 0;

export const isTheSameDate = (calendarDate: Date, apiDate: string) => dateFormatterYEAR_MONTH_DAY(calendarDate) === apiDate;