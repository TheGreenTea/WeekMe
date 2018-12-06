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

  function createOptions(){
    var day = new Date().getDay();
    let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let options = ["Stack"];
    // If Today: 4 (Thursday)
    // --> Stack / Today / 5 / 6 / 0 / 1 / 2 / 3 /
    for(let i = day, counter = 0; counter < 7; i=(i+1)%7, counter++){
      if(i === day){
        options.push("Today");
      } else {
        options.push(daysOfTheWeek[i]);
      }
    }
    return options;
  }


  function insertPicker($element){

    let options = createOptions();

    let newPicker = PickerGenerator.createPicker(2, options);
    if($element.children().length === 0){
      $element.append(newPicker);
    }
  }

  function createNewTask(){
    $("#newTaskStepOne").modal("show");
    $('#btnDay').hide();
    $('#btnToday').show();
    $('#modalHeadlineStepOne').html("Create new task");
  }

  function createNewTaskAtDay(day){
    $("#newTaskStepOne").modal("show");
    $('#btnToday').hide();
    $('#btnDay').show();
    $('#modalHeadlineStepOne').html("Create new task");
  }

  function editTask($element, description, day, color){
    $("#newTaskStepOne").modal("show");
    $('.new-task-textarea').val(description);
    $('#modalHeadlineStepOne').html("Edit existing task");
    $('#btnToday').hide();
    $('#btnDay').show();
  }

  function calculatePickedDay(){

    var day = new Date().getDay();
    let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // null = stack oder newTask
    // 0 = heute (Montag)
    // 4 = Freitag
    let pickedDay = (day+4)%7;
    return pickedDay;
  }

  function confirmTask($element, description, day, color){
    let pickedDay = calculatePickedDay();
    alert(pickedDay);
  }

  $(document).ready(() => {

    var taskDescription = "";
    insertPicker($("#pickerPopup"));

    $("#btnNewTask").click(() => {
      createNewTask();
    });

    $("#btnNewTaskDay").click(() => {
      let day = 4;
      createNewTaskAtDay(day);
    });

    $("#btnEditTaskDay").click(() => {
      let description = "Schon existierender Task, der editiert werden kann";
      let $element = "";
      let day = 4;
      let color = 5;
      editTask(description, $element, day, color);
    });

    $("#btnChangeColor").click(() => {
      alert("Color picker");
    });

    $("#btnPickDay").click(() => {
      $("#newTaskStepOne").modal("hide");
      $("#newTaskStepTwo").modal("show");
    });

    $("#btnBackToEditTask").click(() => {
      $("#newTaskStepTwo").modal("hide");
      $("#newTaskStepOne").modal("show");
      $('.new-task-textarea').val(taskDescription);
    });

    $("#newTaskStepOne").on('hidden.bs.modal', function () {
      taskDescription = $('.new-task-textarea').val();
      $('.new-task-textarea').val("");
    });

    $("#btnConfirmTask").click(() => {
      $("#newTaskStepTwo").modal("hide");
      confirmTask("","","","");
    });
  });

  /* Public Interface */

  return {
    init,
    createPicker
  }

}();
