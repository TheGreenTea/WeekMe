let api = (function () {
  //const baseUrl = 'https://192.168.178.20:3000/weekme'
  const baseUrl = 'https://weekmeapi.herokuapp.com';
  // const baseUrl = 'http://localhost:3000';

  const common = initCommon();
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
    const profile = async (onSuccess, onFailure) => {
      user.profile(loadToken(), onSuccess, onFailure)
    }
    const logout = async (onSuccess, onFailure) => {
      user.logout(loadToken(), onSuccess, onFailure)
    }
    const loggedIn = () => {
      let token = loadToken()
      console.log(token);

      return token ? true: false;
    }
    const updateEmail = async (password, email, onSuccess, onFailure) => {
      user.updateEmail(loadToken(), password, email, onSuccess, onFailure)
    }
    const updatePassword = async (currentPassword, newPassword, onSuccess, onFailure) => {
      user.updatePassword(loadToken(), currentPassword, newPassword, onSuccess, onFailure)
    }

    return {
      register: user.register,
      login: user.login,
      requestPasswordReset: user.requestPasswordReset,
      reset: user.reset,
      updatePassword: updatePassword,
      updateEmail: updateEmail,
      logout: logout,
      profile: profile,
      loggedIn: loggedIn
    };
  }(baseUrl));

  const task = initTask(baseUrl);

  let taskWrapper = (function (baseUrl) {

    const open = async (onSuccess, onFailure) => {
      task.open(loadToken(), onSuccess, onFailure);
    }
    const all = async (onSuccess, onFailure) => {
      task.all(loadToken(), onSuccess, onFailure);
    }
    const create = async (taskNode, onSuccess, onFailure) => {
      task.create(loadToken(), taskNode, onSuccess, onFailure);
    }
    const load = async (id, onSuccess, onFailure) => {
      task.load(loadToken(), id, onSuccess, onFailure);
    }
    const update = async (id, taskNode, onSuccess, onFailure) => {
      task.update(loadToken(), id, taskNode, onSuccess, onFailure);
    }
    const remove = async (id, onSuccess, onFailure) => {
      task.delete(loadToken(), id, onSuccess, onFailure);
    }
    const updatePosition = async (id, dueAt, position, onSuccess, onFailure) => {
      task.updatePosition(loadToken(), id, dueAt, position, onSuccess, onFailure);
    }

    return {
      open,
      all,
      create,
      load,
      update,
      remove,
      updatePosition
    };
  }(baseUrl));

  return {
    user: userWrapper,
    task: taskWrapper
  };
}());
