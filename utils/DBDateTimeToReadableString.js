const generateAmPmTime = (time) => {
  const [hr, min, sec] = time.split(":");

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

const DBDateTimeToReadableString = (dateTime) => {
  const [dayW, M, dayN, year, time] = new Date(dateTime).toString().split(" ");

  const timeString = generateAmPmTime(time);

  const dateString = [dayW, M, dayN, year].join(" ");
  const dateTimeString = `${dateString} by ${timeString}`;

  return dateTimeString;
};

module.exports = DBDateTimeToReadableString;
