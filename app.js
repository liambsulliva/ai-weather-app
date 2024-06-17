const express = require("express");
const { OpenAI } = require('openai');
const path = require("path");
const favicon = require('serve-favicon');
const session = require("express-session");
const fetch = require("node-fetch");
require('dotenv').config();

const app = express();
const openai = new OpenAI();
const port = process.env.PORT | 3000;
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.render("index", { data: null, msg: null });
});

app.post('/search', async (req, res) => {
  const baseUrl = "https://api.openweathermap.org";
  const limit = 1;
  const units = "imperial";
  const city = req.body.searchTerm; // Assuming the input field name is 'searchTerm'
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  try {
    const response = await fetch(`${baseUrl}/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`);
    const data = await response.json();
    const { lat, lon } = data[0];
    const { name, state, country } = data[0];

    const response2 = await fetch(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
    const data2 = await response2.json();
    const { main, wind } = data2;

    const response3 = await fetch(`${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
    const data3 = await response3.json();
    const hourly = data3.list;

    const weatherData = {
      name,
      state,
      country,
      main,
      wind,
      units,
      hourly
    };

    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a weather forecaster."},
        {"role": "user", "content": `How should one prepare for the weather today? What should they wear, pack, or keep in mind? The JSON data for the local weather forecast is below. Talk as if you're on air for one person. 350 characters maximum. ${weatherData}`},
      ],
      model: "gpt-3.5-turbo",
    });
    //res.json(weatherData);
    res.render("index", { data: weatherData, msg: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
