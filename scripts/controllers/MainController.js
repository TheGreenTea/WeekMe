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
  }

  function initEvents() {
    $(".card").click(function() {

      if($("#card-selected").length){
          moveCard($("#card-selected"), this);
          $("#card-selected").attr("id", "");
      } else {
        $(this).attr("id", "card-selected");
      }
    });
  }

  function moveCard(cardToMove, cardToMoveTo){
    $(cardToMove).parent().insertBefore($(cardToMoveTo).parent());
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

  /* Public Interface */

  return {
    init,
  }

}();
