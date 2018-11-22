let xAuthToken = ""

let api = (function () {
  const baseUrl = 'https://weekme.herokuapp.com';
  //const baseUrl = 'http://localhost:3000';
  const user = initUser(baseUrl);
  const task = initTask(baseUrl, xAuthToken)
  return {
    user: user,
    task: task
  };
}());
