$(document).ready(() => {
  PickerGenerator.init();
});

var PickerGenerator = function() {

  /* Configuration */

  /* Public Methods */

  function init(){

  }

  function createModal(){

    return `<!-- New task step 1 -->
    <div class="modal fade" id="newTaskStepOne">
      <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 id="modalHeadlineStepOne" class="modal-title">Create new task</h4>
              <button type="button" id="btnChangeColor" class="btn btn-secondary">
                change color
              </button>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <textarea rows="4" cols="50" class="new-task-textarea" placeholder="Task description..."></textarea>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" id="btnStack" class="btn btn-tertiary">
                stack
              </button>
              <button type="button" id="btnToday" class="btn btn-primary">
                today
              </button>
              <button type="button" id="btnPickDay" class="btn btn-primary" data-toggle="modal" data-target="#newTaskStepTwo">
                another day
              </button>
              <button type="button" id="btnDone" class="btn btn-primary">
                Done
              </button>
            </div>

        </div>
      </div>
    </div>

    <!-- New task step 2 -->
    <div class="modal fade" id="newTaskStepTwo">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 id="modalHeadlineStepTwo" class="modal-title">Choose the stack or a day for your task</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body" id="pickerPopup">
            <!-- Hier wird der Day Picker generiert -->
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-third" id="btnBackToEditTask" data-toggle="modal" data-target="#newTaskStepOne">
              back
            </button>
            <!-- <button type="button" class="btn btn-danger" data-dismiss="modal">cancel</button> -->
            <button type="button" id="btnConfirmTask" class="btn btn-primary btn-first">
              Done
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- New task color picker -->
    <div class="modal fade" id="newTaskColorPicker">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 id="modalHeadlineColorPicker" class="modal-title">Choose the a color for your task</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <button type="button" class="btn btn-color-picker btn-white" id="btnColorWhite"></button>
            <button type="button" class="btn btn-color-picker btn-yellow" id="btnColorYellow"></button>
            <button type="button" class="btn btn-color-picker btn-red" id="btnColorRed"></button>
            <button type="button" class="btn btn-color-picker btn-purple" id="btnColorPurple"></button>
            <button type="button" class="btn btn-color-picker btn-blue" id="btnColorBlue"></button>
            <button type="button" class="btn btn-color-picker btn-green" id="btnColorGreen"></button>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btnBackColorPicker" data-toggle="modal" data-target="#newTaskStepOne">
              back
            </button>
          </div>

        </div>
      </div>
    </div>`;
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

  function insertModal(){
    let newModal = createModal();
    $('body').append(newModal);
  }

  function insertPicker(){
    let options = createOptions();
    let newPicker = createPicker(2, options);
    $("#pickerPopup").append(newPicker);
  }

  function showPicker(day, task){
    console.log("day", day, "task", task); 
    insertModal();
    insertPicker();
    bindListeners();
    if(!day && !task){
      createNewTaskOnStack();
    } else if(!task && day){
      createNewTaskAtDay(day);
    } else if(day && task){
      editExistingTask(day, task);
    } else {
      createNewTask();
    }
  }

  function createNewTaskOnStack(){
    $("#newTaskStepOne").modal("show");
    $('#btnToday').hide();
    $('#btnStack').hide();
    $('#btnDone').show();
    $('#modalHeadlineStepOne').html("Create new task on stack");
  }

  function createNewTaskAtDay(day){
    $("#newTaskStepOne").modal("show");
    $('#btnToday').hide();
    $('#btnStack').hide();
    $('#btnDone').show();
    $('#modalHeadlineStepOne').html("Create new task at day");
  }

  function editExistingTask(day, task){
    $("#newTaskStepOne").modal("show");
    $('.new-task-textarea').val(task.content);
    $('#modalHeadlineStepOne').html("Edit existing task");
    $('#btnToday').hide();
    $('#btnStack').hide();
    $('#btnDone').show();
  }

  function createNewTask(){
    $("#newTaskStepOne").modal("show");
    $('#btnToday').show();
    $('#btnStack').show();
    $('#btnDone').hide();
    $('#modalHeadlineStepOne').html("Create new task");
  }

  function confirmTask($element, content, day, color){
    console.log("Text: " + content + " - At day: " + day);
  }

  function resetDayPicker(){
    $('.picker-container').remove();
    insertPicker($("#pickerPopup"));
  }

  function closeColorPicker(taskContent){
    $("#newTaskColorPicker").modal("hide");
    $("#newTaskStepOne").modal("show");
    $('.new-task-textarea').val(taskContent);
  }

  function checkIfModalShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown){
    if(!isStepOneShown && !isStepTwoShown && !isColorPickerShown){
      /*var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content');*/
      removeModal();
    }
  }

  function removeModal(){
    $('#newTaskStepOne').remove();
    $('#newTaskStepTwo').remove();
    $('#newTaskColorPicker').remove();
  }

  function bindListeners(){

    var taskContent = "";
    var taskColor = "";
    var isStepOneShown = false;
    var isStepTwoShown = false;
    var isColorPickerShown = false;

// Step 1
    $("#newTaskStepOne").on('show.bs.modal', function () {
      isStepOneShown = true;
    });

    $("#newTaskStepOne").on('hidden.bs.modal', function () {
      taskContent = $('.new-task-textarea').val();
      $('.new-task-textarea').val("");
      isStepOneShown = false;
      checkIfModalShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown);
    });

    $("#btnToday").click(() => {
      $("#newTaskStepOne").modal("hide");
      var content = $('.new-task-textarea').val();
      confirmTask("", content, 0,"");
    });

    $("#btnStack").click(() => {
      $("#newTaskStepOne").modal("hide");
      var content = $('.new-task-textarea').val();
      confirmTask("", content, "Stack","");
    });

    $("#btnDone").click(() => {
      $("#newTaskStepOne").modal("hide");
      var content = $('.new-task-textarea').val();
      let day = 1; // hier muss der vom Klick übergebene Tag eingefügt werden (jenachdem in welchem Tag der Task angeklickt wurde)
      confirmTask("", content, day,"");
    });

    $("#btnPickDay").click(() => {
      $("#newTaskStepOne").modal("hide");
      $("#newTaskStepTwo").modal("show");
    });


// Step 2
    $("#btnBackToEditTask").click(() => {
      $("#newTaskStepTwo").modal("hide");
      $("#newTaskStepOne").modal("show");
      $('.new-task-textarea').val(taskContent);
    });

    $("#btnConfirmTask").click(() => {
      $("#newTaskStepTwo").modal("hide");
      let day = $("select option:selected").val();
      confirmTask("", taskContent, day,"");
    });

    $("#newTaskStepTwo").on('show.bs.modal', function () {
      isStepTwoShown = true;
    });

    $("#newTaskStepTwo").on('hidden.bs.modal', function () {
      resetDayPicker();
      isStepTwoShown = false;
      checkIfModalShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown);
    });


// Color Picker >>
    $("#btnChangeColor").click(() => {
      $("#newTaskStepOne").modal("hide");
      $("#newTaskColorPicker").modal("show");
      taskContent = $('.new-task-textarea').val();
    });

    $("#btnBackColorPicker").click(() => {
      closeColorPicker(taskContent);
    });

    $("#btnColorWhite").click(() => {
      closeColorPicker(taskContent);
      taskColor = 0;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content white');
    });

    $("#btnColorYellow").click(() => {
      closeColorPicker(taskContent);
      taskColor = 1;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content yellow');
    });

    $("#btnColorRed").click(() => {
      closeColorPicker(taskContent);
      taskColor = 2;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content red');
    });

    $("#btnColorPurple").click(() => {
      closeColorPicker(taskContent);
      taskColor = 3;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content purple');
    });

    $("#btnColorBlue").click(() => {
      closeColorPicker(taskContent);
      taskColor = 4;
      var modals = $(".modal-content");
      $(".modal-content").removeClass();
      modals.addClass('modal-content blue');
    });

    $("#btnColorGreen").click(() => {
      closeColorPicker(taskContent);
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
      checkIfModalShouldBeResetted(isStepOneShown, isStepTwoShown, isColorPickerShown);
    });

  }

  /* Public Interface */

  return {
    init,
    showPicker
  }

}();
