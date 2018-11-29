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

  function validateForm() {
    let inputEmail = $("#input-email");
    if (!inputEmail[0].checkValidity()) {
      inputEmail.addClass('error-message-container')
      showErrorMessage("Invalid email");

      return false
    }
    inputEmail.removeClass('error-message-container')

    let inputPassword = $("#input-password");
    if (!inputPassword.val()) {
      inputPassword.addClass('error-message-container')
      showErrorMessage("Missing password");

      return false
    }

    inputPassword.removeClass('error-message-container');
    $(".message-container").hide();

    return true
  }

  function initEvents() {
    $("#forgot-password-link").click(function(e) {
        window.location = "./reset-password.html";
    });

    $("#signup-link").click(function(e) {
        window.location = "./register.html";
    });

    $("#login-button").click(function(e) {

      if (validateForm()) {
        let email = $("#input-email").val();
        let password = $("#input-password").val();

        let onLoginSuccess = function(json) {
          window.location = "./index.html";
        }

        api.user.login(email, password, onLoginSuccess)
      }
    });
  }


  function showErrorMessage(message) {
    let messageContainer = $(".message-container");
    let messageBox = $("#messageBox");
    messageContainer.show();
    messageContainer.addClass('error-message-container');
    messageBox.addClass('error-message');
    messageBox.text(message);
  }
  /* Public Interface */

  return {
    init,
  }

}();
