// Free Student Tier ;)
const apiKey = '9c69404b250eef98baee356685d95287'

// Grab from DOM
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temp-value');
const humidity = document.querySelector('.humidity-value');
const wind = document.querySelector('.wind-value');

let currentCity = localStorage.getItem('defaultCity');
let units = localStorage.getItem('units');
if (units === null) {
    units = 'imperial';
}
if (currentCity === null) {
    currentCity = 'Annandale';
}
const unitSwitcher = document.querySelector('.toggle-checkbox');
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

if (units === 'metric') {
    unitSwitcher.checked = true;
}



const getWeatherData = async (lat = currentCity.lat, lon = currentCity.lon) /* Default City = Annandale */ => {
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
    cityName.textContent = `${cityObject.name} (${cityObject.sys.country})`;
    temperature.textContent = `${cityObject.main.temp}° ${tempUnit}`;
    humidity.textContent = `${cityObject.main.humidity}%`;
    wind.textContent = `${cityObject.wind.speed} ${windUnit}`;
}

const getCoords = async (input) => {
    localStorage.setItem('defaultCity', input);
    currentCity = input;
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