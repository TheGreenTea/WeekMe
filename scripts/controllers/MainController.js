$(document).ready(() => {
  MainController.init();
});

var MainController = function() {


  /* Configuration */


  /* Public Methods */

  function init(){
    setupContainers();

  }

  /* Private Methods */

  function setupContainers(){
    setupLabels();
  }

  function setupLabels(){


    $("#content-main .row").each(function (index){


      const dayLabel = createDayLabel(getDayName(index));
      const dateLabel = createDateLabel(getDateString(index));

      $( dayLabel ).insertBefore($(this));
      $( dateLabel ).insertBefore($(this));


    });

  }

  /* Public Interface */

  return {
    init,
  }

}();
