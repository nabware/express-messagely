"use strict";

const Router = require("express").Router;
const router = new Router();

const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/user");


/**
 * Return register page
 */
router.get("/register", async function (req, res, next) {

  return res.render("register.html");
});

module.exports = router;