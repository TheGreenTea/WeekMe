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

function createTaskNode(task) {
    let taskNode = document.createElement('div')
    if (task._id != null) {
      taskNode.setAttribute('id', 'task-' + task._id);
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
  if (task._id != null) {
    menuBar.setAttribute('id', 'task-menu-bar-' + task._id);

    let editButton = createButton(" Edit", "glyphicon-edit", "edit-button-" + task._id, 'edit-button btn btn-default');
    let doneButton = createButton(" Done", "glyphicon-check", "done-button-" + task._id, 'edit-button btn btn-info btn-default');

    menuBar.appendChild(editButton);
    menuBar.appendChild(doneButton);
  }
  menuBar.setAttribute('class', 'task-menu-bar');

  return menuBar;
}

function createTextContainer(task) {
  let textContainer = document.createElement('div');
  if (task._id != null) {
    textContainer.setAttribute('id', 'task-text-container-' + task._id);
  }
  textContainer.setAttribute('class', 'task-text-container');

  if (task.content != null) {
    let text = document.createElement('p');
    text.appendChild(document.createTextNode(task.content));
    textContainer.appendChild(text);
  }
  return textContainer;
}

function addTask(task) {
  let taskNode = createTaskNode(task);

  $(function() {
    $('#grid-' + task.day).each(function () {
      let grid = $(this).data('gridstack');

      let item = document.createElement('div');

      let frame = eval(task.frame)
      let x = frame[0];
      let y = frame[1];
      let width = frame[2];
      let height = frame[3];
      grid.addWidget(item, x, y, width, height);

      let itemContent = document.createElement('div');
      itemContent.setAttribute('class', 'grid-stack-item-content');
      itemContent.appendChild(taskNode);
      item.appendChild(itemContent);
    })
  })
}

let mockedJSONResponse = '{ "tasks": [ { "day": null, "done": false, "doneAt": null, "_id": "5bdb4d9087c3dd0015464588", "content": "CLOSED", "frame": "[4,4,2,2]", "_user": "5bdb20da7dd3e700154b6f22", "__v": 0 }, { "day": 5, "done": false, "doneAt": null, "_id": "5bdb4dbe87c3dd0015464589", "content": "UPDATED BABY", "frame": "[1,2,2,2]", "_user": "5bdb20da7dd3e700154b6f22", "__v": 0 } ] }'
let mockedTasks = JSON.parse(mockedJSONResponse)['tasks'];

for (var i = 0; i < mockedTasks.length; i++) {
  addTask(mockedTasks[i])
}
