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
      item.setAttribute('id', 'stack-item-' + task._id);
      let frame = eval(task.frame)
      let x = frame[0];
      let y = frame[1];
      let width = frame[2];
      let height = frame[3];
      grid.addWidget(item, x, y, width, height);

      let itemContent = document.createElement('div');
      itemContent.setAttribute('class', 'grid-stack-item-content');
      itemContent.setAttribute('id', 'stack-item-content-' + task._id);
      itemContent.appendChild(taskNode);
      item.appendChild(itemContent);
    })
  })
}

let addTasks = function (tasks) {
  console.log("Loaded tasks")
  for (var i = 0; i < tasks.length; i++) {
    addTask(tasks[i]);
  }
}

function onCreationSuccess(json) {
  console.log("created");
  console.log(json);
}

function onTaskLoadSuccess(json) {
  console.log("Loaded task by id");
  console.log(json);
}

function onTaskUpdateSuccess(json) {
  console.log("Updated task");
  console.log(json);
}

let onLogin = function (json) {
  //api.task.tasks(addTasks);
  //api.user.profile(onProfile);

  /*
  console.log("Logged in");
  let task = {
    content: "Geiler Content!",
    frame: "[1,1]",
    dueAt: "1542891118231",
    color: "2",
    reoccuring: "false"
  };

  api.task.createTask(task, onCreationSuccess);
  */

  let task = {
    content: "Upgedateter viel Geilerer Content",
    frame: "[10,1]",
    dueAt: "1542891118031",
    color: "4",
    reoccuring: "true"
  };

  api.task.updateTask("5bf6d5368dbe3d0015ae5215", task, onTaskUpdateSuccess);
}

let onLogout = function () {
  console.log("Logged out");
}

function onProfile(json) {
  console.log("profile: " + json)
}

function onRegister(json) {
  console.log("Registered");
  console.log(json);
}

//api.user.register("fas@tesddt.com", "fancyPassword", onRegister);
api.user.login("dudesies@example.com", "abc123!", onLogin);


//Load mocked:
//let mockedJSONResponse = JSON.parse('{ "tasks": [ { "day": null, "done": false, "doneAt": null, "_id": "5bdb4d9087c3dd0015464588", "content": "CLOSED", "frame": "[4,4,2,2]", "_user": "5bdb20da7dd3e700154b6f22", "__v": 0 }, { "day": 5, "done": false, "doneAt": null, "_id": "5bdb4dbe87c3dd0015464589", "content": "UPDATED BABY", "frame": "[1,2,2,2]", "_user": "5bdb20da7dd3e700154b6f22", "__v": 0 } ] }');
//onSuccess(mockedJSONResponse)
