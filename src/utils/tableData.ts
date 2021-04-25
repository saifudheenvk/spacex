export const getTagStyle = (status: boolean) => {
  let tag: string;
  let color: string;
  let background: string;
  if (status) {
    tag = "Success";
    color = "#03543F";
    background = "#DEF7EC";
  } else if (status !== null) {
    tag = "Failed";
    color = "#92400F";
    background = "#FDE2E1";
  } else {
    tag = "Upcoming";
    color = "#92400F";
    background = "#FEF3C7";
  }
  return { tag, color, background };
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getTimeString = (date: Date) => {
  return ` ${
    date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours()
  }:${
    date.getUTCMinutes() < 10
      ? "0" + date.getUTCMinutes()
      : date.getUTCMinutes()
  }`;
};

export const toDateString = (date: Date, withTime: boolean) => {
  return `${
    date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate()
  } ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${
    withTime ? getTimeString(date) : ""
  }`;
};
