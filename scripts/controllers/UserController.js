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

  function validateLoginForm() {
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

  function validateRegisterForm() {
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

    let repeatPassword = $("#input-repeat-password");
    if (!repeatPassword.val()) {
      repeatPassword.addClass('error-message-container')
      showErrorMessage("Missing password");

      return false
    }

    if (repeatPassword.val() != inputPassword.val()) {
      inputPassword.addClass('error-message-container')
      repeatPassword.addClass('error-message-container')
      showErrorMessage("Passwords don't match");

      return false
    }
    inputPassword.removeClass('error-message-container');
    repeatPassword.removeClass('error-message-container');

    $(".message-container").hide();

    return true
  }

  function validateResetForm() {
    let inputPassword = $("#input-password");
    if (!inputPassword.val()) {
      inputPassword.addClass('error-message-container')
      showErrorMessage("Missing password");

      return false
    }
    inputPassword.removeClass('error-message-container');

    let repeatPassword = $("#input-repeat-password");
    if (!repeatPassword.val()) {
      repeatPassword.addClass('error-message-container')
      showErrorMessage("Missing password");

      return false
    }

    if (repeatPassword.val() != inputPassword.val()) {
      inputPassword.addClass('error-message-container')
      repeatPassword.addClass('error-message-container')
      showErrorMessage("Passwords don't match");

      return false
    }
    inputPassword.removeClass('error-message-container');
    repeatPassword.removeClass('error-message-container');

    $(".message-container").hide();

    return true
  }

  function validateRequestResetForm() {
    let inputEmail = $("#input-email");
    if (!inputEmail[0].checkValidity()) {
      inputEmail.addClass('error-message-container')
      showErrorMessage("Invalid email");

      return false
    }
    inputEmail.removeClass('error-message-container')

    $(".message-container").hide();

    return true
  }

  function initEvents() {
    $("#forgot-password-link").click(function(e) {
        window.location = "./request-reset.html";
    });

    $("#login-link").click(function(e) {
        window.location = "./login.html";
    });

    $("#signup-link").click(function(e) {
        window.location = "./register.html";
    });

    $("#login-button").click(function(e) {

      if (validateLoginForm()) {
        let email = $("#input-email").val();
        let password = $("#input-password").val();

        api.user.login(email, password, (json) => {
          window.location = "./index.html";
        }, (statusCode) => {
          showErrorMessage("Login failed");
        });
      }
    });

    $("#register-button").click(function(e) {

      if (validateRegisterForm()) {
        let email = $("#input-email").val();
        let password = $("#input-password").val();

        api.user.register(email, password, (json) => {
          console.log("register success:", json);
          window.location = "./index.html";
        }, (statusCode) => {
          console.log("register failed:", statusCode);
          showErrorMessage("Register failed");
        });
      }
    });

    $("#request-reset-button").click(function(e) {

      if (validateRequestResetForm()) {
        let email = $("#input-email").val();

        api.user.requestPasswordReset(email, (json) => {
          showInfoMessage("An email was sent");
        }, (statusCode) => {
          showErrorMessage("Reset request failed: " + statusCode);
        });
      }
    });

    $("#reset-password-button").click(function(e) {

      const urlParams = new URLSearchParams(window.location.search);
      const resetCode = urlParams.get('resetcode');
      if (!resetCode) {
        showErrorMessage("Missing code - invalid link")
      }

      if (validateResetForm()) {
        let password = $("#input-password").val();
        api.user.reset(resetCode, password, (json) => {
          showInfoMessage("Password was reset!");
        }, (statusCode) => {
          showErrorMessage("Password reset failed: " + statusCode);
        });
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

  function showInfoMessage(message) {
    let messageContainer = $(".message-container");
    let messageBox = $("#messageBox");
    messageContainer.show();
    //messageContainer.addClass('error-message-container');
    //messageBox.addClass('error-message');
    messageBox.text(message);
  }
  /* Public Interface */

  return {
    init,
  }

}();
