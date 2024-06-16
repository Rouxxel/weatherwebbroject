
//----------------------------------------locator---------------------------------------------------------------------------------------------

function locator (){

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
    
    //------------------------weather--------------------------------------------------------------------------------------------------------
    async function getWeather(lat, lon, exclude = '') {
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=96f97ce98eae5f28d54c627c89497f55`;
      
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching weather data:', error);
      }
    }
    
    function displayWeather(data) {
      const weatherContainer = document.getElementById('weather-info');
      weatherContainer.innerHTML = `
          <h2>Weather Information</h2>
          <p>Temperature: ${data.current.temp}K</p>
          <p>Weather: ${data.current.weather[0].description}</p>
          <p>Humidity: ${data.current.humidity}%</p>
      `;
    }
    
    function getTemp(data){
      const weatherContainer = document.getElementById('weather-info');
      weatherContainer.innerHTML = `
      <p> temp: ${data.current.temp}K</p>
      `;
    }
    
    function fetchWeather() {
      // Example coordinates (latitude and longitude for San Francisco)
      const lat = 37.7749;
      const lon = -122.4194;
      const exclude = 'minutely,hourly';
    
      getWeather(lat, lon, exclude).then(data => {
          if (data) {
              displayWeather(data);
          }
      });
    }
    
    