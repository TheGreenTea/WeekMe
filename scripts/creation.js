

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
  weekday[0] =  "Sunday";
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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function createButton(title, glyphicon, id, customClass) {
  let button = document.createElement('button');
  if (id != null) {
    button.setAttribute('id', id);
  }
  if (customClass != null) {
    button.setAttribute('class', customClass);
  } else {
    button.setAttribute('class', 'btn btn-default');
  }

  let glyph = document.createElement('span');
  if (glyphicon != null) {
    glyph.setAttribute('class', 'glyphicon ' + glyphicon);
    button.appendChild(glyph);
  }
  if (title != null) {
    button.appendChild(document.createTextNode(title));
  }
  return button;
}

function createTask(task) {
    let taskNode = document.createElement('div')
    if (task.id != null) {
      taskNode.setAttribute('id', 'task-' + task.id);
    }
    taskNode.setAttribute('class', 'task grid-stack-item-content ui-draggable-handle')

    let menuBar = createTaskMenuBar(task);
    taskNode.appendChild(menuBar);

    let textContainer = createTextContainer(task);
    taskNode.appendChild(textContainer);

    return taskNode;
}

function createTaskMenuBar(task) {
  let menuBar = document.createElement('div');
  if (task.id != null) {
    menuBar.setAttribute('id', 'task-menu-bar-' + task.id);

    let editButton = createButton(" Edit", "glyphicon-edit", "edit-button-" + task.id, 'edit-button btn btn-default');
    let doneButton = createButton(" Done", "glyphicon-check", "done-button-" + task.id, 'edit-button btn btn-info btn-default');

    menuBar.appendChild(editButton);
    menuBar.appendChild(doneButton);
  }
  menuBar.setAttribute('class', 'task-menu-bar');

  return menuBar;
}

function createTextContainer(task) {
  let textContainer = document.createElement('div');
  if (task.id != null) {
    textContainer.setAttribute('id', 'task-text-container-' + task.id);
  }
  textContainer.setAttribute('class', 'task-text-container');

  if (task.content != null) {
    let text = document.createElement('p');
    text.appendChild(document.createTextNode(task.content));
    textContainer.appendChild(text);
  }
  return textContainer;
}

function enrichDayContainer() {
  let dayContainer = document.getElementsByClassName('grid-stack grid-stack-6');
  console.log(dayContainer)

  for (var i = 0; i < dayContainer.length; i++) {
      console.log(dayContainer[i]); //second console output
      dayContainer[i].setAttribute('id', "grid-" + (i+1) )

      let dayLabel = createDayLabel(getDayName(i));
      dayContainer[i].appendChild(dayLabel);

      let dateLabel = createDateLabel(getDateString(i));
      dayContainer[i].appendChild(dateLabel);
  }
}


enrichDayContainer();




let mockedJSONResponse = '{ "tasks": [ { "day": null, "done": false, "doneAt": null, "_id": "5bd9a150a427790015eea2d5", "content": "Do some testing maybe?", "_user": "5bd2ebf9e5ccfb00150fb2ed", "__v": 0 }, { "day": null, "done": false, "doneAt": null, "_id": "5bd9a167a427790015eea2d6", "content": "Crazy how many awesome content", "_user": "5bd2ebf9e5ccfb00150fb2ed", "__v": 0}] }'
let mockedTasks = JSON.parse(mockedJSONResponse)['tasks'];

var data = mockedTasks.map(function(data) {
  data.id = data._id
  return data
});

let taskNode = createTask(data[0]);
let grid1 = document.getElementById('grid-1');
grid1.appendChild(taskNode);
