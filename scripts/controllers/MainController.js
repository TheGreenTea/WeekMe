if(!api.user.loggedIn()) {
  window.location = "./login.html";
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
    $(".task-row").click(function(e) {
      moveSelectedCardToRow($(this));
    });

    $(".day-header").click(function(e) {
      const index = $("#content-main").find(".day-header").index(this);
      const row = $("#content-main").find(`.row:eq(${index})`);
      moveSelectedCardToRow($(row));
    });

    $(".add-day-icon").click(function(){
      const headerId = $(this).parent().attr('id');
      let dayDiff = headerId.substring(headerId.length-1, headerId.length);
      if(dayDiff === "r"){
        dayDiff = null;
      }
      PickerGenerator.showPicker(dayDiff);
    });

  }

  function moveSelectedCardToRow(row){
    if($(".card-selected").length){
      moveCardToRow($(".card-selected"), $(row));
      $(".card-selected").removeClass("card-selected");
    }
  }

  function initCardEvents(card = ".card"){

    $(card).click(function(e) {

      e.stopPropagation();

      if($(".card-selected").length){
          moveCardToPositionOfOtherCard($(".card-selected"), $(this));
          $(".card-selected").removeClass("card-selected");
      } else {
        $(this).addClass("card-selected");
      }

    });

    $(card).find(".button-delete-task").click(function(e) {
      e.stopPropagation();
      const taskContainer= $(this).parent().parent().parent();
      const taskId = $(this).parent().parent().attr("id");

      api.task.remove(taskId, () => {
        $(taskContainer).remove();
      });

    });

    $(card).find(".button-edit-task").click(function(e) {
      e.stopPropagation();
      alert("Edit");
    });
  }

  function moveCardToPositionOfOtherCard(card, otherCard){

    const cardId = card.attr("id");
    const dayDiff = otherCard.parent().parent().attr("id").replace("day-row-", "");
    const newPositionOfCard = otherCard.parent().parent().find(".card").index(otherCard);

    api.task.updatePosition(cardId, DateFormatter.getTimeStamp(dayDiff), newPositionOfCard, () => {

      if(doCardsHaveSameRow(card, otherCard)){

        const mutalRow = $(card).parent().parent();
        const cardIndex = $(mutalRow).find(".card").index(card);
        const otherCardIndex = $(mutalRow).find(".card").index(otherCard);

        if(cardIndex < otherCardIndex){
          $(card).parent().insertAfter($(otherCard).parent());
          return;
        }
      }
      $(card).parent().insertBefore($(otherCard).parent());

    }, () => {

      console.log("ERROR!");

    });

  }

  function doCardsHaveSameRow(card, otherCard){
    return $(card).parent().parent().is($(otherCard).parent().parent());
  }

  function moveCardToRow(card, row){
    const cardId = card.attr("id");
    const dayDiff = row.attr("id").replace("day-row-", "");
    const newPositionOfCard = row.find(".card").length;

    console.log("cardId", cardId);
    console.log("dayDiff", dayDiff);
    console.log("newPositionOfCard", newPositionOfCard);

    api.task.updatePosition(cardId, DateFormatter.getTimeStamp(dayDiff), newPositionOfCard, () => {
      $(row).append($(card).parent()); 
    }, () => {
        console.log("ERROR!");
    });
  }

  function setupLabels(){
    $("#content-main .day-row").each(function (index){
      const dayLabel = DateFormatter.createDayLabel(index);
      const dateLabel = DateFormatter.createDateLabel(index);
      let dayHeader = document.querySelectorAll(".day-header")[index];

      dayHeader.appendChild(dayLabel);
      dayHeader.appendChild(dateLabel);
      $( dayHeader ).insertBefore($(this));
    });
  }

  function loadTasks() {
    api.task.all(setupTasks)
  }

  function setupTasks(tasksJson){
    let tasks = tasksJson['tasks'];

    //Add stack tasksJson
    let stackTasks = tasks.filter(task => task.dueAt == null);
    let sortedStackTasks = stackTasks.sort(function(a, b){return a.position - b.position});
    sortedStackTasks.forEach(function(task) {
      let taskCard = TemplateGenerator.getTaskCard(task.content, task._id);
      $("#stack-row").append(taskCard);
    });

    //Add day-row tasks
    for (i = 0; i < 7; i++) {
      let filteredTasks = tasks.filter(task => DateFormatter.getDayDiff(new Date(task.dueAt)) == i);
      let sortedTasks = filteredTasks.sort(function(a, b){return a.position - b.position});

      sortedTasks.forEach(function(task) {
        let taskCard = TemplateGenerator.getTaskCard(task.content, task._id);
        let utcDateStamp = new Date(task.dueAt);
        let dayDiff = DateFormatter.getDayDiff(utcDateStamp);
        $("#day-row-" + dayDiff).append(taskCard);

        initCardEvents($(`#${task._id}`));
      });
    }
  }

  /* Public Interface */

  return {
    init,
  }

}();
