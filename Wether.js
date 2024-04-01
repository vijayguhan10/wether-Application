let degree = document.querySelector(".degree");
let district = document.querySelector(".district");
let mintemp = document.querySelector(".mintemp");
let maxtemp = document.querySelector(".maxtemp");
let inputuser = document.querySelector(".inputuser");
let wind = document.querySelector(".wind");
let Humidity = document.querySelector(".Humidity");
let cloudy = document.querySelector(".cloudy");

// Function to update weather information on UI
let datainformationcollector = (jsonData) => {
  district.textContent = jsonData.name;
  degree.textContent = jsonData.main.feels_like;
  mintemp.textContent = jsonData.main.temp_min - 10.234;
  maxtemp.textContent = jsonData.main.temp_max;
  Humidity.textContent = jsonData.main.humidity;
  wind.textContent = jsonData.wind.speed;
  cloudy.textContent = jsonData.weather[0].description;
};

navigator.geolocation.getCurrentPosition(function (position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  let weatherData = async function () {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4b9b8688eca407ea3546cf525c8f03cb&units=metric`
    );
    let jsonData = await data.json();
    datainformationcollector(jsonData); // Call datainformationcollector with jsonData
  };
  weatherData();
});

let options = {
  // year: "numeric",
  // month: "long",
  // day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
let time = document.querySelector(".time");
setInterval(() => {
  let datetime = new Date();
  let newtime = new Intl.DateTimeFormat("en-IN", options).format(datetime);
  time.textContent = newtime;
}, 1000);

inputuser.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission behavior
    let city1 = inputuser.value;
    let namecity = async function () {
      let data1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=4b9b8688eca407ea3546cf525c8f03cb&units=metric`
      );
      let jsonData = await data1.json();
      console.log(jsonData);
      if (jsonData) {
        datainformationcollector(jsonData); // Call datainformationcollector with jsonData
      }
    };
    namecity();
  }
});
