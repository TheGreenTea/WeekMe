$(document).ready(() => {
  MainController.init();
});

var MainController = function() {


  /* Configuration */


  /* Public Methods */

  function init(){
    setupContainers();
    initEvents();

    let onProfile = function(json) {
      console.log("profile")
      console.log(json)
    }

    api.user.profile(onProfile)
  }

  /* Private Methods */

  function setupContainers(){
    setupLabels();
    setupTasks();
  }

  function initEvents() {

    $(".card").click(function(e) {

      e.stopPropagation();

      if($("#card-selected").length){
          moveCardToPositionOfOtherCard($("#card-selected"), this);
          $("#card-selected").attr("id", "");
      } else {
        $(this).attr("id", "card-selected");
      }

    });

    $(".button-delete-task").click(function(e) {
      e.stopPropagation();
      $(this).parent().parent().parent().remove();
    });

    $(".button-edit-task").click(function(e) {
      e.stopPropagation();
      alert("Edit");
    });

    $(".day-row").click(function(e) {

      if($("#card-selected").length){
        moveCardToRow($("#card-selected"), $(this));
        $("#card-selected").attr("id", "");
      }

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

  function setupTasks(){

    const taskHtml = TemplateGenerator.getTaskCard("I am the text");

    alert(taskHtml); 


  }

  /* Public Interface */

  return {
    init,
  }

}();
