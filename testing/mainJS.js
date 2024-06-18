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

//------------------------------get city from user-------------------------------------------------------------------------------------------

//------------------------------weather Default---------------------------------------------------------------------------------------------

// Define global variables to hold the weather data

let temp, temp_max, temp_min, humidity, wind_speed, sunrise, sunset, weather_main, weather_description, feels_like;


function defaultWeather() {

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
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
//------------------------------get city to diaplay weather-------------------------------------------------------------------------------------------
function searchCity() {

  // Get the value from the input box
  cityInput = document.getElementById('city-input').value;

  // Use the value as needed
  console.log('User input:', cityInput);

  // Fetch the weather data for the searched city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
    .then(res => res.json())
    .then(dataSearch => {

      // Extract the required weather information
      const temp = dataSearch.main.temp;
      const temp_max = dataSearch.main.temp_max;
      const temp_min = dataSearch.main.temp_min;
      const humidity = dataSearch.main.humidity;
      const wind_speed = dataSearch.wind.speed;
      const sunrise = dataSearch.sys.sunrise;
      const sunset = dataSearch.sys.sunset;
      const weather_main = dataSearch.weather[0].main;
      const weather_description = dataSearch.weather[0].description;
      const feels_like = dataSearch.main.feels_like;

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
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=96f97ce98eae5f28d54c627c89497f55&units=metric`)
   .then(response => response.json())
   .then(data => {
      const dailyData = {};

      data.list.forEach(item => {
        const day = new Date(item.dt * 1000).toISOString().split('T')[0];
        dailyData[day] = dailyData[day] || { temps: [], mains: [], descriptions: [] };
        dailyData[day].temps.push(item.main.temp);
        dailyData[day].mains.push(item.weather[0].main);
        dailyData[day].descriptions.push(item.weather[0].description);
      });

      const aggregatedData = Object.keys(dailyData).map(day => ({
        day: day,
        temp: (dailyData[day].temps.reduce((a, b) => a + b, 0) / dailyData[day].temps.length).toFixed(2),
        main: dailyData[day].mains.sort((a, b) => dailyData[day].mains.filter(v => v === a).length - dailyData[day].mains.filter(v => v === b).length).pop(),
        description: dailyData[day].descriptions.sort((a, b) => dailyData[day].descriptions.filter(v => v === a).length - dailyData[day].descriptions.filter(v => v === b).length).pop()
      })).slice(0, 7);

      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = ""; // clear the container

      aggregatedData.forEach((day, index) => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerHTML = `Day: ${day.day}`;
        forecastContainer.appendChild(dayDiv);

        const tempDiv = document.createElement("div");
        tempDiv.className = "temp";
        tempDiv.innerHTML = `Temperature: ${day.temp}°C`;
        forecastContainer.appendChild(tempDiv);

        const weatherMainDiv = document.createElement("div");
        weatherMainDiv.className = "weather-main";
        weatherMainDiv.innerHTML = `Weather: ${day.main}`;
        forecastContainer.appendChild(weatherMainDiv);

        const weatherDescriptionDiv = document.createElement("div");
        weatherDescriptionDiv.className = "weather-description";
        weatherDescriptionDiv.innerHTML = `Description: ${day.description}`;
        forecastContainer.appendChild(weatherDescriptionDiv);
      });
    })
   .catch(error => console.error(error));
}