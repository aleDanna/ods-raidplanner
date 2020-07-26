import { format, parseISO } from 'date-fns';

export const formatISODateString = (ISODate: string, strFormat: string) =>
  format(parseISO(ISODate), strFormat);

export const getDateTimeString = date => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString();
};

export const addTimeStringToDate = (date, timeString) => {
  return date + 'T' + timeString;
};
