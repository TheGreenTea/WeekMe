function initTask(baseUrl, xAuthToken) {
  console.log("init task using " + baseUrl)
  return task = (function (baseUrl, xAuthToken) {
    // GET /opentasks
    const opentasksUrl = baseUrl + '/opentasks';
    console.log("optentaskUrl: " + opentasksUrl)

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

     return {
       getOpenTasks,
     };
  }(baseUrl, xAuthToken));
}
