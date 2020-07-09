const apiKey = "8741f2e5cae0f9050a3f597c15ae4ae4";
let loading;
let weatherData;
let conversion = "F";

const getLocation = () => {
  loading = true;
  try {
    navigator.geolocation.getCurrentPosition(async (res) => {
      let lat = res.coords.latitude;
      let long = res.coords.longitude;
      getWeather(lat, long);
    });
  } catch (err) {
    const el = document.getElementById("loading");
    el.innerText = "Something went wrong. Please reload.";
  }
};

const getWeather = async (lat, long) => {
  try {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((res) => {
        loading = false;
        weatherData = res;
        populateDOM();
      });
  } catch (err) {
    const el = document.getElementById("loading");
    el.innerText = "Something went wrong. Please reload.";
  }
};

const populateDOM = () => {
  const loading = document.getElementById("loading");
  loading.setAttribute("class", "hidden");
  const weatherBox = document.getElementById("weather");
  weatherBox.setAttribute("class", "");
  const cityName = document.getElementById("city-name");
  cityName.innerHTML = `<h1>${weatherData.name}</h1>`;
  const temperature = document.getElementById("temperature");
  temperature.innerText = `${setConversion(
    weatherData.main.temp
  )}º${conversion}`;
  temperature.addEventListener("click", () => {
    conversion === "C" ? (conversion = "F") : (conversion = "C");
    temperature.innerText = `${setConversion(
      weatherData.main.temp,
      conversion
    )}º${conversion}`;
  });
  const sky = document.getElementById("sky");
  sky.innerHTML = `<h2 >${weatherData.weather[0].main}</h2>`;
  const icon = document.getElementById("icon");
  icon.innerHTML = `<img src='https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png'></img>`;
};

const setConversion = (temp, type = "F") => {
  switch (type) {
    case "C":
      return Math.floor(temp - 273.15);
    case "F":
      return Math.floor((temp - 273.15) * 1.8 + 32);
  }
};

getLocation();
