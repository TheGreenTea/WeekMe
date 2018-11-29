function initUser(baseUrl, saveToken) {
  return user = (function (baseUrl) {
    const userBaseUrl = baseUrl + '/users';
    console.log(userBaseUrl)

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

    const login = async (email, password, onSuccess) => {

      const loginBody = { email: email, password: password };
      const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody)
      };

      const data = await fetch(loginUrl, settings)
             .then(response => {
               let token = response.headers.get('X-Auth');
               saveToken(token)
               //console.log("saved token: " + token + " -- on login")
               return response.json();
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
               return response.json()
             })
             .then(json => {
               saveToken(null);
               onSuccess()
               return json;
             })
             .catch(e => {
               console.log("error: " + e);
               return e
             });

         return data;
    }

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

    // POST /users/resetpassword
    const resetUrl = userBaseUrl + '/resetpassword';

    const reset = async (email, onSuccess) => {
      const resetBody = { email: email };
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

    return {
      login,
      logout: deleteToken,
      register,
      profile,
      requestPasswordReset: reset
    };
  }(baseUrl));

}
