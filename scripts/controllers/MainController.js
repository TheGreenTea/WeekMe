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
    setupAccountDetails();
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
      if(e.target !== e.currentTarget) return;
      moveSelectedCardToRow($(this));
    });

    $(".day-header").click(function(e) {
      const index = $("#content-main").find(".day-header").index(this);
      const row = $("#content-main").find(`.row:eq(${index})`);
      if(e.target !== e.currentTarget) return;
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
        }, (statusCode) => {
          alert(statusCode);
        });
      });

    });

  }

  function moveSelectedCardToRow(row){
    if($(".card-selected").length){
      moveCardToRow($(".card-selected"), $(row));
      deselectCard();
    }
  }

  function initCardEvents(){

    $("#content-main").on("click", ".card", function(e){
      e.stopPropagation();
      if($(".card-selected").length){
          moveCardToPositionOfOtherCard($(".card-selected"), $(this));
          deselectCard();
      } else {
        selectCard(this);
      }
    });
 
    $("#content-main").on("click", ".button-delete-task", function(e){
      e.stopPropagation();
      deselectCard();
      const taskContainer= $(this).parent().parent().parent();
      const taskId = $(this).parent().parent().attr("id");

      api.task.remove(taskId, () => {
        $(taskContainer).remove();
      }, (statusCode) => {
        console.log("Unable to remove task: ", statusCode);
      });
    });


    $("#content-main").on("click", ".button-edit-task", function(e){
      e.stopPropagation();

      const card = $(this).parent().parent();

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

          deselectCard();
        }, (statusCode) => {
          alert(statusCode);
        });
      });
    });

  }

  function selectCard(card){
    const cardWidth = $(card).width();
    const cardHeight = $(card).height();
    $(card).addClass("card-selected");
    $(card).width(cardWidth);
    $(card).css("min-height", cardHeight + 36);
  }

  function deselectCard(){
    const card = $(".card-selected");
    $(card).removeClass("card-selected");
    $(card).css("min-height", "");
  }

  function moveCardToPositionOfOtherCard(card, otherCard){
    const cardId = card.attr("id");

    if(cardId === otherCard.attr('id')) return;

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

    // if(row.attr('id') === card.parent().parent().attr('id')) return;

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
    let overdueTasks = tasks.filter(task => task.dueAt != null && task.dueAt < DateFormatter.getTimeStamp(0))
    let stackTasks = tasks.filter(task => task.dueAt == null);
    var sortedStackTasks = stackTasks.sort(function(a, b){return a.position - b.position});
    sortedStackTasks = sortedStackTasks.concat(overdueTasks);
    sortedStackTasks.forEach(function(task) {
      let taskCard = TemplateGenerator.getTaskCard(task.content, task._id, task.color);
      $("#stack-row").append(taskCard);
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
      });
    }
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


  //MARK: Account
  function showAccountAlert(style, title, message) {
    //show
    $("#account-alert").addClass("in");
    $('#account-alert').css("visibility", "visible");
    //remove existing style
    $("#account-alert").removeClass("alert-success");
    $("#account-alert").removeClass("alert-info");
    $("#account-alert").removeClass("alert-warning");
    $("#account-alert").removeClass("alert-danger");
    //set
    $('#account-alert-title').text(title);
    $('#account-alert-message').text(message);
    $("#account-alert").addClass(style);
  }

  function validateChangePasswordInput() {
    let currentPassword = $('#input-cp-currentpassword').val();
    let newPassword = $('#input-cp-password').val();
    let repeatNewPassword = $('#input-cp-repeatpassword').val();

    if(!currentPassword) {
      showAccountAlert("alert-warning", "Invalid input", "You need to enter your current password");
      return false;
    }
    if(!newPassword) {
      showAccountAlert("alert-warning", "Invalid input", "You need to provide a new password");
      return false;
    }
    if(!repeatNewPassword) {
      showAccountAlert("alert-warning", "Invalid input", "You need to repeat the new password you want to set");
      return false;
    }
    if(newPassword != repeatNewPassword) {
      showAccountAlert("alert-warning", "Invalid input", "The passwords do not match");
      return false;
    }
    if(newPassword.length < 6) {
      showAccountAlert("alert-warning", "Invalid input", "Your new password needs to consist of at least 6 characters");
      return false;
    }

    return true
  }

  function validateChangeEmailInput() {
    let password = $('#input-ce-password').val();
    let email = $('#input-ce-email').val();
    let repeatEmail = $('#input-ce-repeatemail').val();

    if(!password) {
      showAccountAlert("alert-warning", "Invalid input", "You need to enter your current password");
      return false;
    }
    if(!email) {
      showAccountAlert("alert-warning", "Invalid input", "You need to provide a new email");
      return false;
    }
    if(!$('#input-ce-email')[0].checkValidity()) {
      showAccountAlert("alert-warning", "Invalid input", "You need to provide a valid email address!");
      return false;
    }
    if(!repeatEmail) {
      showAccountAlert("alert-warning", "Invalid input", "You need to repeat the new email you want to set");
      return false;
    }
    if(email != repeatEmail) {
      showAccountAlert("alert-warning", "Invalid input", "The emails do not match");
      return false;
    }

    return true
  }

  function setupAccountDetails(){

    //setup account alert
    $('#account-alert-close').click(() => {
      $('#account-alert').css("visibility", "hidden");
      $("#account-alert").removeClass("in");
    })

    //Load profile
    api.user.profile((json) => {
      $('#account-mail').html("Email: " + json.email);
    }, (statusCode) => {
      $('#account-mail').html("Email: " + "could not be loaded");
      showAccountAlert("alert-danger", "Unable to load profile", "Your account information could not be loaded. (" + statusCode + ")");
    });

    $('#change-password-button').click(() => {
      if(validateChangePasswordInput()) {
        let currentPassword = $('#input-cp-currentpassword').val();
        let newPassword = $('#input-cp-password').val();

        api.user.updatePassword(currentPassword, newPassword, () => {
          showAccountAlert("alert-success", "Password changed", "Your password was successfully changed.");
          $('#input-cp-currentpassword').val('');
          $('#input-cp-password').val('');
          $('#input-cp-repeatpassword').val('');
        }, (statusCode) => {
          showAccountAlert("alert-danger", "Unable to change password", "Unfortunately an error occurred and you password was not changed (" + statusCode + ")");
        });
      }
    })

    $('#change-email-button').click(() => {
      if(validateChangeEmailInput()) {
        let password = $('#input-ce-password').val();
        let email = $('#input-ce-email').val();

        api.user.updateEmail(password, email, () => {
          showAccountAlert("alert-success", "Email changed", "Your email address was successfully changed");
          $('#input-ce-password').val('');
          $('#input-ce-email').val('');
          $('#input-ce-repeatemail').val('');
          $('#account-mail').html(email);
        }, (statusCode) => {
          showAccountAlert("alert-danger", "Unable to change email", "Unfortunately an error occurred and your email was not changed (" + statusCode + ")");
        });
      }
    })
  }

  /* Public Interface */

  return {
    init,
  }

}();
