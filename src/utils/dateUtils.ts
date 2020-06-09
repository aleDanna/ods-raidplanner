import { format, parseISO } from "date-fns"
import { it } from "date-fns/locale";

export const formatISODateString = (ISODate: string, strFormat: string) => format(parseISO(ISODate), strFormat, {locale: it});