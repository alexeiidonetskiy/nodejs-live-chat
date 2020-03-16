const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Logger middleware
app.use(morgan("dev"));

//Request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Autorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//Erors middleware
app.use((req, res, next) => {
  const error = new Error("Non found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
