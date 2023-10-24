const $registerForm = $("#register-form");
const $registerButton = $("#register-button");
const $loginForm = $("#login-form");
const $loginButton = $("#login-button");

/**
 * Handles register form submission.
 */
async function handleRegisterFormSubmit(evt) {
  evt.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();
  const first_name = $("#firstName").val();
  const last_name = $("#lastName").val();
  const phone = $("#phone").val();

  const response = await fetch("./auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password, first_name, last_name, phone }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  const { token } = data;

  localStorage.setItem("_token", token);
  const localStorageToken = localStorage.getItem("_token");

  window.location.replace(`./my-messages?_token=${localStorageToken}`);
}

/**
 * Handles login form submission.
 */
async function handleLoginFormSubmit(evt) {
  evt.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();

  const response = await fetch("./auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  const { token } = data;

  localStorage.setItem("_token", token);
  const localStorageToken = localStorage.getItem("_token");

  window.location.replace(`./my-messages?_token=${localStorageToken}`);
}

$registerForm.on("submit", handleRegisterFormSubmit);
$loginForm.on("submit", handleLoginFormSubmit);