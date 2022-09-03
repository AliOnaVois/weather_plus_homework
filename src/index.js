//document.write(myDate)
let currentDate = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[currentDate.getDay()];
let date = currentDate.getDate();
let month = (currentDate.getMonth()+1).toString().padStart(2, "0");
let year = currentDate.getFullYear();
let hours = (currentDate.getHours()).toString().padStart(2, "0");
let minutes = (currentDate.getMinutes()).toString().padStart(2, "0");

function formatDate() {
  return fullDate
}
let userDate = document.querySelector(".date");
userDate.innerHTML = `${date}.${month}.${year}`;
let fullDate = userDate.innerHTML;
formatDate();

function formatDay() {
  return weekDay;
}
let day = document.querySelector(".day");
day.innerHTML = currentDay;
let weekDay = day.innerHTML;
formatDay();

function formatTime() {
  return fullTime
}
let userTime = document.querySelector(".time");
userTime.innerHTML = `time ${hours}:${minutes}`;
let fullTime = userTime.innerHTML;
formatTime();

//Data Locations & Temperature
let apiWeatherKey = "08d08cd55f188d3e8f4f52e96493f678";

//get position Current Location || ?q=Paris& or ?g={city}
//get city default
function cityDefault(city) {
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
  //axios.get(apiWeatherUrl).then(displayWeatherUserForm);
  axios.get(apiWeatherUrl).then(showWeatherCityNK);
}
cityDefault("Nova Kakhovka");

//get position User City
function formCitySubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  //let countryCode = response.data.sys.country;
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
  cityDefault(city);
  axios.get(apiWeatherUrl).then(displayWeatherUserForm);
}

function displayWeatherUserForm(response) {
  document.querySelector("#city-user").innerHTML = response.data.name;
  document.querySelector(".region").innerHTML = `Country: ${response.data.sys.country}`;
  document.querySelector("h1 span#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#temp-description").innerHTML = response.data.weather[0].description;
  //document.querySelector("#icon-weather-main").innerHTML = response.data.weather[0].icon;
  document.querySelector("#wind-value").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
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
  console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let city = response.data.name;
    let countryCode = response.data.sys.country;
    //let iconWeatherCurrent = response.data.weather[0].icon;
    let windCurrent = response.data.wind.speed;
    let humidityCurrent = response.data.main.humidity;
    
    let temperatureElement = document.querySelector("h1 span#temperature");
    let tempDescription = document.querySelector("#temp-description");
    let cityUser = document.querySelector("#city-user");
    let userCountry = document.querySelector(".region");
    //let iconWeather = document.querySelector("#icon-weather-main");
    let windValue = document.querySelector("#wind-value");
    let humidityValue = document.querySelector("#humidity-value");

    temperatureElement.innerHTML = temperature;
    tempDescription.innerHTML = description;
    cityUser.innerHTML = city;
    userCountry.innerHTML = `Country: ${countryCode}`;
    //iconWeather.innerHTML = iconWeatherCurrent;
    windValue.innerHTML = windCurrent;
    humidityValue.innerHTML = humidityCurrent;
  }
  
  let buttonCurrentLoc = document.querySelector("#city-position");
  buttonCurrentLoc.addEventListener("click", getCurrentLocation);

  //get position Button Cities
  //NK
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
      //document.querySelector("#icon-weather-main").innerHTML = response.data.weather[0].icon;
      document.querySelector("#wind-value").innerHTML = response.data.wind.speed;
      document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
  }

  let buttonNovaKakhovka = document.querySelector("#nova-kakhovka");
  buttonNovaKakhovka.addEventListener("click", showLocationCityNK);

  //Kherson
    function showLocationCityKherson(event) {
    event.preventDefault();
    let city = "Kherson";
    let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
    axios.get(apiWeatherUrl).then(showWeatherCityKherson);
  }

  function showWeatherCityKherson(response) {
      document.querySelector("#city-user").innerHTML = "Kherson";
      document.querySelector(".region").innerHTML = "Ukraine UA";
      document.querySelector("h1 span#temperature").innerHTML = Math.round(response.data.main.temp);
      document.querySelector("#temp-description").innerHTML = response.data.weather[0].description;
      //document.querySelector("#icon-weather-main").innerHTML = response.data.weather[0].icon;
      document.querySelector("#wind-value").innerHTML = response.data.wind.speed;
      document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
  }

  let buttonKherson = document.querySelector("#kherson");
  buttonKherson.addEventListener("click", showLocationCityKherson);

  //Kyiv
    function showLocationCityKyiv(event) {
    event.preventDefault();
    let city = "Kyiv";
    let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
    axios.get(apiWeatherUrl).then(showWeatherCityKyiv);
  }

  function showWeatherCityKyiv(response) {
      document.querySelector("#city-user").innerHTML = "Kyiv";
      document.querySelector(".region").innerHTML = "Ukraine UA";
      document.querySelector("h1 span#temperature").innerHTML = Math.round(response.data.main.temp);
      document.querySelector("#temp-description").innerHTML = response.data.weather[0].description;
      //document.querySelector("#icon-weather-main").innerHTML = response.data.weather[0].icon;
      document.querySelector("#wind-value").innerHTML = response.data.wind.speed;
      document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
  }

  let buttonKyiv = document.querySelector("#kyiv");
  buttonKyiv.addEventListener("click", showLocationCityKyiv);


  //navigator.geolocation.getCurrentPosition();
/*
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let countryCode = response.data.sys.country;
    //let iconWeatherCurrent = response.data.weather[0].icon;
    let windCurrent = response.data.wind.speed;
    let humidityCurrent = response.data.main.humidity;
    
    let temperatureElement = document.querySelector("h1 span#temperature");
    let tempDescription = document.querySelector("#temp-description");
    //let cityUser = document.querySelector("#city-user");
    let userCountry = document.querySelector(".region");
    //let iconWeather = document.querySelector("#icon-weather-main");
    let windValue = document.querySelector("#wind-value");
    let humidityValue = document.querySelector("#humidity-value");
*/
  
  //let cityUserSearch = document.querySelector("#city-position");
  //cityUserSearch.addEventListener("submit", formCitySubmit);


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h1 span#temperature");
  let temperature = temperatureElement.textContent;
  temperature = Number(temperature);
  temperatureElement.textContent = Math.round((temperature * 9) / 5 + 32);
  let temperatureElementUnit = document.querySelector("#unit");
  temperatureElementUnit.innerHTML = "&deg;F";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

/*
function convertToСelsius(event) {
  console.log(temperature);
  event.preventDefault();
  let temperatureElement = document.querySelector("h1 span#temperature");
  let temperature = temperatureElement.textContent;
  temperature = Number(temperature);
  temperatureElement.textContent = 52;
  let temperatureElementUnit = document.querySelector("#unit");
  temperatureElementUnit.innerHTML = "&deg;℃";
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToСelsius);
*/

/*
  let apiUrl = здесть прописать урл
function showTemperature(response) {
    console.log(response.data);
}
axios.get(apiUrl).then(showTemperature)
*/