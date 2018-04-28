// DATE HELPER FUNCTIONS
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

export function DateToString(date) {
  return date.toISOString().split("T")[0];
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
  const timeRange = `${DateTo12HourTime(startDate)}-${DateTo12HourTime(
    endDate
  )}`;
  return `${date}, ${timeRange}`;
}

export function FullDateForSession_Words(session) {
  const startDate = new Date(session.startDate);
  const endDate = new Date(session.endDate);
  const dayString = weekday[startDate.getDay()];
  var monthString = month[startDate.getMonth()];
  const timeRange = `${DateTo12HourTime(startDate)}-${DateTo12HourTime(
    endDate
  )}`;
  return `${dayString}, ${monthString} ${startDate.getDate()} @ ${timeRange}`;
}
