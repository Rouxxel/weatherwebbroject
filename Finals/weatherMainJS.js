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

//Define global condstions for each day
let conditionDay1, conditionDay2, conditionDay3, conditionDay4, conditionDay5, conditionDay6, conditionDay7;


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
 
      fetchWeatherByCity();
      imageDisplayToday();
    }
  };
 
  request.send();
}
//--------------------------------Part of locator --------------------------------------------------------------------------------------------
function fetchWeatherByCity() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(res => res.json())
    .then(dataSearch => {
 
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
 
      updateWeatherDisplay();
      imageDisplayToday();
      forkastedWeather();
    })
    .catch(error => console.error('Error:There was an error in locating you, please try again later'));
}

//------------------------------weather Default---------------------------------------------------------------------------------------------
function defaultWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(res => res.json())
    .then(dataDefault => {
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

      updateWeatherDisplay();
    });
}

//----------------------------------------Validating search input and updating cityInput-------------------------------------------------------------------------
function gettingSearchedCity(){
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
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(res => res.json())
    .then(dataSearch => {

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

      updateWeatherDisplay();
    })
    .catch(error => console.error('Error: in searching your city, please try again later'));
    forkastedWeather();
    imageDisplayToday();
    console.log(weather_main)
}

function updateWeatherDisplay() {
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

//--------------------------------------image display for todays weather---------------------------------------------------------------------------------------
function imageDisplayToday(){
  let imageElement = document.getElementById("weather-image");
  switch (weather_main){
    case "Clear":
      imageElement.src = "images/sunny.png";
      break;
    case "Rain":
      imageElement.src = "images/rainicon.png";
      break;
    case "Clouds":
      imageElement.src = "images/cloudy.jpg";
      break;
    default:
      imageElement.src = 'images/default.jpg'; 
  } 
}
//------------------------------get weather for next few days-------------------------------------------------------------------------------------------

function forkastedWeather() {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}/next7days?unitGroup=metric&key=RHK7VYYRZXLYRWCCNR94GGRDW&iconSet=icons2`)
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

              

              updateForecast(day, dayData.temp, dayData.conditions, dayData.description, i + 1);
          }
          dailyImageDisplay(); // Call dailyImageDisplay function after updating forecast
      })
  .catch(error => console.error('Error: There was an error in getting your forkasted weather, please try again later'));
}

function updateForecast(day, temp, mainDescription, description, dayNumber) {
  const dayElement = document.getElementById(`day${dayNumber}`);
  const tempElement = document.getElementById(`temp${dayNumber}`);
  const descriptionElement = document.getElementById(`description${dayNumber}`);

  if (dayElement) {
      dayElement.textContent = `${day}`;
  }
  if (tempElement) {
      tempElement.textContent = `Temp: ${temp}°C`;
  }
  if (descriptionElement) {
      descriptionElement.textContent = `${description}`;
  }
}
//--------------------------------------image display for forkast---------------------------------------------------------------------------------------
function dailyImageDisplay(){
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
    const imageElement = document.getElementById(`image${i + 1}`);
    if (imageElement) {
      imageElement.src = `images/${image}`; // assuming images are in an "images" folder
    }
  }
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



