let api = (function () {
  //const baseUrl = 'https://192.168.178.20:3000/weekme'
  const baseUrl = 'https://weekme.herokuapp.com';
  // const baseUrl = 'http://localhost:3000';

  const tokenName = "token"

  let saveToken = function (token) {
    if (token == null) {
      document.cookie = tokenName + "=;"  // + "secure=true"
    } else {
      document.cookie = tokenName + "=" + token + ";"  // + "secure=true"
    }
  }
  
  let loadToken = function () {
    let decodedCookie = decodeURIComponent(document.cookie);
    var properties = decodedCookie.split(';');

    for(var i = 0; i < properties.length; i++) {
      if (properties[i].trim().indexOf(tokenName) == 0) {
        return properties[i].replace(tokenName + "=", '');
      }
    }
  }
  const user = initUser(baseUrl, saveToken);

  let userWrapper = (function (baseUrl) {
    const profile = async (onSuccess) => {
      user.profile(loadToken(), onSuccess)
    }
    const logout = async (onSuccess) => {
      user.logout(loadToken(), onSuccess)
    }
    const loggedIn = () => {
      let token = loadToken()
      console.log(token);

      return token ? true: false;
    }

    return {
      register: user.register,
      login: user.login,
      requestPasswordReset: user.requestPasswordReset,
      reset: user.reset,
      logout: logout,
      profile: profile,
      loggedIn: loggedIn
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
    const remove = async (id, onSuccess) => {
      task.delete(loadToken(), id, onSuccess);
    }

    return {
      open,
      all,
      create,
      load,
      update,
      remove
    };
  }(baseUrl));

  return {
    user: userWrapper,
    task: taskWrapper
  };
}());
