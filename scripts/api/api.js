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

    const open = async (onSuccess) => {
      task.open(loadToken(), onSuccess);
    }
    const all = async (onSuccess) => {
      task.all(loadToken(), onSuccess);
    }
    const create = async (taskNode, onSuccess) => {
      task.create(loadToken(), taskNode, onSuccess);
    }
    const load = async (id, onSuccess) => {
      task.load(loadToken(), id, onSuccess);
    }
    const update = async (id, taskNode, onSuccess) => {
      task.update(loadToken(), id, taskNode, onSuccess);
    }
    const delete = async (id, onSuccess) => {
      task.delete(loadToken(), id, onSuccess);
    }

    return {
      open,
      all,
      create,
      load,
      update,
      delete
    };
  }(baseUrl));


  return {
    user: userWrapper,
    task: taskWrapper
  };
}());
