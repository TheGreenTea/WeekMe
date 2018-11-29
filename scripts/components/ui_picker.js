$(document).ready(() => {
  PickerGenerator.init();
});

var PickerGenerator = function() {

  /* Configuration */


  /* Public Methods */

  function init(){

  }

  function createPicker(selected, options){

    let selectables = "";

    for(let i = 0; i < options.length; i++){
      if(i === selected){
          selectables += `<option value="${i}" selected="selected">${options[i]}</option>`;
      } else {
          selectables += `<option value="${i}">${options[i]}</option>`;
      }
    }

    return  `<div class="picker-container">
              <div class="select-wrapper">
                <select class="select">
                  ${selectables}
                </select>
              <span class="select-icon entypo-arrow-combo"></span>
            </div>
          </div>`;
  }

  /* Private Methods */

  let options = ["Stack", "Monday", "Dienstach", "Today", "Kehrwoche", "Putztach", "Geburtstag", "Heiligabend", "Muddatach"]

  function insertPicker($element){
    let newPicker = PickerGenerator.createPicker(3, options);
    if($element.children().length === 0){
      $element.append(newPicker);
    }
  }

  $(document).ready(() => {

    insertPicker($("#pickerPopup"));

    $("#btnPickDay").click(() => {
      $("#newTaskStepOne").modal("hide");
      $("#newTaskStepTwo").modal("show");
    });

    $("#btnBackToEditTask").click(() => {
      $("#newTaskStepTwo").modal("hide");
      $("#newTaskStepOne").modal("show");
    });
  });

  /* Public Interface */

  return {
    init,
    createPicker
  }

}();
