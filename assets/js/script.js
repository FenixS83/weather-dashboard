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

// Search History Button
searchHistoryBtn();
var appDate = function (time) {
    var displayDate = new Date ();
    displayDate.setTime(time*1000);
    var dd = displayDate.getDate();
    var mm = displayDate.getMonth() + 1;
    var y = displayDate.getFullYear();
    return mm + "/" + dd + "/" + y;
}


var formSubmitHandler = function (event) {
    event.preventDefault();

    // get City Name from input element
    var cityName = searchCityEl.value.trim();

    if(cityName) {
        getInitialData(cityName);
        searchCityEl.value="";
        history(cityname);
    } else {
        alert("Please enter a valid city");
    }
};

// function involving Geocoding API
var getInitialData = function (cityName) {
    var firstApi = rootURL + "/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + APIkey;

    fetch(firstApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lon = data[0].lon;
                var lat = data[0].lat;
                getMainData(lat, lon, cityName)
            });

        } else {
            return response;
        }
    });
};

// function involving OneCall API
var getMainData = function (lat, lon, cityName) {
    var secondApi = rootURL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" APIkey;
    


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
























