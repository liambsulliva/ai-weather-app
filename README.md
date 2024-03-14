# Weather App

This is a simple weather application built using HTML, CSS, and JavaScript. It allows users to search for the current weather conditions of any city by entering the city name. The app displays the city name, temperature, humidity, and wind speed. It also includes an icon representing the current weather conditions.

## Features

- Search for weather conditions by city name
- Display temperature, humidity, wind speed, and weather icon
- Toggle between Celsius and Fahrenheit units
- Responsive design for various screen sizes

## Technologies Used

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository or download the source code.
2. Open the `index.html` file in a web browser.

Alternatively, you can visit the live demo at [insert deployment link here].

## Usage

1. Enter the name of the city in the input field.
2. Click the "Search" button or press Enter.
3. The app will display the current weather conditions for the specified city.
4. Use the toggle switch to switch between Celsius and Fahrenheit units.

## API Key

This application uses the OpenWeatherMap API to fetch weather data. You need to obtain an API key from [OpenWeatherMap](https://openweathermap.org/) and replace the existing key in the `scripts.js` file with your own key.

```javascript
const apiKey = 'YOUR_API_KEY_HERE';