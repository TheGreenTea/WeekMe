function initUser(baseUrl, saveToken) {
  return user = (function (baseUrl) {
    const userBaseUrl = baseUrl + '/users';
    let saveTokenFromHeader = function(data) {
      let token = data.headers.get('X-Auth');
      saveToken(token)
    }
    let deleteTokenFunc = function() {
      saveToken(null);
    }

    // POST /users/
    const registerUrl = userBaseUrl
    const register = async (email, password, onSuccess, onFailure) => {
      const body = { email: email, password: password };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        common.expectJsonCall(registerUrl, settings, saveTokenFromHeader, onSuccess, onFailure)
    }

    // POST /users/login
    const loginUrl = userBaseUrl + '/login'

    const login = async (email, password, onSuccess, onFailure) => {

      const body = { email: email, password: password };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
      };

      common.expectJsonCall(loginUrl, settings, saveTokenFromHeader, onSuccess, onFailure)
    }
    // DELETE /users/me/token
    const deleteTokenUrl = userBaseUrl + '/me/token';

    const deleteToken = async (xAuthToken, onSuccess, onFailure) => {
      const settings = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth': xAuthToken
            }
        };

        common.expectEmptyResponseCall(deleteTokenUrl, settings, deleteTokenFunc, onSuccess, onFailure);
    }

    // GET /users/me
    const profileUrl = userBaseUrl + '/me';

    const profile = async (xAuthToken, onSuccess, onFailure) => {
      const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth': xAuthToken
            }
        };

      common.expectJsonCall(profileUrl, settings, null, onSuccess, onFailure)
    }

    // POST /users/resetpassword
    const requestResetUrl = userBaseUrl + '/resetpassword';

    const requestReset = async (email, onSuccess, onFailure) => {
      const body = { email: email };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        common.expectEmptyResponseCall(requestResetUrl, settings, null, onSuccess, onFailure);
    }

    // POST /users/me/resetpassword
    const resetUrl = userBaseUrl + '/newpassword';

    const reset = async (resetcode, password, onSuccess, onFailure) => {
      const body = { password: password, resetcode: resetcode };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        common.expectEmptyResponseCall(resetUrl, settings, null, onSuccess, onFailure);
    }

    return {
      login,
      logout: deleteToken,
      register,
      profile,
      requestPasswordReset: requestReset,
      reset: reset
    };
  }(baseUrl));
}
