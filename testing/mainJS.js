//-------------------These are the global variables------------------------------------------------------------------------------------------
let cityInput = 'Berlin';

//-------------------These are the different API for temp system-----------------------------------------------------------------------------
let weatherAPI_Open = ``;
let weatherAPI_Visual = ``;
let metricUnits = 0; // toggle for metric units
let temp_symbol = '';

// Define global variables to hold the weather data
let temp, temp_max, temp_min, humidity, wind_speed, sunrise, sunset, weather_main, weather_description, feels_like;

// Global variables to store the main description for each day
let day1MainDescription = '';
let day2MainDescription = '';
let day3MainDescription = '';
let day4MainDescription = '';
let day5MainDescription = '';
let day6MainDescription = '';
let day7MainDescription = '';

// Define global conditions for each day
let conditionDay1, conditionDay2, conditionDay3, conditionDay4, conditionDay5, conditionDay6, conditionDay7;

// List of whitelisted URLs for redirects
const whitelist = ['main.html', 'about.html', 'contact.html'];

const cities = ["Berlin", "Tokyo", "New York", "London", "Sydney", "Paris", "Cairo", "Rio de Janeiro", "Moscow", "Dubai", "San Francisco", "Toronto"];

//----------------------------------------redirect validation---------------------------------------------------------------------------------------------
function redirectTo(url) {
  if (whitelist.includes(url)) {
    window.location.href = url;
  } else {
    console.error('Invalid redirect URL:', url);
    alert('Invalid URL');
  }
}

//---------------------------------------Metric switcher-------------------------------------------------------------------------------------
function metricSwitcher() {
  metricUnits = metricUnits === 0 ? 1 : 0;
  updateWeatherAPIs();  // Update weather APIs immediately after toggling units
  fetchWeatherByCity();
  forkastedWeather();
}


//----------------------------------------Update weather APIs based on metric units-------------------------------------------------------------------------------------
function updateWeatherAPIs() {
  if (metricUnits === 0) {
    weatherAPI_Open = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`;
    weatherAPI_Visual = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}/next7days?unitGroup=metric&key=RHK7VYYRZXLYRWCCNR94GGRDW&iconSet=icons2`;
    temp_symbol = '°C';
    
  } else {
    weatherAPI_Open = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=imperial`;
    weatherAPI_Visual = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}/next7days?unitGroup=us&key=RHK7VYYRZXLYRWCCNR94GGRDW&iconSet=icons2`;
    temp_symbol = '°F';
    getRandomCityWeather_F()
  }
}


//----------------------------------------locator---------------------------------------------------------------------------------------------

function locator() {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.ipdata.co/?api-key=6ef951ed663536111bce6535c141078d94cad53fcca9f55e34e22568');
  request.setRequestHeader('Accept', 'application/json');

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var responseData = JSON.parse(this.responseText);
      var cityName = responseData.city;

      cityInput = cityName;
      updateWeatherAPIs();
      fetchWeatherByCity();
      forkastedWeather();
    }
  };

  request.send();
}

//--------------------------------Part of locator --------------------------------------------------------------------------------------------
function fetchWeatherByCity() {
  fetch(weatherAPI_Open)
    .then(res => res.json())
    .then(dataSearch => {
      temp = Math.round(dataSearch.main.temp);
      temp_max = Math.round(dataSearch.main.temp_max);
      temp_min = Math.round(dataSearch.main.temp_min);
      humidity = dataSearch.main.humidity;
      wind_speed = dataSearch.wind.speed;
      sunrise = dataSearch.sys.sunrise;
      sunset = dataSearch.sys.sunset;
      feels_like = Math.round(dataSearch.main.feels_like);
      weather_main = dataSearch.weather[0].main;

      updateWeatherDisplay();
      forkastedWeather();
      todaysImage();
    })
    .catch(error => console.error('Error:There was an error in locating you, please try again later'));
}

//----------------------------------------Validating search input and updating cityInput-------------------------------------------------------------------------
function gettingSearchedCity() {
  cityInput = document.getElementById('city-input').value.trim();

  // Check for special characters
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (specialChars.test(cityInput)) {
    alert("Invalid input: Special characters are not allowed.");
  } else {
    // Validate input (e.g., only allow alphanumeric characters and spaces)
    const validChars = /^[a-zA-Z\s]+$/;
    if (!validChars.test(cityInput)) {
      alert("Invalid input: Only letters and spaces are allowed.");
    } else {
      // If all criteria are met, call the searchCity function
      searchCity();
    }
  }
}

//----------------------------------------weather of searched location-------------------------------------------------------------------------
function searchCity() {
  updateWeatherAPIs();

  fetch(weatherAPI_Open)
    .then(res => res.json())
    .then(dataSearch => {
      temp = Math.round(dataSearch.main.temp);
      temp_max = Math.round(dataSearch.main.temp_max);
      temp_min = Math.round(dataSearch.main.temp_min);
      humidity = dataSearch.main.humidity;
      wind_speed = dataSearch.wind.speed;
      sunrise = dataSearch.sys.sunrise;
      sunset = dataSearch.sys.sunset;
      feels_like = Math.round(dataSearch.main.feels_like);
      weather_main = dataSearch.weather[0].main;

      updateWeatherDisplay();
    })
    .catch(error => console.error('Error: in searching your city, please try again later'));

  forkastedWeather();
  todaysImage();
}

function updateWeatherDisplay() {
  document.getElementById("temp").textContent = `${temp} ${temp_symbol}`;
  document.getElementById("temp_max").textContent = `${temp_max} ${temp_symbol}`;
  document.getElementById("temp_min").textContent = `${temp_min} ${temp_symbol}`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("wind_speed").textContent = `${wind_speed} m/s`;
  document.getElementById("sunrise").textContent = `${new Date(sunrise * 1000).toLocaleTimeString()}`;
  document.getElementById("sunset").textContent = `${new Date(sunset * 1000).toLocaleTimeString()}`;
  document.getElementById("feels_like").textContent = `${feels_like} ${temp_symbol}`;
  document.getElementById("header-text").textContent = cityInput + "'s Weather";

  // Displaying temp2
  document.getElementById("temp-1").textContent = `${temp} ${temp_symbol}`;
}


//--------------------------------------image display for todays weather---------------------------------------------------------------------------------------
function todaysImage() {
  let mainImage;
  switch (weather_main) {
    case "Rain":
      mainImage = 'rainicon.png';
      break;
    case "Partially cloudy":
      mainImage = 'cloudy.jpg';
      break;
    case "Clear":
      mainImage = 'sunny.png';
      break;
    case "Overcast":
      mainImage = 'overcast.png';
      break;
    default:
      mainImage = 'default.jpg'; // default image if condition not found
  }
  const mainImageElement = document.getElementById('main-image');
  if (mainImageElement) {
    mainImageElement.src = `images/${mainImage}`; // assuming images are in an "images" folder
  }
}

//------------------------------get weather for next few days-------------------------------------------------------------------------------------------
function forkastedWeather() {
  fetch(weatherAPI_Visual)
    .then(response => response.json())
    .then(data => {
      const days = data.days;
      for (let i = 0; i < days.length; i++) {
        const dayData = days[i];
        const date = new Date(dayData.datetimeEpoch * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        // Save only one condition for each day
        const condition = dayData.conditions.split(', ')[0];
        switch (i) {
          case 0:
            conditionDay1 = condition;
            weather_description = dayData.description;
            break;
          case 1:
            conditionDay2 = condition;
            break;
          case 2:
            conditionDay3 = condition;
            break;
          case 3:
            conditionDay4 = condition;
            break;
          case 4:
            conditionDay5 = condition;
            break;
          case 5:
            conditionDay6 = condition;
            break;
          case 6:
            conditionDay7 = condition;
            break;
        }

        // Round the temperature to the nearest whole number
        const temp = Math.round(dayData.temp);

        updateForecast(day, temp, dayData.conditions, dayData.description, i + 1);
      }
      dailyImageDisplay(); // Call dailyImageDisplay function after updating forecast
    })
    .catch(error => console.error('Error: There was an error in getting your forecasted weather, please try again later'));
}

function updateForecast(day, temp, mainDescription, description, dayNumber) {
  const dayElement = document.getElementById(`day${dayNumber}`);
  const tempElement = document.getElementById(`temp${dayNumber}`);
  const descriptionElement = document.getElementById(`description${dayNumber}`);

  if (dayElement) {
    dayElement.textContent = day;
  }
  if (tempElement) {
    tempElement.textContent = `Temp: ${temp} ${temp_symbol}`;
  }
  if (descriptionElement) {
    descriptionElement.textContent = description;
  }

  // Add the following lines to update the weather main and description
  const weatherMainElement = document.getElementById('weather-main');
  const weatherDescriptionElement = document.getElementById('weather-description');

  if (weatherMainElement) {
    weatherMainElement.textContent = weather_main;
  }
  if (weatherDescriptionElement) {
    weatherDescriptionElement.textContent = weather_description;
  }
}

//--------------------------------------image display for forecast---------------------------------------------------------------------------------------
function dailyImageDisplay() {
  const conditions = [conditionDay1, conditionDay2, conditionDay3, conditionDay4, conditionDay5, conditionDay6, conditionDay7];

  for (let i = 0; i < conditions.length; i++) {
    let image;
    switch (conditions[i]) {
      case "Rain":
        image = 'rainicon.png';
        break;
      case "Partially cloudy":
        image = 'cloudy.jpg';
        break;
      case "Clear":
        image = 'sunny.png';
        break;
      case "Overcast":
        image = 'overcast.png';
        break;
      default:
        image = 'default.jpg'; // default image if condition not found
    }

    if (i === 0) {
      // Day 1: multiple elements
      const day1ImageElements = document.querySelectorAll('.day1-image');
      day1ImageElements.forEach(element => {
        element.src = `images/${image}`;
      });
    } else {
      // Other days: single element
      const imageElement = document.getElementById(`image${i + 1}`);
      if (imageElement) {
        imageElement.src = `images/${image}`;
      }
    }
  }
}

//------------------------------suggested places in C-------------------------------------------------------------------------------------------
function getRandomCityWeather_C() {
  // Randomly shuffle the array and select the first 8 cities
  const shuffledCities = cities.sort(() => 0.5 - Math.random());
  const suggestionBoxes = document.querySelectorAll('.suggestion-box');

  // Ensure selected cities do not exceed the number of suggestion boxes
  const selectedCities = shuffledCities.slice(0, suggestionBoxes.length);

  // Clear any existing suggestion box content
  suggestionBoxes.forEach(box => {
    box.innerHTML = "Loading...";
  });

  // Fetch weather data for each selected city
  selectedCities.forEach((city, index) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
     .then(res => res.json())
     .then(data => {
        const weather = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        // Update the suggestion box with weather data
        const suggestionBox = suggestionBoxes[index];
        suggestionBox.innerHTML = `<p>${city}</p><p>${temp}°C</p><p>${weather}</p>`;
      })
     .catch(error => {
        console.error('Error:', error);
        const suggestionBox = suggestionBoxes[index];
        suggestionBox.innerHTML = `<p>Error loading data</p>`;
      });
  });
}

//---------------------------------------------------suggested in F---------------------------------------------------------------------------
function getRandomCityWeather_F() {
  // Randomly shuffle the array and select the first 8 cities
  const shuffledCities = cities.sort(() => 0.5 - Math.random());
  const suggestionBoxes = document.querySelectorAll('.suggestion-box');

  // Ensure selected cities do not exceed the number of suggestion boxes
  const selectedCities = shuffledCities.slice(0, suggestionBoxes.length);

  // Clear any existing suggestion box content
  suggestionBoxes.forEach(box => {
    box.innerHTML = "Loading...";
  });

  // Fetch weather data for each selected city
  selectedCities.forEach((city, index) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96f97ce98eae5f28d54c627c89497f55&units=imperial`)
     .then(res => res.json())
     .then(data => {
        const weather = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        // Update the suggestion box with weather data
        const suggestionBox = suggestionBoxes[index];
        suggestionBox.innerHTML = `<p>${city}</p><p>${temp}°F</p><p>${weather}</p>`;
      })
     .catch(error => {
        console.error('Error:', error);
        const suggestionBox = suggestionBoxes[index];
        suggestionBox.innerHTML = `<p>Error loading data</p>`;
      });
  });
}

// Call the function to load random city weather on page load
document.addEventListener("DOMContentLoaded", getRandomCityWeather_C);
