// DATE HELPER FUNCTIONS
export function DateToString(date) {
  return date.toISOString().split('T')[0];
}

export function DateToLocalString(date) {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (month.length == 1) {
    month = `0${month}`;
  }
  if (day.length == 1) {
    day = `0${day}`;
  }
  return `${date.getUTCFullYear()}-${month}-${day}`;
}

export function DateGet12HourTime(date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if (hour > 12) {
    return `${(hour - 12).toString()}:${minutes}PM`;
  }
  return `${hour.toString()}:${minutes}AM`;
}
