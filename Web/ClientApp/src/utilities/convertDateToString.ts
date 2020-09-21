const prependZero = (n: number): string | number => (n < 10 ? `0${n}` : n);

const convertDateToString = (date = new Date()): string => {
  return `${prependZero(date.getHours())}:${prependZero(
    date.getMinutes()
  )} ${date.getFullYear()}-${prependZero(date.getMonth() + 1)}-${prependZero(
    date.getDate()
  )}`;
};

export default convertDateToString;
