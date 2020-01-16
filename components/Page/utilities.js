export function date2string(d) {
  function addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  var month = months[d.getMonth()]
  var date = d.getDate()
  var year = d.getYear() + 1900
  var hour = d.getHours()
  var min = addZero(d.getMinutes())
  var s = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min
  return s
}
