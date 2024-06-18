var lat = 52.40;
var lon = 12.96;


let weatherData;
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
  const cityInput = document.getElementById('city-input').value;

  // Use the value as needed
  console.log('User input:', cityInput);

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
function test(){
  const apiKey = '96f97ce98eae5f28d54c627c89497f55';
  var city = 'Berlin'
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${apiKey}`;

fetch(url)
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error(error));
}



