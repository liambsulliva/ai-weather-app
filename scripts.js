// Free Student Tier ;)
const apiKey = '9c69404b250eef98baee356685d95287'

// Grab from DOM
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temp-value');
const humidity = document.querySelector('.humidity-value');
const wind = document.querySelector('.wind-value');

//TODO: Modify this value with toggle
let units = 'imperial';

const getWeatherData = async (lat = 38.830391, lon = -77.196370) /* Default City = Annandale */ => {
    toggleLoad(true);
    const res = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );
    const data = await res.json();
    toggleLoad(false);
    displayWeatherData(data);
};

const displayWeatherData = (cityObject) => {
    const tempUnit = units === 'imperial' ? 'F' : 'C';
    const windUnit = units === 'imperial' ? 'MPH' : 'KPH'; 
    cityName.textContent = cityObject.name;
    temperature.textContent = `${cityObject.main.temp}° ${tempUnit}`;
    humidity.textContent = `${cityObject.main.humidity}%`;
    wind.textContent = `${cityObject.wind.speed} ${windUnit}`;
}

const getCoords = async (input) => {
    toggleLoad(true);
    const res = await fetch (
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`
    );
    const data = await res.json();
    toggleLoad(false);
    //* Pick top choice if given multiple options
    console.log(data);
    if (data.length > 1) {
        getWeatherData(data[0].lat, data[0].lon);
    } else {
        getWeatherData(data.lat, data.lon);
    }
    
}

function toggleLoad(isLoading) {
    const loadingElement = document.querySelector('.load-element');
    const loader = document.querySelector('.loader');
    const weatherInfo = document.querySelector('.weather-info');

    if (isLoading) {
        loadingElement.style.display = 'block';
        loader.style.display = 'inline-block';
        weatherInfo.style.display = 'none';
    } else {
        loadingElement.style.display = 'none';
        loader.style.display = 'none';
        weatherInfo.style.display = 'block';
    }
}

// Handle Form Input
const searchBtn = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input');

searchBtn.addEventListener('click', () => {
    getCoords(cityInput.value);
});
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getCoords(cityInput.value);
    }
});

// Initial Weather Reading
getWeatherData();