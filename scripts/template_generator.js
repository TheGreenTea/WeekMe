$(document).ready(() => {
  TemplateGenerator.init();
});

var TemplateGenerator = function() {


  /* Configuration */


  /* Public Methods */

  function init(){

  }

  function getTaskCard(text, _id, color) {

    let spaceMobile = 6;
    let spaceDesktop = 2;

    return  `<div class="col-${spaceMobile} col-md-${spaceDesktop}">
              <div class="card color-${color}" id="${_id}">
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
