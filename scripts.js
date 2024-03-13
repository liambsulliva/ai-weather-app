// Free Student Tier ;)
const apiKey = '9c69404b250eef98baee356685d95287';

// Grab from DOM
const weatherIcon = document.querySelector('.weather-icon');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temp-value');
const humidity = document.querySelector('.humidity-value');
const wind = document.querySelector('.wind-value');

// Local Storage Setup
const unitSwitcher = document.querySelector('.toggle-checkbox');
let currentCity = localStorage.getItem('defaultCity');
let units = localStorage.getItem('units');
if (units === null) {
    units = 'imperial';
}
if (units === 'metric') {
    unitSwitcher.checked = true;
}
if (currentCity === null) {
    currentCity = 'Annandale';
}

// Check Switch
unitSwitcher.addEventListener('click', () => {
    if (units === 'imperial') {
        units = 'metric';
        localStorage.setItem('units', 'metric');
    } else {
        units = 'imperial';
        localStorage.setItem('units', 'imperial');
    }
    getCoords(currentCity);
});

//TODO: Add foreign language support
const getWeatherData = async (lat = 38.830391, lon = -77.196370) /* Default City = Annandale */ => {
    toggleLoad(true);
    const res = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );
    const data = await res.json();
    //console.log(data);
    toggleLoad(false);
    displayWeatherData(data);
};

const displayWeatherData = (cityObject) => {
    const tempUnit = units === 'imperial' ? 'F' : 'C';
    const windUnit = units === 'imperial' ? 'MPH' : 'KPH'; 
    cityName.textContent = `${cityObject.name} (${cityObject.sys.country})`;
    temperature.textContent = `${cityObject.main.temp}° ${tempUnit}`;
    humidity.textContent = `${cityObject.main.humidity}%`;
    wind.textContent = `${cityObject.wind.speed} ${windUnit}`;
    setWeatherIcon(cityObject.weather[0]);
}

const setWeatherIcon = (weather) => {
    console.log(weather);
    switch (weather.main) {
        case 'Clear':
            weatherIcon.src = `/icons/clear.svg`;
            break;
        case 'Clouds':
            weatherIcon.src = `icons/clouds.svg`;
            break;
        case 'Rain':
            weatherIcon.src = `icons/rain.svg`;
            break;
        case 'Drizzle':
            weatherIcon.src = `icons/drizzle.svg`;
            break;
        case 'Thunderstorm':
            weatherIcon.src = `icons/thunderstorm.svg`;
            break;
        case 'Snow':
            weatherIcon.src = `icons/snow.svg`;
            break;
        default:
            weatherIcon.src = `icons/haze.svg`;
            break;
    }
};

const getCoords = async (input) => {
    toggleLoad(true);
    const res = await fetch (
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`
    );
    const data = await res.json();
    toggleLoad(false);
    if (!data || data.length === 0) {
        //TODO: This alert is annoying, move to DOM
        alert('Invalid Location!');
        return;
    }
    localStorage.setItem('defaultCity', input);
    currentCity = input;
    //* Pick top choice
    //console.log(data);
    getWeatherData(data[0].lat, data[0].lon);
}

function toggleLoad(isLoading) {
    const loadingElement = document.querySelector('.load-element');
    const weatherInfo = document.querySelector('.weather-info');

    if (isLoading) {
        loadingElement.classList.add('show');
        weatherInfo.classList.add('hide');
    } else {
        loadingElement.classList.remove('show');
        weatherInfo.classList.remove('hide');
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
getCoords(currentCity);