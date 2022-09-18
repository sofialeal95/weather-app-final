function displayTemperature(response) {
  let showCity = document.querySelector("#city");
  let showDescription = document.querySelector("#description");
  let showTemp = document.querySelector("#temperature");
  let showHumidity = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");

  showCity.innerHTML = response.data.name;
  showDescription.innerHTML = response.data.weather[0].description;
  showTemp.innerHTML = Math.round(response.data.main.temp);
  showHumidity.innerHTML = response.data.main.humidity;
  showWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
}

let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);
