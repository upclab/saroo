import parse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';
import addDays from 'date-fns/add_days';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import es from 'date-fns/locale/es';

export function format(date, formatStr) {
  return dateFnsFormat(date, formatStr, {
    locale: es,
  });
}

export function toLocalDate(timestamp) {
  let date = timestamp;
  date = parse(Number(timestamp));
  return format(date, 'DD/MM/YYYY');
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

export function daysToReadableTIme(days) {
  const now = new Date();
  const nowPlusDuration = addDays(now, Number(days));

  return distanceInWordsStrict(
    now,
    nowPlusDuration,
    {
      unit: 'M',
      locale: es,
    },
  );
}
