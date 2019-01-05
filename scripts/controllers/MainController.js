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
    loadAccountDetails();
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
    $("#logout-link").click(function(e) {
      api.user.logout(() => {
        window.location = "./login.html";
      }, (statusCode) => {
        console.log("Failed. Unable to logout! - " + statusCode);
      });
      $(".nav").find(".active").removeClass("active");
    });

    $("#home-link").click(function(e) {
      $("#content-account").hide();
      $("#content-main").show();

      $(".navbar").find(".active").removeClass("active");
    });

    $("#account-link").click(function(e) {
      $("#content-main").hide();
      $("#content-account").show();

      $(".navbar").find(".active").removeClass("active");
      $(this).addClass("active");
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

      if($(".card-selected").length > 0) return;

      const headerId = $(this).parent().attr('id');
      let dayDiff = headerId.substring(headerId.length-1, headerId.length);
      if(dayDiff === "r"){
        dayDiff = null;
      }

      PickerGenerator.showPicker(dayDiff, null, (taskData) => {

        // const positionOfNewTask =

        const task = {
          content: taskData.content,
          color: taskData.color,
          dueAt: DateFormatter.getTimeStamp(taskData.dayDiff)
        }

        api.task.create(task, (json) => {
          console.log("JSON", json);
          let taskCard = TemplateGenerator.getTaskCard(taskData.content, json._id, taskData.color);
          if(taskData.dayDiff === "stack"){
            $(`#stack-row`).append(taskCard);
          } else {
            $(`#day-row-${taskData.dayDiff}`).append(taskCard);
          }

          initCardEvents(`#${json._id}`);

        }, (statusCode) => {
          alert(statusCode);
        });
      });

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
      }, (statusCode) => {
        console.log("Unable to remove task: ", statusCode);
      });

    });

    $(card).find(".button-edit-task").click(function(e) {
      e.stopPropagation();
      let dayDiff = $(card).parent().parent().attr("id").replace("day-row-", "");
      if(dayDiff === "stack-row") dayDiff = null;

      const content = $(card).find(".card-body").html().trim();
      const color = getColorOfCard($(card));

      PickerGenerator.showPicker(dayDiff, {content, color}, async (taskData) => {

        const taskId = $(this).parent().parent().attr("id");
        let task = {
          content: taskData.content,
          color: taskData.color,
          dueAt: DateFormatter.getTimeStamp(taskData.dayDiff)
        }

        if(taskData.dayDiff != dayDiff){
          const newPosition = $(`#day-row-${taskData.dayDiff}`).find(".card").length;
          await api.task.updatePosition(taskId, DateFormatter.getTimeStamp(taskData.dayDiff), newPosition, () => {});
        }

        api.task.update(taskId, task, (json) => {
          console.log("JSON", json);
          $(card).find(".card-body").html(taskData.content);
          $(card).removeClass();
          $(card).addClass(`color-${taskData.color}`);
          $(card).addClass(`card`);
          const row = $(`#day-row-${taskData.dayDiff}`);

          if(taskData.dayDiff != dayDiff) $(row).append($(card).parent()); //Move to new row if the day has changed



          $(".card-selected").removeClass("card-selected");
        }, (statusCode) => {
          alert(statusCode);
        });
      });

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
    api.task.all(setupTasks, (statusCode) => {
      console.log("Could not load tasks: ", statusCode);
    })
  }

  function setupTasks(tasksJson){
    let tasks = tasksJson['tasks'];

    //Add stack tasksJson
    let overdueTasks = tasks.filter(task => task.dueAt < new Date())
    let stackTasks = tasks.filter(task => task.dueAt == null);
    var sortedStackTasks = stackTasks.sort(function(a, b){return a.position - b.position});
    sortedStackTasks = sortedStackTasks.concat(overdueTasks);
    sortedStackTasks.forEach(function(task) {
      let taskCard = TemplateGenerator.getTaskCard(task.content, task._id, task.color);
      $("#stack-row").append(taskCard);
      initCardEvents($(`#${task._id}`));
    });


    //Add day-row tasks
    for (i = 0; i < 7; i++) {
      let filteredTasks = tasks.filter(task => DateFormatter.getDayDiff(new Date(task.dueAt)) == i);
      let sortedTasks = filteredTasks.sort(function(a, b){return a.position - b.position});

      sortedTasks.forEach(function(task) {
        let taskCard = TemplateGenerator.getTaskCard(task.content, task._id, task.color);
        let utcDateStamp = new Date(task.dueAt);
        let dayDiff = DateFormatter.getDayDiff(utcDateStamp);
        $("#day-row-" + dayDiff).append(taskCard);

        initCardEvents($(`#${task._id}`));
      });
    }

    //TODO add all unfinished tasks from the PAST to the stack
  }

  function getColorOfCard(card){
    if(card.hasClass("color-0")) return 0;
    if(card.hasClass("color-1")) return 1;
    if(card.hasClass("color-2")) return 2;
    if(card.hasClass("color-3")) return 3;
    if(card.hasClass("color-4")) return 4;
    if(card.hasClass("color-5")) return 5;
    return 0;
  }

  function loadAccountDetails(){
    api.user.profile((json) => {
      const email = "kuchent@gmx.de";
      $('#account-mail').html("Email: " + json.email);
    }, (statusCode) => {
      console.log("Unable to load profile: ", statusCode);
    });
  }

  /* Public Interface */

  return {
    init,
  }

}();
