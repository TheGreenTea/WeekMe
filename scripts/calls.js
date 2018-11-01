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
         .then(response => response.json())
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
