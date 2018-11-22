function initUser(baseUrl) {
  console.log("init user using " + baseUrl)
  return user = (function (baseUrl) {
    const userBaseUrl = baseUrl + '/users';
    console.log(userBaseUrl)

    // POST /users/login/
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
               return response.json()
             })
             .then(json => {
               onSuccess(json)
               return json;
             })
             .catch(e => {
                 return e
             });

         return data
    ;}

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
               xAuthToken = response.headers.get('X-Auth');
               console.log(xAuthToken);
               return response.json();
             })
             .then(json => {
                 onSuccess(json, xAuthToken)
                 return json;
             })
             .catch(e => {
                 return e
             });

         return data;
    }

    // DELETE /users/me/token
    const deleteTokenUrl = userBaseUrl + '/me/token';

    const deleteToken = async (onSuccess) => {
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
               onSuccess()
               return json;
             })
             .catch(e => {
                 return e
             });

         return data
    ;}

    return {
      login,
      logout: deleteToken,
      register
    };
  }(baseUrl));

}
