//-------------------These are the global variables------------------------------------------------------------------------------------------
var lat = 52.40;
var lon = 12.96;
let cityInput = 'Berlin';

//----------------------------------------locator---------------------------------------------------------------------------------------------

function locator(){

var request = new XMLHttpRequest();

request.open('GET', 'https://api.ipdata.co/?api-key=6ef951ed663536111bce6535c141078d94cad53fcca9f55e34e22568');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
};

request.send();
}

//------------------------------weather Default---------------------------------------------------------------------------------------------

// Define global variables to hold the weather data
let temp, temp_max, temp_min, humidity, wind_speed, sunrise, sunset, weather_main, weather_description, feels_like;

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
    });
}

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
}

function updateWeatherDisplay() {
  // Assuming the HTML elements have the following IDs: temp, temp_max, temp_min, humidity, wind_speed, sunrise, sunset
  document.getElementById("temp").textContent = `Temperature: ${temp}°C`;
  document.getElementById("temp_max").textContent = `Max Temperature: ${temp_max}°C`;
  document.getElementById("temp_min").textContent = `Min Temperature: ${temp_min}°C`;
  document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
  document.getElementById("wind_speed").textContent = `Wind Speed: ${wind_speed} m/s`;
  document.getElementById("sunrise").textContent = `Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}`;
  document.getElementById("sunset").textContent = `Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}`;
  document.getElementById("weather_main").textContent = `Weather: ${weather_main}`;
  document.getElementById("weather_description").textContent = `Description: ${weather_description}`;
  document.getElementById("feels_like").textContent = `Feels Like: ${feels_like}°C`;
}


//------------------------------get weather for next few days-------------------------------------------------------------------------------------------
function test() {
  // Pre-defined variables to store the data
let day1, temp1, main_description1, description1;
let day2, temp2, main_description2, description2;
let day3, temp3, main_description3, description3;
let day4, temp4, main_description4, description4;
let day5, temp5, main_description5, description5;
let day6, temp6, main_description6, description6;
let day7, temp7, main_description7, description7;

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
          day1 = day;
          temp1 = forecast.main.temp;
          main_description1 = forecast.weather[0].main;
          description1 = forecast.weather[0].description;
          break;
        case 8:
          day2 = day;
          temp2 = forecast.main.temp;
          main_description2 = forecast.weather[0].main;
          description2 = forecast.weather[0].description;
          break;
        case 16:
          day3 = day;
          temp3 = forecast.main.temp;
          main_description3 = forecast.weather[0].main;
          description3 = forecast.weather[0].description;
          break;
        case 24:
          day4 = day;
          temp4 = forecast.main.temp;
          main_description4 = forecast.weather[0].main;
          description4 = forecast.weather[0].description;
          break;
        case 32:
          day5 = day;
          temp5 = forecast.main.temp;
          main_description5 = forecast.weather[0].main;
          description5 = forecast.weather[0].description;
          break;
        case 40:
          day6 = day;
          temp6 = forecast.main.temp;
          main_description6 = forecast.weather[0].main;
          description6 = forecast.weather[0].description;
          break;
        case 48:
          day7 = day;
          temp7 = forecast.main.temp;
          main_description7 = forecast.weather[0].main;
          description7 = forecast.weather[0].description;
          break;
      }
    }
  })
  .catch(error => console.error('Error:', error));


  document.getElementById("temp").textContent = `Temperature: ${temp}°C`;
  document.getElementById("weather_main").textContent = `Weather: ${weather_main}`;
  document.getElementById("weather_description").textContent = `Description: ${weather_description}`;
  document.getElementById("weather_description").textContent = `Description: ${weather_description}`;
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