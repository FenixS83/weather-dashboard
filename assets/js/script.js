var searchHistory=[];
var APIkey = "ea3cc374537ac734a5e9057bfff093d4";
var rootURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";

var serachForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var currentWeather = document.querySelector("#today");
var forecastWeather = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");

function getLatLong(event) {
    event.preventDefault();
    console.log(event);
}





serachForm.addEventListener("submit", )


