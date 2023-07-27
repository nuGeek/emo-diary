// get current date time in 9 digit
export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };