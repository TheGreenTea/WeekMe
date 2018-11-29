$(document).ready(() => {
  LoginController.init();
});

var LoginController = function() {


  /* Configuration */


  /* Public Methods */

  function init(){
    initEvents();
  }

  /* Private Methods */

  function initEvents() {
    $("#login-button").click(function(e) {
      let email = $("#input-email").val();
      let password = $("#input-password").val();
      console.log(email);
      console.log(password);

      let onLoginSuccess = function(json) {
        console.log("logged in");
        console.log(window);
        window.location = "./index.html"; 
        console.log("peter")
      }

      api.user.login(email, password, onLoginSuccess)
    });
  }

  /* Public Interface */

  return {
    init,
  }

}();
