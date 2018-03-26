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

export function DateToLocalStringReverse(date) {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (month.length == 1) {
    month = `0${month}`;
  }
  if (day.length == 1) {
    day = `0${day}`;
  }
  return `${month}-${day}-${date.getUTCFullYear()}`;
}

export function DateTo12HourTime(date) {
  const hour = date.getHours();
  let minutes = date.getMinutes();
  const minutesStr = minutes.toString();
  minutes = minutesStr.length === 1 ? `0${minutes}` : minutes;
  if (hour > 12) {
    return `${(hour - 12).toString()}:${minutes}PM`;
  }
  return `${hour.toString()}:${minutes}AM`;
}

export function FullDateForSession(session) {
  const startDate = new Date(session.startDate);
  const endDate = new Date(session.endDate);
  const date = DateToLocalStringReverse(startDate);
  const timeRange = `${DateTo12HourTime(startDate)}-${DateTo12HourTime(endDate)}`;
  return `${date}, ${timeRange}`;
}
