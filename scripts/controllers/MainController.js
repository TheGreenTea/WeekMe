if(!api.user.loggedIn()) {
  window.location = "./login.html";
} else {
  console.log(api.user.loggedIn())
}

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
    initMenuEvents();
    initRowEvents();
    initCardEvents();
  }

  function initMenuEvents() {
    $("#login-link").click(function(e) {
      let onLogoutSuccess = function() {
        window.location = "./login.html";
      }

      api.user.logout(onLogoutSuccess);
    });
    //TODO: initialise missing menu events
  }

  function initRowEvents(){
    $(".day-row").click(function(e) {
      if($(".card-selected").length){
        moveCardToRow($(".card-selected"), $(this));
        $(".card-selected").removeClass("card-selected");
      }
    });
  }

  function initCardEvents(card = ".card"){

    $(card).click(function(e) {

      e.stopPropagation();

      if($(".card-selected").length){
          moveCardToPositionOfOtherCard($(".card-selected"), this);
          $(".card-selected").removeClass("card-selected");
      } else {
        $(this).addClass("card-selected");
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
      let taskCard = TemplateGenerator.getTaskCard(task.content, task._id);

      let date = Date(taskCard.dueAt);
      //TODO: calculate dateDiff from difference between today and dueAt
      let dayDiff = 0
      //TODO: consider position

      $("#day-row-" + dayDiff).append(taskCard);
      initCardEvents($(`#${task._id}`));
      // initCardEvents();
    });
    //alert(taskHtml);


  }

  /* Public Interface */

  return {
    init,
  }

}();
