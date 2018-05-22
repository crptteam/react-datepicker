import moment from 'moment';

moment.locale('ru');

export function getValidMomentFromISOStringOrNull(str) {
  const m = moment(str);
  return m.isValid() ? m : null;
}

export function getDaysArrayFromMomentDate(date) {
  const count = date.daysInMonth();
  const startOfMonth = date.startOf('month');
  const dayNumber = startOfMonth.isoWeekday();
  let currentDay;
  const days = [];

  for (let i = 2; i <= count + dayNumber; i++) {
    if (i < dayNumber) {
      days.push({ val: 0 });
    } else {
      currentDay = moment(startOfMonth).add(i - dayNumber - 1, 'day');

      days.push({
        val: i - dayNumber,
        date: currentDay,
        formated: currentDay.format('YYYY-MM-DD')
      });
    }
  }
  return days;
}
