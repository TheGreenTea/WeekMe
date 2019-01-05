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
    let spaceMd = 2;
    let spaceXl = 1;

    return  `<div class="col-${spaceMobile} col-md-${spaceMd} col-xl-${spaceXl} col-weekme">
              <div class="card color-${color}" id="${_id}">
                <div class="card-buttons">
                  <a class="button-edit-task"></a>
                  <a class="button-delete-task"></a>
                </div>
                <div class="card-body align-items-center d-flex justify-content-center"> 
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
