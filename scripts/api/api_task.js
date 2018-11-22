function initTask(baseUrl) {

  return task = (function (baseUrl) {
    const taskBaseUrl = baseUrl + "/tasks"

     // GET /opentasks
     const openTasksUrl = baseUrl + '/opentasks';

     const openTasks = async (xAuthToken, onSuccess) => {
       const settings = {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'x-auth': xAuthToken
             }
       };

       const data = await fetch(openTasksUrl, settings)
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

      // GET /tasks
      const tasksUrl = taskBaseUrl;

      const tasks = async (xAuthToken, onSuccess) => {
        const settings = {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-auth': xAuthToken
              }
        };

        const data = await fetch(tasksUrl, settings)
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

       // POST /tasks
       const createTaskUrl = taskBaseUrl;
       const createTask = async (xAuthToken, task, onSuccess) => {
         const settings = {
               method: 'POST',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'x-auth': xAuthToken
               },
               body: JSON.stringify(task)
         };

         const data = await fetch(createTaskUrl, settings)
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


        // GET /tasks
        const loadTask = async (xAuthToken, id, onSuccess) => {
          const loadTaskUrl = taskBaseUrl + "/" + id;

          const settings = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth': xAuthToken
                },
          };

          const data = await fetch(loadTaskUrl, settings)
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
        openTasks,
        tasks,
        createTask,
        loadTask
      };
  }(baseUrl));
}
