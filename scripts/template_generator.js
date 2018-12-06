$(document).ready(() => {
  TemplateGenerator.init();
});

var TemplateGenerator = function() {


  /* Configuration */


  /* Public Methods */

  function init(){

  }

  function getAddButton(id, size, color) {
    return `<div class="add-day-button">
              <span id="${id}", class="add-day-icon fa-stack fa-lg">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-plus fa-stack-1x fa-inverse"></i>
              </span>
            </div>`;
  }

  function getTaskCard(text, _id, color) {

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
    getTaskCard,
    getAddButton
  }

}();
