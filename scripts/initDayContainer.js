Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

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

function createDateLabel(dateString) {
  if (dateString != null) {
    let label = document.createElement('p')
    label.setAttribute('class', 'date-label')
    label.appendChild(document.createTextNode(dateString));
    return label;
  }
  return null;
}

function createDayLabel(dayName) {
  if (dayName != null) {
    let label = document.createElement('p')
    label.setAttribute('class', 'day-label')
    label.appendChild(document.createTextNode(dayName));
    return label;
  }
  return null;
}

function initDayContainer() {

  for (var i = 0; i < 7; i++) {
      let dayLabel = document.getElementById('day-label-' + i);
      if (dayLabel != null) {
        dayLabel.appendChild(document.createTextNode(getDayName(i)));
      }

      let dateLabel = document.getElementById('date-label-' + i);
      if (dateLabel != null) {
        dateLabel.appendChild(document.createTextNode(getDateString(i)));
      }
  }

  let unassignedLabel = document.getElementById('unassigned-label')
  unassignedLabel.appendChild(document.createTextNode("Unassigned"));
}

initDayContainer();
