import parse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';
import es from 'date-fns/locale/es';

export function format(date, formatStr) {
  return dateFnsFormat(date, formatStr, {
    locale: es,
  });
}

export function toDayAndMonths(timestamp) {
  let date = timestamp;
  date = parse(Number(timestamp));
  return format(date, 'DD [de] MMMM');
}

export function toMonthAndYear(timestamp) {
  const date = parse(Number(timestamp));
  return format(date, 'MMMM - YYYY');
}
