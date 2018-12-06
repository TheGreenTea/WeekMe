$(document).ready(() => {
  TemplateGenerator.init();
});

var TemplateGenerator = function() {


  /* Configuration */


  /* Public Methods */

  function init(){ 

  }

  function getTaskCard(text, _id, color){

    return  `<div class="col-sm-6 col-lg-2">
              <div class="card" id="${_id}">
                <div class="card-buttons">
                  <a class="button-edit-task"></a>
                  <a class="button-delete-task"></a>
                </div>
                <div class="card-body">
                  ${text}
                </div>
              </div>
            </div>`;
  }


  /* Private Methods */




  /* Public Interface */

  return {
    init,
    getTaskCard
  }

}();
