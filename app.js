const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(cookieParser());

// Securing our keys we use dotenv of npm like we store our mongodb password inside it and add config.env in our gitignore
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;
require("./db/conn");
// Now we will create a schema , document schema is JSON object that allows you to define the shape and content of documents and embedded documents in a collection
// we create a folder model and define a schema in it and create models means collections
// we can use the created model like this
// const User = require("./model/userSchema");

// Using Middleware we are requiring router in our app.js to make route easy
app.use(require("./router/auth"));
// The below middleware will change all the data coming in JSON to object
app.use(express.json());

app.get("/signin", (req, res) => {
  res.send("Hello Login World");
});
app.get("/signup", (req, res) => {
  res.send("Hello Registration World");
});

// 3rd step for heroku deploy
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
