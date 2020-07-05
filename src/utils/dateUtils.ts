import { format, parseISO } from "date-fns"
import { it } from "date-fns/locale";

export const formatISODateString = (ISODate: string, strFormat: string) => format(parseISO(ISODate), strFormat, {locale: it});

export const getDateTimeString = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
}

export const addTimeStringToDate = (date, timeString) => {
    const isoDateString = date + 'T' + timeString;
    return formatISODateString(isoDateString, "yyyy-MM-dd HH:mm:ss");
}

export const formatTimeStringToDate = (timeString) => {
    return addTimeStringToDate(new Date(1970, 1, 1), timeString);
}
