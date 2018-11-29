$(document).ready(() => {
  MainController.init();
});

var MainController = function() {


  /* Configuration */


  /* Public Methods */

  function init(){
    setupContainers();
    initEvents();
    loadTasks();
  }

  /* Private Methods */

  function setupContainers(){
    setupLabels();
  }

  function initEvents() {
    initRowEvents();
    initCardEvents();
  }

  function initRowEvents(){
    $(".day-row").click(function(e) {
      if($("#card-selected").length){
        moveCardToRow($("#card-selected"), $(this));
        $("#card-selected").attr("id", "");
      }
    });
  }

  function initCardEvents(card = ".card"){

    $(card).click(function(e) {

      e.stopPropagation();

      if($("#card-selected").length){
          moveCardToPositionOfOtherCard($("#card-selected"), this);
          $("#card-selected").attr("id", "");
      } else {
        $(this).attr("id", "card-selected");
      }

    });

    $(card).find(".button-delete-task").click(function(e) {
      e.stopPropagation();
      $(this).parent().parent().parent().remove();
    });

    $(card).find(".button-edit-task").click(function(e) {
      e.stopPropagation();
      alert("Edit");
    });
  }

  function moveCardToPositionOfOtherCard(card, otherCard){
    $(card).parent().insertBefore($(otherCard).parent());
  }
  function moveCardToRow(card, row){
    $(row).append($(card).parent());
  }

  function setupLabels(){
    $("#content-main .row").each(function (index){
      const dayLabel = DateFormatter.createDayLabel(index);
      const dateLabel = DateFormatter.createDateLabel(index);
      let labelContainer = document.createElement('div');
      labelContainer.setAttribute('class', 'label-container');
      labelContainer.appendChild(dayLabel);
      labelContainer.appendChild(dateLabel);
      $( labelContainer ).insertBefore($(this));
    });
  }

  function loadTasks() {
    api.task.all(setupTasks)
  }

  function setupTasks(tasksJson){
    let tasks = tasksJson['tasks'];
    tasks.forEach(function(task) {
      let taskCard = TemplateGenerator.getTaskCard(task.content);

      let date = Date(taskCard.dueAt);
      //TODO: calculate dateDiff from difference between today and dueAt
      let dayDiff = 0
      //TODO: consider position

      var as = taskCard.childNodes[1].childNodes[0];

      $("#day-row-" + dayDiff).append(as); 
      initCardEvents(as);
    });
    //alert(taskHtml);


  }

  /* Public Interface */

  return {
    init,
  }

}();
