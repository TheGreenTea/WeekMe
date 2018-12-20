function initUser(baseUrl, saveToken) {
  return user = (function (baseUrl) {
    const userBaseUrl = baseUrl + '/users';
    const common = initCommon();
    let saveTokenFromHeader = function(data) {
      let token = data.headers.get('X-Auth');
      saveToken(token)
    }

    // POST /users/
    const registerUrl = userBaseUrl
    const register = async (email, password, onSuccess) => {
      const registerBody = { email: email, password: password };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerBody)
        };

        const data = await fetch(registerUrl, settings)
             .then(response => {
               let token = response.headers.get('X-Auth');
               saveToken(token)
               //console.log("saved token: " + token + " -- on register")
               return response.json()
             })
             .then(json => {
               onSuccess(json)
               return json;
             })
             .catch(e => {
                console.log("error: " + e);
                return e
             });

         return data;
    }

    // POST /users/login
    const loginUrl = userBaseUrl + '/login'

    const login = async (email, password, onSuccess, onFailure) => {

      const loginBody = { email: email, password: password };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody)
      };

      common.expectJsonCall(loginUrl, settings, saveTokenFromHeader, onSuccess, onFailure)
    }
    // DELETE /users/me/token
    const deleteTokenUrl = userBaseUrl + '/me/token';

    const deleteToken = async (xAuthToken, onSuccess) => {
      const settings = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth': xAuthToken
            }
        };

        const data = await fetch(deleteTokenUrl, settings)
             .then(response => {
               saveToken(null);
               onSuccess();
               return response.json()
             })
             .catch(e => {
               console.log("error: " + e);
               return e
             });

         return data;
    }

/*
    // GET /users/me
    const profileUrl = userBaseUrl + '/me';

    const profile = async (xAuthToken, onSuccess) => {
      const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth': xAuthToken
            }
        };

        const data = await fetch(profileUrl, settings)
             .then(response => {
               return response.json()
             })
             .then(json => {
               onSuccess(json)
               return json;
             })
             .catch(e => {
                console.log("error: " + e);
                return e
             });

         return data;
    }
*/

    // GET /users/me
    const profileUrl = userBaseUrl + '/me';

    const profile = async (xAuthToken, onSuccess) => {
      const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
          const data = await fetch(profileUrl, settings);
          if(data.status == 200) {
            let json = await data.json();
            onSuccess(json);
          } else {
            console.log("Error status:", data.status)
            console.log(data);
          }
        }
        catch (e){
          console.log("error:", e);
        }
    }

    // POST /users/resetpassword
    const requestResetUrl = userBaseUrl + '/resetpassword';

    const requestReset = async (email, onSuccess) => {
      const requestResetBody = { email: email };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestResetBody)
        };

        const data = await fetch(requestResetUrl, settings)
             .then(response => {
               onSuccess();
               return response.json()
             })
             .catch(e => {
               console.log("error: " + e);
               return e
             });

         return data;
    }

    // POST /users/me/resetpassword
    const resetUrl = userBaseUrl + '/newpassword';

    const reset = async (resetcode, password, onSuccess) => {
      const resetBody = { password: password, resetcode: resetcode };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resetBody)
        };

        const data = await fetch(resetUrl, settings)
             .then(response => {
               onSuccess();
               return response.json()
             })
             .catch(e => {
               console.log("error: " + e);
               return e
             });

         return data;
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
