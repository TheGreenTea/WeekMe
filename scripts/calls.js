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
           console.log("Login response:")
           console.log(response)

           console.log("response.headers object:")
           console.log(response.headers)

           console.log("X-Auth header:")
           console.log(response.headers.get('X-Auth'))

           console.log("All headers:")
           console.log(Array.from(response.headers))

           return response.json()
         })
         .then(json => {
             return json;
         })
         .catch(e => {
             return e
         });

     return data;
}

// POST /opentasks

const opentasksUrl = baseUrl + '/opentasks';
const xAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmRiMjBkYTdkZDNlNzAwMTU0YjZmMjIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQxMjUxMjQ0fQ.6nhOCgKCFobpi281pYnae7YFeOjN1K-HV0K7cEh5InE";

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

     return data;
}

// Execution
login();
