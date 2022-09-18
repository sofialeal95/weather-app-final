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
  let showCity = document.querySelector("#city");
  let showDate = document.querySelector("#date");
  let showDescription = document.querySelector("#description");
  let showTemp = document.querySelector("#temperature");
  let showHumidity = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");
  let iconId = response.data.weather[0].icon;
  let image = document.querySelector("#weather-icon");
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );
  image.setAttribute("alt", response.data.weather[0].description);

  showCity.innerHTML = response.data.name + ", " + response.data.sys.country;
  showDate.innerHTML = formatDate(response.data.dt * 1000);
  showDescription.innerHTML = response.data.weather[0].description;
  showTemp.innerHTML = Math.round(response.data.main.temp);
  showHumidity.innerHTML = response.data.main.humidity;
  showWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
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

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleInput);
