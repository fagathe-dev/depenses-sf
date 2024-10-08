import{daysInMonth}from"../units/month";import{YEAR,MONTH,DATE,HOUR,MINUTE,SECOND,MILLISECOND,WEEK,WEEKDAY}from"../units/constants";import getParsingFlags from"../create/parsing-flags";export default function checkOverflow(E){var r,a=E._a;return a&&-2===getParsingFlags(E).overflow&&(r=a[MONTH]<0||a[MONTH]>11?MONTH:a[DATE]<1||a[DATE]>daysInMonth(a[YEAR],a[MONTH])?DATE:a[HOUR]<0||a[HOUR]>24||24===a[HOUR]&&(0!==a[MINUTE]||0!==a[SECOND]||0!==a[MILLISECOND])?HOUR:a[MINUTE]<0||a[MINUTE]>59?MINUTE:a[SECOND]<0||a[SECOND]>59?SECOND:a[MILLISECOND]<0||a[MILLISECOND]>999?MILLISECOND:-1,getParsingFlags(E)._overflowDayOfYear&&(r<YEAR||r>DATE)&&(r=DATE),getParsingFlags(E)._overflowWeeks&&-1===r&&(r=WEEK),getParsingFlags(E)._overflowWeekday&&-1===r&&(r=WEEKDAY),getParsingFlags(E).overflow=r),E}