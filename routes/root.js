"use strict";

const Router = require("express").Router;
const router = new Router();

const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

/**
 * Return register page
 */
router.get("/register", async function (req, res, next) {
  return res.render("register.html");
});

/**
 * Return login page
 */
router.get("/login", async function (req, res, next) {
  return res.render("login.html");
});

/**
 * Return my messages
 */
router.get("/my-messages/:username", ensureCorrectUser, async function (req, res, next) {
  const { username } = res.locals.user;

  // const messagesFrom = await User.messagesFrom(username);
  // const messagesTo = await User.messagesTo(username);
  // const messages = messagesFrom + messagesTo;

  return res.render("my_messages.html");
});

module.exports = router;