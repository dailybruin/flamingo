export function date2string(d) {
  function addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  var month = months[d.getMonth()]
  var date = d.getDate()
  var hour = d.getHours()
  var min = addZero(d.getMinutes())
  var s = month + ' ' + date + ', ' + hour + ':' + min
  return s
}
