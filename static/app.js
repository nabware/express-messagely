"use strict";

const $registerForm = $("#register-form");
const $registerButton = $("#register-button");
const $loginForm = $("#login-form");
const $loginButton = $("#login-button");

const $messageContainer = $('#messages-to-container');

const $messagesButton = $("#messages-to");

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

  localStorage.setItem("username", username);
  localStorage.setItem("_token", token);

  window.location.replace(`/my-messages`);
}
$registerForm.on("submit", handleRegisterFormSubmit);

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

  localStorage.setItem("username", username);

  localStorage.setItem("_token", token);

  window.location.replace(`/my-messages`);
}


async function getMessagesTo(username, _token) {


  const response = await fetch(`./users/${username}/to?_token=${_token}`);

  const data = await response.json();
  const { messages } = data;
  return messages;
}

async function populateMessages() {
  const _token = localStorage.getItem("_token");
  const username = localStorage.getItem("username");

  console.log("test");
  const messagesTo = await getMessagesTo(username, _token);

  for (const message of messagesTo) {
    $messageContainer.append(message.body);
  }
}


$messagesButton.on("click", populateMessages);



$loginForm.on("submit", handleLoginFormSubmit);





