function formatDate(date) {
  let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayIndex = date.getDay();// 0 and 6
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[dayIndex];

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function displayWeatherCondition(responce) {
document.querySelector("#city").innerHTML = responce.data.name;
document.querySelector("#temperature").innerHTML = Math.round(responce.data.main.temp);
document.querySelector("#description").innerHTML = responce.data.weather[0].main;
document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(responce.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "350e1d9aaa779579a994c98932e95510";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "350e1d9aaa779579a994c98932e95510";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
} 

// feature 1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// feature 2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//DATE
let dayElement = document.querySelector("#day");
let day = currentTime.getDate();
let month = currentTime.getMonth();
if (month < 10) {
  month = `0${month}`;
}
let year = currentTime.getFullYear();
dayElement.innerHTML = `${day}/${month}/${year}`;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

