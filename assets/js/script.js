// Api elements
var APIkey = "ea3cc374537ac734a5e9057bfff093d4";
var rootURL = "https://api.openweathermap.org/";

// DOM elements
var searchBtnEl = document.getElementById("searchBtn")
var searchCityEl = document.getElementById("searchCity")
var boldDataEL = document.getElementById("boldData")
var tempMainEl = document.getElementById("tempMain")
var windMainEl = document.getElementById("windMain")
var humidMainEl = document.getElementById("humidMain")
var uvMainEl = document.getElementById("uvMain")
var forecastEL = document.getElementById("forecast")
var forecastBlock = document.getElementById("div")
var colorBlock = document.getElementById(".color")


searchHistoryBtn();
var appDate = function (time) {
    var displayDate = new Date ();
    displayDate.setTime(time*1000);
    var dd = displayDate.getDate();
    var mm = displayDate.getMonth() + 1;
    var y = displayDate.getFullYear();
    return mm + "/" + dd + "/" + y;
}












































var searchHistory = [];
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
























