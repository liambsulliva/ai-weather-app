const express = require("express");
const path = require("path");
const session = require("express-session");
require('dotenv').config();

const app = express();
const port = process.env.PORT | 3000;
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
