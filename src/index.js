//document.write(myDate)

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let date = currentDate.getDate().toString().padStart(2, "0");
  let month = (currentDate.getMonth()+1).toString().padStart(2, "0");
  let year = currentDate.getFullYear();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];
  let hours = (currentDate.getHours()).toString().padStart(2, "0");
  let minutes = (currentDate.getMinutes()).toString().padStart(2, "0");

  return `${date}.${month}.${year}
  <div class="day" id="day">${day}<span id="time"> ${hours}:${minutes}</span></div>`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return days[day];
}

/*
function formatDay(timestamp) {
  let currentDate = new Date(timestamp * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = days[currentDate.getDay()];
  return weekDay;
}
*/

//Data Locations & Temperature
let apiWeatherKey = "08d08cd55f188d3e8f4f52e96493f678";

//get position Current Location || ?q=Paris& or ?g={city}
//get city default
function cityDefault(city) {
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
  axios.get(apiWeatherUrl).then(showWeatherCityNK);
}
cityDefault("Nova Kakhovka");

//get position User City
function formCitySubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
  cityDefault(city);
  axios.get(apiWeatherUrl).then(displayWeatherUserForm);
}

function displayWeatherUserForm(response) {
  document.querySelector("#city-user").innerHTML = response.data.name;
  document.querySelector(".region").innerHTML = `Country: ${response.data.sys.country}`;
  document.querySelector("h1 span#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#temp-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind-value").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#unit").innerHTML = "&deg;C";
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

let formCity = document.querySelector("#form-search-city");
formCity.addEventListener("submit", formCitySubmit);

//get position Current Location
function showPositionCurrentLoc(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiWeatherKey}&units=metric`;
  
  axios.get(apiWeatherUrl).then(showTemperatureCurrentLoc);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionCurrentLoc);
}

function showTemperatureCurrentLoc(response) {
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let city = response.data.name;
    let countryCode = response.data.sys.country;
    let windCurrent = Math.round(response.data.wind.speed);
    let humidityCurrent = response.data.main.humidity;

    celsiusTemperature = response.data.main.temp;
    
    let temperatureElement = document.querySelector("h1 span#temperature");
    let tempDescription = document.querySelector("#temp-description");
    let cityUser = document.querySelector("#city-user");
    let userCountry = document.querySelector(".region");
    let windValue = document.querySelector("#wind-value");
    let humidityValue = document.querySelector("#humidity-value");

    temperatureElement.innerHTML = temperature;
    tempDescription.innerHTML = description;
    cityUser.innerHTML = city;
    userCountry.innerHTML = `Country: ${countryCode}`;
    windValue.innerHTML = windCurrent;
    humidityValue.innerHTML = humidityCurrent;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#unit").innerHTML = "&deg;C";
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);

    celsiusTemperature = response.data.main.temp;
    getForecast(response.data.coord);
  }
  
  let buttonCurrentLoc = document.querySelector("#city-position");
  buttonCurrentLoc.addEventListener("click", getCurrentLocation);

  //get position Button Cities
  //NK (default)
  function showLocationCityNK(event) {
    event.preventDefault();
    let city = "Nova Kakhovka";
    let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
    axios.get(apiWeatherUrl).then(showWeatherCityNK);
  }

  function showWeatherCityNK(response) {
      document.querySelector("#city-user").innerHTML = "Nova Kakhovka";
      document.querySelector(".region").innerHTML = "Kherson region UA";
      document.querySelector("h1 span#temperature").innerHTML = Math.round(response.data.main.temp);
      document.querySelector("#temp-description").innerHTML = response.data.weather[0].description;
      document.querySelector("#wind-value").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
      document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      document.querySelector("#unit").innerHTML = "&deg;C";
      document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
      document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);

      celsiusTemperature = response.data.main.temp;
      getForecast(response.data.coord);
  }

  let buttonNovaKakhovka = document.querySelector("#nova-kakhovka");
  buttonNovaKakhovka.addEventListener("click", showLocationCityNK);
  
  //Weather Forecast
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");
    let forecastHTML = `<div class="col-sm">`;
    
    forecast.forEach(function (forecastDay, index) {
      if ((index > 0) & (index < 6)) {
        forecastHTML =
        forecastHTML +
        `
        <div class="card">
        <div class="card-body">
        <h5 class="card-title day-forecast"><strong id="day">${formatDay(forecastDay.dt)}</strong></h5>
        <div class="weather-icon-forecast">
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="icon-forecast" width="44" />
        </div>
        <p class="card-text temperature-forecast">
        <span><strong id="temperature-day>${Math.round(forecastDay.temp.max)}</strong></span>
        <span><strong id="unit-forecast"> &deg;C</strong></span>
        <span> | </span>
        <span id="temperature-night">${Math.round(forecastDay.temp.min)}</span>
        <span id="unit-forecast"> &deg;C</span>
        </p>
        </div>
        </div>

        `;
      }
    });
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  function getForecast(coordinates) {
    let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiWeatherKey}&units=metric`;
    axios.get(apiWeatherUrl).then(displayForecast);
  }
  
  //Temperature celsius-fahrenheit
  function convertToFahrenheit(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    
    let temperatureElement = document.querySelector("h1 span#temperature");
    let temperatureElementUnit = document.querySelector("#unit");
    let celFarIconElement = document.querySelector("#scale-icon");
    
    temperatureElement.textContent = Math.round((celsiusTemperature * 9) / 5 + 32);
    temperatureElementUnit.innerHTML = "&deg;F";
    celFarIconElement.setAttribute("i", `class="fa fa-solid fa-scale-unbalanced fa-lg fa-3x"`);
    //<i class="fa fa-solid fa-scale-unbalanced fa-lg fa-3x" id="icon-fahrenheit"></i>
  }
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  function convertToСelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let temperatureElement = document.querySelector("h1 span#temperature");
    
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#unit").innerHTML = "&deg;C";
  }
  
  let celsiusTemperature = null;
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToСelsius);
  
