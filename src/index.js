//document.write(myDate)

let currentDate = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[currentDate.getDay()];
let date = currentDate.getDate().toString().padStart(2, "0");
let month = (currentDate.getMonth()+1).toString().padStart(2, "0");
let year = currentDate.getFullYear();
let hours = (currentDate.getHours()).toString().padStart(2, "0");
let minutes = (currentDate.getMinutes()).toString().padStart(2, "0");

function formatDate() {
  return fullDate
}
let userDate = document.querySelector("#date");
userDate.innerHTML = `${date}.${month}.${year}`;
let fullDate = userDate.innerHTML;
formatDate();

function formatDay() {
  return weekDay;
}
let day = document.querySelector("#day");
day.innerHTML = currentDay;
let weekDay = day.innerHTML;
formatDay();

function formatTime() {
  return fullTime
}
let userTime = document.querySelector("#time");
userTime.innerHTML = `${hours}:${minutes}`;
let fullTime = userTime.innerHTML;
formatTime();

/*
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];
  //let date = currentDate.getDate().toString().padStart(2, "0");
  let month = (date.getMonth()+1).toString().padStart(2, "0");
  let year = date.getFullYear();
  let hours = (date.getHours()).toString().padStart(2, "0");
  let minutes = (date.getMinutes()).toString().padStart(2, "0");
  
  return fullDate = `${date}.${month}.${year}`;
  //return weekDay = day;
  //return fullTime = `${hours}:${minutes}`;
}
*/

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
  document.querySelector("#wind-value").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#unit").innerHTML = "&deg;C";
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  //document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  //document.querySelector("#day").innerHTML = formatDate(response.day.dt * 1000);
  //document.querySelector("#time").innerHTML = formatDate(response.time.dt * 1000);
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
    //let iconWeatherCurrent = response.data.weather[0].icon;
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
    //iconWeather.innerHTML = iconWeatherCurrent;
    windValue.innerHTML = windCurrent;
    humidityValue.innerHTML = humidityCurrent;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#unit").innerHTML = "&deg;C";
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
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
      document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
      document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      document.querySelector("#unit").innerHTML = "&deg;C";
      document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

      celsiusTemperature = response.data.main.temp;
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
      document.querySelector("#wind-value").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
      document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      document.querySelector("#unit").innerHTML = "&deg;C";
      document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

      celsiusTemperature = response.data.main.temp;
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
      document.querySelector("#wind-value").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
      document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      document.querySelector("#unit").innerHTML = "&deg;C";
      document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

      celsiusTemperature = response.data.main.temp;
  }

  let buttonKyiv = document.querySelector("#kyiv");
  buttonKyiv.addEventListener("click", showLocationCityKyiv);

  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("h1 span#temperature");
    let temperature = temperatureElement.textContent;
    let temperatureElementUnit = document.querySelector("#unit");
    let celFarIconElement = document.querySelector("#scale-icon");
    
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    
    temperature = Number(temperature);
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

/*
  let apiUrl = здесть прописать урл
function showTemperature(response) {
    console.log(response.data);
}
axios.get(apiUrl).then(showTemperature)
*/