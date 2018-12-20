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
      if(i === 0){
          selectables += `<option value="stack">${options[i]}</option>`;
      } else if(i === selected){
          selectables += `<option value="${i-1}" selected="selected">${options[i]}</option>`;
      } else {
          selectables += `<option value="${i-1}">${options[i]}</option>`;
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
    // --> options: Stack / Today / 5 / 6 / 0 / 1 / 2 / 3 /
    for(let i = day, counter = 0; counter < 7; i=(i+1)%7, counter++){
      if(i === day){
        options.push("Today");
      } else {
        options.push(daysOfTheWeek[i]);
      }
    }
    return options;
  }


  function showPicker(day = null, task = {}){
    
  }


  function insertPicker($element){

    let options = createOptions();
    let newPicker = PickerGenerator.createPicker(2, options);



    $element.append(newPicker);


    createNewTaskAtDay(1);
  }

  function createNewTask(){
    $("#newTaskStepOne").modal("show");
    $('#btnToday').show();
    $('#btnStack').show();
    $('#btnDone').hide();
    $('#modalHeadlineStepOne').html("Create new task");
  }

  function createNewTaskAtDay(day){
    $("#newTaskStepOne").modal("show");
    $('#btnToday').hide();
    $('#btnStack').hide();
    $('#btnDone').show();
    $('#modalHeadlineStepOne').html("Create new task");
  }

  function editTask($element, description, day, color){
    $("#newTaskStepOne").modal("show");
    $('.new-task-textarea').val(description);
    $('#modalHeadlineStepOne').html("Edit existing task");
    $('#btnToday').hide();
    $('#btnStack').hide();
    $('#btnDone').show();
  }

  function confirmTask($element, description, day, color){
    console.log("Text: " + description + " - At day: " + day);
  }

  function resetDayPicker(){
    $('.picker-container').remove();
    insertPicker($("#pickerPopup"));
  }

  function closeColorPicker(taskDescription){
    $("#newTaskColorPicker").modal("hide");
    $("#newTaskStepOne").modal("show");
    $('.new-task-textarea').val(taskDescription);
  }

  function checkIfColorShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown){
    if(!isStepOneShown && !isStepTwoShown && !isColorPickerShown){
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content');
    }
  }

  $(document).ready(() => {

    return;

    var taskDescription = "";
    var taskColor = "";
    var isStepOneShown = false;
    var isStepTwoShown = false;
    var isColorPickerShown = false;

    insertPicker($("#pickerPopup"));

// Button zum öffnen des Popup >>
    $("#btnNewTask").click(() => {
      createNewTask();
    });

    $("#btnNewTaskDay").click(() => {
      let day = 4;
      createNewTaskAtDay(day);
    });

    $("#btnEditTaskDay").click(() => {
      let $element = "";
      let text = "Schon existierender Task, der editiert werden kann";
      let day = 4;
      let color = 5;
      editTask($element, text, day, color);
    });


// Step 1
    $("#newTaskStepOne").on('show.bs.modal', function () {
      isStepOneShown = true;
    });

    $("#newTaskStepOne").on('hidden.bs.modal', function () {
      taskDescription = $('.new-task-textarea').val();
      $('.new-task-textarea').val("");
      isStepOneShown = false;
      checkIfColorShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown);
    });

    $("#btnToday").click(() => {
      $("#newTaskStepOne").modal("hide");
      var description = $('.new-task-textarea').val();
      confirmTask("", description, 0,"");
    });

    $("#btnStack").click(() => {
      $("#newTaskStepOne").modal("hide");
      var description = $('.new-task-textarea').val();
      confirmTask("", description, "Stack","");
    });

    $("#btnDone").click(() => {
      $("#newTaskStepOne").modal("hide");
      var description = $('.new-task-textarea').val();
      let day = 1; // hier muss der vom Klick übergebene Tag eingefügt werden (jenachdem in welchem Tag der Task angeklickt wurde)
      confirmTask("", description, day,"");
    });

    $("#btnPickDay").click(() => {
      $("#newTaskStepOne").modal("hide");
      $("#newTaskStepTwo").modal("show");
    });


// Step 2
    $("#btnBackToEditTask").click(() => {
      $("#newTaskStepTwo").modal("hide");
      $("#newTaskStepOne").modal("show");
      $('.new-task-textarea').val(taskDescription);
    });

    $("#btnConfirmTask").click(() => {
      $("#newTaskStepTwo").modal("hide");
      let day = $("select option:selected").val();
      confirmTask("", taskDescription, day,"");
    });

    $("#newTaskStepTwo").on('show.bs.modal', function () {
      isStepTwoShown = true;
    });

    $("#newTaskStepTwo").on('hidden.bs.modal', function () {
      resetDayPicker();
      isStepTwoShown = false;
      checkIfColorShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown);
    });


// Color Picker >>
    $("#btnChangeColor").click(() => {
      $("#newTaskStepOne").modal("hide");
      $("#newTaskColorPicker").modal("show");
      taskDescription = $('.new-task-textarea').val();
    });

    $("#btnBackColorPicker").click(() => {
      closeColorPicker(taskDescription);
    });

    $("#btnColorWhite").click(() => {
      closeColorPicker(taskDescription);
      taskColor = 0;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content white');
    });

    $("#btnColorYellow").click(() => {
      closeColorPicker(taskDescription);
      taskColor = 1;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content yellow');
    });

    $("#btnColorRed").click(() => {
      closeColorPicker(taskDescription);
      taskColor = 2;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content red');
    });

    $("#btnColorPurple").click(() => {
      closeColorPicker(taskDescription);
      taskColor = 3;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content purple');
    });

    $("#btnColorBlue").click(() => {
      closeColorPicker(taskDescription);
      taskColor = 4;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content blue');
    });

    $("#btnColorGreen").click(() => {
      closeColorPicker(taskDescription);
      taskColor = 5;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content green');
    });

    $("#newTaskColorPicker").on('show.bs.modal', function () {
      isColorPickerShown = true;
    });

    $("#newTaskColorPicker").on('hidden.bs.modal', function () {
      isColorPickerShown = false;
      checkIfColorShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown);
    });

  });

  /* Public Interface */

  return {
    init,
    createPicker,
    insertPicker
  }

}();
