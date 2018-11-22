let api = (function () {
  const baseUrl = 'https://weekme.herokuapp.com';
  //const baseUrl = 'http://localhost:3000';
  var xAuthToken = '';

  // POST /users/login
  const loginUrl = baseUrl + '/users/login'

  console.log(loginUrl);

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

  // GET /opentasks
  const opentasksUrl = baseUrl + '/opentasks';

  const getOpenTasks = async (onSuccess) => {
    const settings = {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth': xAuthToken
          }
      };

      const data = await fetch(opentasksUrl, settings)
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

// DELETE /users/me/token
const deleteTokenUrl = baseUrl + '/users/me/token';

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

// POST /users/login/
const registerUrl = baseUrl + '/users/';

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

return {
  login: login,
  getOpenTasks: getOpenTasks,
  logout: deleteToken,
  register: register
};

}());
