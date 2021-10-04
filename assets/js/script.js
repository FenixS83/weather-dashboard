// Api elements
var APIkey = `ea3cc374537ac734a5e9057bfff093d4`;
var rootURL = `https://api.openweathermap.org/`;

// DOM elements
var searchBtnEl = document.getElementById(`searchBtn`)
var searchCityEl = document.getElementById(`searchCity`)
var boldDataEL = document.getElementById(`boldData`)
var tempMainEl = document.getElementById(`tempMain`)
var windMainEl = document.getElementById(`windMain`)
var humidMainEl = document.getElementById(`humidMain`)
var uvMainEl = document.getElementById(`uvMain`)
var forecastEL = document.getElementById(`forecast`)
var forecastBlock = document.getElementById(`div`)
var colorBlock = document.getElementById(`.color`)

// Search History Button
searchHistoryBtn();
var appDate = function (time) {
    var displayDate = new Date ();
    displayDate.setTime(time*1000);
    var dd = displayDate.getDate();
    var mm = displayDate.getMonth() + 1;
    var y = displayDate.getFullYear();
    return mm + `/` + dd + `/` + y;
}


var formSubmitHandler = function (event) {
    event.preventDefault();

    // get City Name from input element
    var cityName = searchCityEl.value.trim();

    if(cityName) {
        getInitialData(cityName);
        searchCityEl.value=``;
        history(cityName);
    } else {
        alert(`Please enter a valid city`);
    }
};

// function involving Geocoding API
var getInitialData = function (cityName) {
    var firstApi = rootURL + `/geo/1.0/direct?q=` + cityName + `&limit=5&appid=` + APIkey;

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
    var secondApi = rootURL + `/data/2.5/onecall?lat=` + lat + `&lon=` + lon + `&exclude=hourly,minutely&units=imperial&appid=` + APIkey;

    fetch(secondApi)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        boldDataEL.innerHTML = `<span class="bold">${cityName}  (${appDate(data.current.dt)}) </span> <img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" /> `;
        tempMainEl.innerHTML = `Temp: ${data.current.temp} &186F`
        windMainEl.innerHTML = `Wind: ${data.current.wind_speed} MPH`
        humidMainEl.innerHTML = `Humidity: ${data.current.humidity} %`
        uvMainEl.innerHTML = `UV Index: <span class = "color">  ${data.current.uvi}  </span>`
        $(".main").addClass("mainDisplay")


        if (data.current.uvi <= 2) {
            $(".color").addClass("green");
            $(".color").removeClass("yellow");
            $(".color").removeClass("red");

        } else if (data.current.uvi <=5) {
            colorBlock.classList.add("yellow");
            colorBlock.classList.remove("green");
            colorBlock.classList.remove("red");

        } else {
            colorBlock.classList.add("red");
            colorBlock.classList.remove("yellow");
            colorBlock.classList.remove("green");
        }

        $ (forecastBlock).empty()

        for (let i=1; i < 6; i++) {
            var forecastBlock = document.createElement("div")
            forecastBlock.classList.add("fblock")
            forecastBlock.classList.add("col")

            $(forecastBlock).append(appDate(data.daily[i].dt));
            $(forecastBlock).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
            $(forecastBlock).append("<p>TEmp: " + data.daily[i].temp.day + " °F</p>");
            $(forecastBlock).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
            $(forecastBlock).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");

            $(forecastEL).append(forecastBlock)
        }

    });

}



function history(cityName) {
    $("#historyButtons").empty();
    var savedCity = localStorage.getItem("cities")
    var cityConditional = savedCity ? JSON.parse(savedCity) : [];
    var currentCity = {cities: cityName}

    cityConditional.push(currentCity);

    localStorage.setItem("cities", JSON.stringify(cityConditional))

    searchHistoryBtn
}

function searchHistoryBtn() {
    var cityList    = localStorage.getItem("cities")
    listConditional = cityList ? JSON.parse(cityList) : []

    for (let i=0; i < listConditional.length; i++) {

        var historyBtn = document.createElement("button")
        historyBtn.setAttribute("data", (listConditional[i].cities))
        historyBtn.classList.add("buttons")
        historyBtn.textContent = (listConditional[i].cities)
        $("#historyButtons").append(historyBtn);
    }
}

$("#historyButtons").on("click", function (event) {
    getInitialData(event.target.textContent)
})


searchBtnEl.addEventListener(`click`, formSubmitHandler)

