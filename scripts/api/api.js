let api = (function () {
  const baseUrl = 'https://weekme.herokuapp.com';
  //const baseUrl = 'http://localhost:3000';

  const tokenName = "token"

  let saveToken = function (token) {
    const tokenName = "token"
    document.cookie = tokenName + "=" + token + ";" + ";path=/" // + ";"  + "secure=true"
  }

  let loadToken = function () {
    let decodedCookie = decodeURIComponent(document.cookie);
    var properties = decodedCookie.split(';');

    for(var i = 0; i < properties.length; i++) {
      if (properties[i].indexOf(tokenName) == 0) {
        return properties[i].replace(tokenName + "=", '');
      }
    }
  }

  const user = initUser(baseUrl, saveToken);

  let userWrapper = (function (baseUrl) {
    const profile = async (onSuccess) => {
      user.profile(loadToken(), onSuccess)
    }
    const logout =  async (onSuccess) => {
      user.logout(loadToken(), onSuccess)
    }

    return {
      register: user.register,
      login: user.login,
      logout: logout,
      profile: profile
    };
  }(baseUrl));

  const task = initTask(baseUrl);

  let taskWrapper = (function (baseUrl) {

    const openTasks = async (onSuccess) => {
      task.profile(loadToken(), onSuccess);
    }
    const tasks = async (onSuccess) => {
      task.tasks(loadToken(), onSuccess);
    }
    const createTask = async (taskNode, onSuccess) => {
      task.createTask(loadToken(), taskNode, onSuccess);
    }
    const loadTask = async (id, onSuccess) => {
      task.loadTask(loadToken(), id, onSuccess);
    }
    const updateTask = async (id, taskNode, onSuccess) => {
      task.updateTask(loadToken(), id, taskNode, onSuccess);
    }

    return {
      openTasks,
      tasks,
      createTask,
      loadTask,
      updateTask
    };
  }(baseUrl));


  return {
    user: userWrapper,
    task: taskWrapper
  };
}());
