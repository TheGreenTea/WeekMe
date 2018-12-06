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

        // GET /tasks/id
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

         // PATCH /tasks/id
         const updateTask = async (xAuthToken, id, task, onSuccess) => {
           const updateTaskUrl = taskBaseUrl + "/" + id;
           const settings = {
                 method: 'PATCH',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                     'x-auth': xAuthToken
                 },
                 body: JSON.stringify(task)
           };

           const data = await fetch(updateTaskUrl, settings)
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

          // DELETE /tasks/id
          const deleteTask = async (xAuthToken, id, onSuccess) => {
            const deleteTaskUrl = taskBaseUrl + "/" + id;
            const settings = {
                  method: 'DELETE',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'x-auth': xAuthToken
                  }
            };


            const data = await fetch(deleteTaskUrl, settings)
                 .then(response => {
                   return response.json()
                 })
                 .then(json => {
                   onSuccess();
                   return json;
                 })
                 .catch(e => {
                     console.log("error: " + e);
                     return e
                 });

             return data;
           }

      return {
        open: openTasks,
        all: tasks,
        create: createTask,
        load: loadTask,
        update: updateTask,
        delete: deleteTask
      };
  }(baseUrl));
}
