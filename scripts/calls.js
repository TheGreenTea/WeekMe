const baseUrl = 'https://weekme.herokuapp.com';
//const baseUrl = 'http://localhost:3000';

// POST /users/login

const loginBody = { email:'DerTesterMann@example.org', password:'testerMannPW1!' };
const loginUrl = baseUrl + '/users/login'

console.log(loginUrl);

const login = async () => {
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
           console.log(response)
           console.log(response.headers)

           return response.json()
         })
         .then(json => {
             console.log(json);
             return json;
         })
         .catch(e => {
             return e
         });

     return data;
}

// POST /opentasks

const opentasksUrl = baseUrl + '/opentasks';
const xAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmRiNTM1Zjg3YzNkZDAwMTU0NjQ1OTUiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQxMTAwNDAxfQ.F4IWZjHmsIF81apxhqYezfKYumexkwDlSgMzAapYLOg";


const getOpenTasks = async () => {
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
           console.log(response)
           return response.json()
         })
         .then(json => {
             console.log(json);
             return json;
         })
         .catch(e => {
             return e
         });

     return data;
}

// Execution
login();
getOpenTasks();
