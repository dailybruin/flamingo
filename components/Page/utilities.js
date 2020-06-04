export function date2string(d) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let months = [
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
    "December"
  ];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getYear() + 1900;
  let hour = d.getHours();
  let min = addZero(d.getMinutes());
  let s = month + " " + date + ", " + year + " " + hour + ":" + min;
  return s;
}
