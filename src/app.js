function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours > 12) {
    hours = hours - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayTime = "";
  if (date.getHours() > 12) {
    dayTime = "PM";
  } else {
    dayTime = "AM";
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let displayDate = `${days[dayIndex]} ${hours}:${minutes} ${dayTime}`;
  return displayDate;
}

function displayTemperature(response) {
  let cityPlaceholder = document.querySelector("#city");
  let datePlaceholder = document.querySelector("#date");
  let descriptionPlaceholder = document.querySelector("#description");
  let tempPlaceholder = document.querySelector("#temperature");
  let humidityPlaceholder = document.querySelector("#humidity");
  let windPlaceholder = document.querySelector("#wind");
  let iconId = response.data.weather[0].icon;
  let image = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;

  cityPlaceholder.innerHTML =
    response.data.name + ", " + response.data.sys.country;
  datePlaceholder.innerHTML = formatDate(response.data.dt * 1000);
  descriptionPlaceholder.innerHTML = response.data.weather[0].description;
  tempPlaceholder.innerHTML = Math.round(response.data.main.temp);
  humidityPlaceholder.innerHTML = response.data.main.humidity;
  windPlaceholder.innerHTML = Math.round(response.data.wind.speed * 3.6);
  image.setAttribute("alt", response.data.weather[0].description);
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );
}

function search(city) {
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function handleInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}

function displayF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempPlaceholder = document.querySelector("#temperature");
  tempPlaceholder.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayC(event) {
  event.preventDefault();
  let tempPlaceholder = document.querySelector("#temperature");
  tempPlaceholder.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleInput);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayF);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayC);

search("New York");
