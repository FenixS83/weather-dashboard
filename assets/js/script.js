var searchHistory = [];
var APIkey = "ea3cc374537ac734a5e9057bfff093d4";
var rootURL = "https://api.openweathermap.org/";
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var currentWeather = document.querySelector("#today");
var forecastWeather = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");

var city;
var searchForm;


function getLatLong(event) {
  event.preventDefault();
  console.log(event);
  var city = searchInput.value.trim();
  var coordinatesURL =
    rootURL + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIkey;
  console.log(city);

  fetch(coordinatesURL)
    .then(function (response) {
        if(response[0] != undefined) {
            var lat = response[0].lat
            var lon = response[0].lon
        }




        return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat, data[0].lon)
      console.log(data[0].lat, data[0].lon)
      var lat = data[0].lat;
      var lon = data[0].lon;
    });
}

function getWeather(lat, lon) {
    console.log("inside getWeather( function");
    console.log(lat, lon);
}

searchForm.addEventListener("submit", getLatLong);
























