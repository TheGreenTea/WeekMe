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
