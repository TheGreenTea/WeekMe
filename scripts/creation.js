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
    taskNode.setAttribute('class', 'task')

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

let mockedJSONResponse = '{ "tasks": [ { "day": null, "done": false, "doneAt": null, "_id": "5bd9a150a427790015eea2d5", "content": "Do some testing maybe?", "_user": "5bd2ebf9e5ccfb00150fb2ed", "__v": 0 }, { "day": null, "done": false, "doneAt": null, "_id": "5bd9a167a427790015eea2d6", "content": "Crazy how many awesome content", "_user": "5bd2ebf9e5ccfb00150fb2ed", "__v": 0}] }'
let mockedTasks = JSON.parse(mockedJSONResponse)['tasks'];

var data = mockedTasks.map(function(data) {
  data.id = data._id
  return data
});

let taskNode = createTask(data[0]);

function gridIdForDay(day) {
  let id = "grid-" + day
  return id
}
let gridId = gridIdForDay(data[0].day)
console.log(gridId)
$(function() {
  $('#'+gridId).each(function () {
    let grid = $(this).data('gridstack');
    let element = document.createElement('div');
    element.setAttribute('class', 'grid-stack-item-content');

    grid.addWidget(element, 0, 0, 2, 2);
    element.appendChild(taskNode);
  })
/*


  var items = [
      {x: 0, y: 0, width: 2, height: 2, autoPosition: true},
      {x: 3, y: 1, width: 1, height: 2},
      //{x: 4, y: 1, width: 1, height: 1},
      //{x: 2, y: 3, width: 3, height: 1},
      //{x: 2, y: 5, width: 1, height: 1}
  ];

  $('.grid-stack').each(function () {
      var grid = $(this).data('gridstack');
      console.log("pasdlals" + grid)
      _.each(items, function (node) {
          grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
              node.x, node.y, node.width, node.height);
      }, this);
  });
  */
})
