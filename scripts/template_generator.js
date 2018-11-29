$(document).ready(() => {
  TemplateGenerator.init();
});

var TemplateGenerator = function() {


  /* Configuration */


  /* Public Methods */

  function init(){

  }

  function getTaskCard(text, color){

    const html=
            `<div class="col-sm-6 col-lg-2">
              <div class="card">
                <div class="card-buttons">
                  <a class="button-edit-task"></a>
                  <a class="button-delete-task"></a>
                </div>
                <div class="card-body">
                  ${text}
                </div>
              </div>
            </div>`;

    return new DOMParser().parseFromString(html, "text/html").childNodes[0]; 
  }


  /* Private Methods */




  /* Public Interface */

  return {
    init,
    getTaskCard
  }

}();
