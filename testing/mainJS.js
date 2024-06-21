//-------------------These are the global variables------------------------------------------------------------------------------------------
let cityInput = 'Berlin';

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

//----------------------------------------locator---------------------------------------------------------------------------------------------

function locator() {
  var request = new XMLHttpRequest();
 
  request.open('GET', 'https://api.ipdata.co/?api-key=6ef951ed663536111bce6535c141078d94cad53fcca9f55e34e22568');
 
  request.setRequestHeader('Accept', 'application/json');
 
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      // Parse the JSON response
      var responseData = JSON.parse(this.responseText);
     
      // Extract city name from response (you might want to check the structure of the API response)
      var cityName = responseData.city;
 
      // Update global variable cityInput with the new city name
      cityInput = cityName;
 
      // Fetch weather data for the new city
      fetchWeatherByCity();
    }
  };
 
  request.send();
}
function fetchWeatherByCity() {
  // Fetch the weather data for the searched city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(res => res.json())
    .then(dataSearch => {
 
      // Extract the required weather information
      temp = dataSearch.main.temp;
      temp_max = dataSearch.main.temp_max;
      temp_min = dataSearch.main.temp_min;
      humidity = dataSearch.main.humidity;
      wind_speed = dataSearch.wind.speed;
      sunrise = dataSearch.sys.sunrise;
      sunset = dataSearch.sys.sunset;
      weather_main = dataSearch.weather[0].main;
      weather_description = dataSearch.weather[0].description;
      feels_like = dataSearch.main.feels_like;
 
      // Update the weather display
      updateWeatherDisplay();
     
      // Fetch forecasted weather for the new city
      forkastedWeather();
    })
    .catch(error => console.error('Error:', error));
    imageDisplay();
}

//------------------------------weather Default---------------------------------------------------------------------------------------------
function defaultWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(res => res.json())
    .then(dataDefault => {
      // Extract the required weather information
      temp = dataDefault.main.temp;
      temp_max = dataDefault.main.temp_max;
      temp_min = dataDefault.main.temp_min;
      humidity = dataDefault.main.humidity;
      wind_speed = dataDefault.wind.speed;
      sunrise = dataDefault.sys.sunrise;
      sunset = dataDefault.sys.sunset;
      weather_main = dataDefault.weather[0].main;
      weather_description = dataDefault.weather[0].description;
      feels_like = dataDefault.main.feels_like;

      // Call the function to update the HTML elements
      updateWeatherDisplay();
      imageDisplay();
    });
}
//----------------------------------------weather of searched location-------------------------------------------------------------------------
function searchCity() {
  // Get the value from the input box
  cityInput = document.getElementById('city-input').value;

  // Fetch the weather data for the searched city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(res => res.json())
    .then(dataSearch => {

      // Extract the required weather information
      temp = dataSearch.main.temp;
      temp_max = dataSearch.main.temp_max;
      temp_min = dataSearch.main.temp_min;
      humidity = dataSearch.main.humidity;
      wind_speed = dataSearch.wind.speed;
      sunrise = dataSearch.sys.sunrise;
      sunset = dataSearch.sys.sunset;
      weather_main = dataSearch.weather[0].main;
      weather_description = dataSearch.weather[0].description;
      feels_like = dataSearch.main.feels_like;

      // Call the function to update the HTML elements
      updateWeatherDisplay();
    })
    .catch(error => console.error('Error:', error));
    imageDisplay();
}

function updateWeatherDisplay() {
  // Assuming the HTML elements have the following IDs: temp, temp_max, temp_min, humidity, wind_speed, sunrise, sunset
  document.getElementById("temp").textContent = `${temp}°C`;
  document.getElementById("temp_max").textContent = `${temp_max}°C`;
  document.getElementById("temp_min").textContent = `${temp_min}°C`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("wind_speed").textContent = `${wind_speed} m/s`;
  document.getElementById("sunrise").textContent = `${new Date(sunrise * 1000).toLocaleTimeString()}`;
  document.getElementById("sunset").textContent = `${new Date(sunset * 1000).toLocaleTimeString()}`;
  document.getElementById("weather_description").textContent = `${weather_description}`;
  document.getElementById("feels_like").textContent = `${feels_like}°C`;
  document.getElementById("header-text").textContent = cityInput + "'s Weather";
}

//------------------------------Search using enter----------------------------------------------------------------------------------------------

//------------------------------get weather for next few days-------------------------------------------------------------------------------------------
function forkastedWeather() {
  // Fetch the weather forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(response => response.json())
    .then(data => {
      // Extract the data for each day
      const forecastList = data.list;
      for (let i = 0; i < forecastList.length; i++) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        switch (i) {
          case 0:
            updateForecast(day, forecast.main.temp, forecast.weather[0].main, forecast.weather[0].description, 1);
            day1MainDescription = forecast.weather[0].main;
            break;
          case 8:
            updateForecast(day, forecast.main.temp, forecast.weather[0].main, forecast.weather[0].description, 2);
            day2MainDescription = forecast.weather[0].main;
            break;
          case 16:
            updateForecast(day, forecast.main.temp, forecast.weather[0].main, forecast.weather[0].description, 3);
            day3MainDescription = forecast.weather[0].main;
            break;
          case 24:
            updateForecast(day, forecast.main.temp, forecast.weather[0].main, forecast.weather[0].description, 4);
            day4MainDescription = forecast.weather[0].main;
            break;
          case 32:
            updateForecast(day, forecast.main.temp, forecast.weather[0].main, forecast.weather[0].description, 5);
            day5MainDescription = forecast.weather[0].main;
            break;
          case 40:
            updateForecast(day, forecast.main.temp, forecast.weather[0].main, forecast.weather[0].description, 6);
            day6MainDescription = forecast.weather[0].main;
            break;
          case 48:
            updateForecast(day, forecast.main.temp, forecast.weather[0].main, forecast.weather[0].description, 7);
            day7MainDescription = forecast.weather[0].main;
            break;
        }
      }
      // Call the imageDisplay function after all descriptions are set
      imageDisplay();
    })
    .catch(error => console.error('Error:', error));
}

function updateForecast(day, temp, mainDescription, description, dayNumber) {
  document.getElementById(`day${dayNumber}`).textContent = `${day}`;
  document.getElementById(`temp${dayNumber}`).textContent = `Temp: ${temp}°C`;
  document.getElementById(`description${dayNumber}`).textContent = `${description}`;
}

//------------------------------suggested places-------------------------------------------------------------------------------------------
// Existing variables and functions
 
// List of cities to choose from
const cities = ["Berlin", "Tokyo", "New York", "London", "Sydney", "Paris", "Cairo", "Rio de Janeiro", "Moscow", "Dubai", "San Francisco", "Toronto"];
 
// Function to get weather data for 8 random cities
function getRandomCityWeather() {
  // Randomly shuffle the array and select the first 8 cities
  const shuffledCities = cities.sort(() => 0.5 - Math.random());
  const selectedCities = shuffledCities.slice(0, 8);
 
  // Clear any existing suggestion box content
  const suggestionBoxes = document.querySelectorAll('.suggestion-box');
  suggestionBoxes.forEach(box => {
    box.innerHTML = "Loading...";
  });
 
  // Fetch weather data for each selected city
  selectedCities.forEach((city, index) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
      .then(res => res.json())
      .then(data => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
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
 
// Call the function to load random city weather on page load
document.addEventListener("DOMContentLoaded", getRandomCityWeather);

//--------------------------------------image display---------------------------------------------------------------------------------------
function imageDisplay() {
  const weatherIcons = {
    "Rain": "images/rainicon.png",
    "Wind": "images/windy.jpg",
    "Clouds": "images/cloudy.jpg",
    "Thunderstorm": "images/thunder.jpg",
    "Clear": "images/sunny.png",
    // Add more weather types and their corresponding images here if needed
  };

  // Update the main weather image
  const mainImageElement = document.getElementById("imageMain");
  if (mainImageElement) {
    mainImageElement.src = weatherIcons[weather_main] || "images/default.jpg"; // Default image if description is not matched
  }

  // An array to hold the main descriptions for each day
  const descriptions = [day1MainDescription, day2MainDescription, day3MainDescription, day4MainDescription, day5MainDescription, day6MainDescription, day7MainDescription];

  // Iterate through each day's description and update the image source
  descriptions.forEach((description, index) => {
    const imageElement = document.getElementById(`image${index + 1}`);
    if (imageElement) {
      imageElement.src = weatherIcons[description] || "images/default.jpg"; // Default image if description is not matched
    }
  });
}


