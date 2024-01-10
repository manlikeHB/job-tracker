const generateAmPmTime = (time) => {
  const [h, min, sec] = time.split(":");

  hr = Number(h) + 1;

  const ampm = hr > 12 ? "pm" : "am";

  let timeString = "";
  if (hr > "12" && hr !== "24") {
    const hrDiff = hr - 12;
    timeString = `${hrDiff}:${min} ${ampm}`;
  } else if (hr === "12") {
    timeString = `12:${min} pm`;
  } else if (hr === "24" || hr === "00") {
    timeString = `12:${min} am`;
  } else {
    timeString = `${hr}:${min} ${ampm}`;
  }

  return timeString;
};

export const readableDateTimeToMySQlDateTime = (dateTime) => {
  let [dayOfWeek, month, day, year, by, time, ampm] = dateTime.split(" ");

  let [h, m, s] = time.split(":");

  if (ampm === "pm") {
    h = h * 1 + 12;
  }

  h = h * 1 + 1;

  time = [h, m, s].join(":");

  const convertedDateTime = new Date([month, day, year, time])
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");

  return convertedDateTime;
};

export const DBDateTimeToReadableString = (dateTime) => {
  const [dayW, M, dayN, year, time] = new Date(dateTime).toString().split(" ");

  const timeString = generateAmPmTime(time);

  const dateString = [dayW, M, dayN, year].join(" ");
  const dateTimeString = `${dateString} by ${timeString}`;

  return dateTimeString;
};

export const convertToMySQLDateTime = (dateString) => {
  const date = new Date(dateString);

  return (mysqlDatetime = date.toISOString().slice(0, 19).replace("T", " "));
};
