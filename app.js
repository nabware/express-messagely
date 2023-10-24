"use strict";

/** Express app for message.ly. */


const express = require("express");
const path = require('path');
const cors = require("cors");
const nunjucks = require("nunjucks");
const { authenticateJWT } = require("./middleware/auth");

const { NotFoundError } = require("./expressError");
const app = new express();

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded());

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
app.use(authenticateJWT);

app.use(express.static(path.join(__dirname,'static')));

nunjucks.configure("templates", {
  autoescape: true,
  express: app,
});

/** routes */

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");
const rootRoutes = require("./routes/root");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/", rootRoutes);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});




module.exports = app;
