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

export function getAllPlainValuesAsObj(obj) {
  const plain = {};
  Object.keys(obj).forEach(key => typeof obj[key] !== "object" ? plain[key] = obj[key] : null);
  return plain;
}

export function getThemeAsPlainTextByKeys(theme, ...keys) {
  const plain = getAllPlainValuesAsObj(theme);

  keys.forEach(key => theme[key] && Object.assign(plain, theme[key]));

  return plain;
}


export function innerMerge(obj, ...others) {
  others.forEach(v => {
    for (const key in v) {
      if (typeof obj[key] === "object" && typeof v[key] === "object") {
        obj[key] = innerMerge({}, obj[key], v[key]);
      } else {
        obj[key] = v[key];
      }
    }
  });

  return obj;
}