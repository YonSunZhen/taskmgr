import {isFuture, isDate, isValid, differenceInYears, parse, format} from 'date-fns';
//验证是不是合法日期
export const isValidDate = (dateStr) => {
  const date = parse(dateStr);
  return isDate(date) 
      && isValid(date) 
      && !isFuture(date) 
      && differenceInYears(Date.now(),date) < 150;
};

export const toDate = (date: Date) => {
  return format(date, 'YYYY-MM-DD');
};