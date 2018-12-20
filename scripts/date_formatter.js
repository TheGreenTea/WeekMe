$(document).ready(() => {
  DateFormatter.init();
});

var DateFormatter = function() {


  /* Configuration */


  /* Public Methods */

  function init(){


  }

  function createDateLabel(dayDiff) {

    const dateString = getDateString(dayDiff);

    if (dateString != null) {
      let label = document.createElement('h6')
      label.setAttribute('class', 'date-label')
      label.appendChild(document.createTextNode(dateString));
      return label;
    }
    return null;
  }

  function createDayLabel(dayDiff) {

    const dayName = getDayName(dayDiff);

    if (dayName != null) {
      let label = document.createElement('h6')
      label.setAttribute('class', 'day-label')
      label.appendChild(document.createTextNode(dayName));
      return label;
    }
    return null;
  }

  /* Private Methods */

  function getDateString(dayDiff) {
    let date = new Date()
    if (dayDiff != null) {
      date = date.addDays(dayDiff)
    }
    let dateString = date.toISOString().slice(0, 10);
    return dateString.split("-").reverse().join('.');
  }

  function getDayName(dayDiff) {
    var date = new Date();
    if (dayDiff != null) {
      date = date.addDays(dayDiff)
    }

    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[date.getDay()];
  }


  function getTimeStamp(dayDiff) {
      let now = new Date;
      let utcOriginal = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

      let utcAdapted = utcOriginal.addDays(dayDiff);
      let utcDayTime = Date.UTC(utcAdapted.getUTCFullYear(),utcAdapted.getUTCMonth(), utcAdapted.getUTCDate(), 0, 0, 0, 0);

      return utcDayTime
  }

  function getDayDiff(utcTimestamp) {
    let utcDay = new Date(utcTimestamp).getUTCDate()
    let dayDiff = utcDay - new Date().getUTCDate()

    return dayDiff
  }

  /* Public Interface */

  return {
    init,
    createDayLabel,
    createDateLabel,
    getTimeStamp,
    getDayDiff,
    getDayName
  }

}();




Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
