function initTask(baseUrl) {

  return task = (function (baseUrl) {
    const taskBaseUrl = baseUrl + "/tasks"

     // GET /opentasks
     const openTasksUrl = baseUrl + '/opentasks';

     const openTasks = async (xAuthToken, onSuccess, onFailure) => {
       const settings = {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'x-auth': xAuthToken
             }
       };

       common.expectJsonCall(openTasksUrl, settings, null, onSuccess, onFailure);
      }

      // GET /tasks
      const tasksUrl = taskBaseUrl;

      const tasks = async (xAuthToken, onSuccess, onFailure) => {
        const settings = {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-auth': xAuthToken
              }
        };

        common.expectJsonCall(tasksUrl, settings, null, onSuccess, onFailure);
       }

       // POST /tasks
       const createTaskUrl = taskBaseUrl;
       const createTask = async (xAuthToken, task, onSuccess, onFailure) => {
         const settings = {
               method: 'POST',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'x-auth': xAuthToken
               },
               body: JSON.stringify(task)
         };

         common.expectJsonCall(createTaskUrl, settings, null, onSuccess, onFailure);
        }

        // GET /tasks/id
        const loadTask = async (xAuthToken, id, onSuccess, onFailure) => {
          const loadTaskUrl = taskBaseUrl + "/" + id;

          const settings = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth': xAuthToken
                },
          };

          common.expectJsonCall(loadTaskUrl, settings, null, onSuccess, onFailure);
         }

         // PATCH /tasks/id
         const updateTask = async (xAuthToken, id, task, onSuccess, onFailure) => {
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

           common.expectJsonCall(updateTaskUrl, settings, null, onSuccess, onFailure);
         }

          // DELETE /tasks/id
          const deleteTask = async (xAuthToken, id, onSuccess, onFailure) => {
            const deleteTaskUrl = taskBaseUrl + "/" + id;
            const settings = {
                  method: 'DELETE',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'x-auth': xAuthToken
                  }
            };

            common.expectEmptyResponseCall(deleteTaskUrl, settings, null, onSuccess, onFailure);
          }

         // PATCH /taskposition
         const taskPositionUrl = baseUrl + '/taskposition'

         const updatePosition = async (xAuthToken, id, dueAt, position, onSuccess, onFailure) => {
           const body = { id: id, dueAt: dueAt, position: position};
           const settings = {
                 method: 'PATCH',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                     'x-auth': xAuthToken
                 },
                 body: JSON.stringify(body)
           };

           common.expectEmptyResponseCall(taskPositionUrl, settings, null, onSuccess, onFailure);
         }

      return {
        open: openTasks,
        all: tasks,
        create: createTask,
        load: loadTask,
        update: updateTask,
        delete: deleteTask,
        updatePosition: updatePosition
      };
  }(baseUrl));
}
