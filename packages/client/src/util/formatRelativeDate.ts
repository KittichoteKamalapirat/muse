import moment from "moment";

// set locale globally, not only this function (still don't know how only this one)
moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    ss: "%ss",
    m: "a minute",
    mm: "%dm",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%dd",
    M: "a month",
    MM: "%dM",
    y: "a year",
    yy: "%dY",
  },
});

const formatRelativeDate = (date: Date) => {
  const momentDate = moment(date);
  return momentDate.fromNow(true);
};

export default formatRelativeDate;
