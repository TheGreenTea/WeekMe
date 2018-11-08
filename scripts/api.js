let api = (function () {
  const baseUrl = 'https://weekme.herokuapp.com';
  //const baseUrl = 'http://localhost:3000';
  var xAuthToken = '';

  // POST /users/login
  const loginBody = { email:'DerTesterMann@example.org', password:'testerMannPW1!' };
  const loginUrl = baseUrl + '/users/login'

  console.log(loginUrl);

  const login = async (onSuccess) => {
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

  // POST /opentasks
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

return {
  login: login,
  getOpenTasks: getOpenTasks
};

}());
