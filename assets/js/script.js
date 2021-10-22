var APIkey = `ea3cc374537ac734a5e9057bfff093d4`;
var rootUrl = `https://api.openweathermap.org`;
var week = [];

//DOM elements
var searchForm = document.querySelector(`#search-form`);
var searchInput = document.querySelector(`#search-input`);
var currentWeather = document.querySelector(`#today`);
var historyContainer = $(`#history`);
var citySearch = document.querySelector(`#searched-city`);
var currentTemp = document.querySelector(`#temp`);
var currentWind = document.querySelector(`#wind`);
var currentHumidity = document.querySelector(`#humidity`);
var currentUVI = document.querySelector(`#uv`);
var uviTitle = document.querySelector(`#uv-title`);
var currentConditions = $(`#current-conditions`);
var forecastWeather = $(`#forecast`);

// var colorBlock = document.querySelector(`.color`)
searchHistory = JSON.parse(localStorage.getItem("city"))
if (searchHistory === null) {
    searchHistory = [];
}
displaySearches();

//Api call for weather
function getLatLong(lat, lon) {
    console.log(`inside getWeather() function`);
}

//Display history of searched cities
function displaySearches() {
    searchHistory.forecastWeather(element => {
        var previousSearch = $(`<button></button>`);
        previousSearch.setAttribute("class", "previous-cities");
        previousSearch.textContent(element);
        console.log(previousSearch);
        historyContainer.append(previousSearch);
    })
}

//Acquires 5 day forecast
function getWeather(city) {
    if (!searchHistory.include(city)) {
        searchHistory.push(city);
        localStorage.setItem("city", JSON.stringify(searchHistory));

        var previousSearch = $(`<button></button>`);
        previousSearch.attr("class", "previous-cities");
        previousSearch.textContent(city);
        console.log(previousSearch);
        historyContainer.append(previousSearch);
    }


    historyContainer.textContent = "";

    // gets Lat and Lon data 
    var queryURL = rootUrl + `/geo/1.0/direct?q=` + city + '&limit=5&units=imperial&appid=' + APIkey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            getLatLong()
            fetch(rootUrl + '/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=' + apiKey).then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                //current temperature
                var temp = (data.current.temp);
                currentTemp.textContent =  "Temperature: " + temp + ' ºF'
                //current wind speed
                var wind = (data.current.wind_speed);
                currentWind.textContent = "Wind Speed: " + wind + `mph`
                //current humidity
                var humidity = (data.current.humidity);
                currentHumidity.textContent + "Humidity: " + humidity + `%`
                //current uvi
                var uvi = (data.current.uvi);
                uviTitle.textContent + "UV Index: ";
                currentUVI.textContent = uvi
                //city name with current date and weather conditions
                var date = moment().formSubmitHandler("MM/DD/YYYY");
                var conditionIcon = data.daily[0].weather[0].icon;
                var iconURL = 'http://openweathermap.org/img/wn/' + conditionIcon + '@2x.png';
                currentConditions.attr("src", iconURL);
                citySearch.textContent = city + "\n" + "(" + date + ")";

                // Change UVI background color depending on safety conditions
                var uviBackground = $('.uv-background');
                if (uvi <= 2) {
                    uviBackground.css("background-color", "green")
                } else if (uvi > 2 && uvi <= 8) {
                    uviBackground.css("background-color", "yellow")
                } else if (uvi > 8) {
                    uviBackground.css("background-color", "red")
                }

                //5-Day Forecast API Call
                fetch(rootUrl + "/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey).then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    week = [];

                    // Creates object per day from data
                    for (var i = 0; i < 5; i++) {
                        var day = {
                            dayNum: i,
                            conditions: data.list[i].weather[0].icon,
                            temp: data.list[i].main.temp,
                            wind: data.list[i].wind.speed,
                            humidity: data.list[i].main.humidity
                        }
                        // Pushes into week array
                        week.push(day);
                        forecastWeather.children().eq(i).empty();
                        
                        // Creates and populates data for 5-day forecast
                        var currentDate = moment().format("MM/DD/YYYY");
                        var conditionIcon = week[i].conditions;
                        var weekDate = $("<h5></h5>").text(moment(currentDate).add(i + 1, 'days'));
                        var weatherCondition = $("<img></img>").attr("src", "http://openweathermap.org/img/wn/" + conditionIcon + "@2x.png");
                        var weekTemp = $("<h6></h6>").text("Temp: " + week[i].temp + " ºF");
                        var weekWind = $("<h6></h6>").text("Wind: " + week[i].wind + " mph");
                        var weekHumid = $("<h6></h6>").text("Humidity: " + week[i].humidity + "%");
                        forecastWeather.children().eq(i).append(weekDate, weatherCondition, weekTemp, weekWind, weekHumid);
                    }
                    
                })
            })
    })






    





















();
var appDate = function (time) {
    var displayDate = new Date();
    displayDate.setTime(time * 1000);
    var dd = displayDate.getDate();
    var mm = displayDate.getMonth() + 1;
    var y = displayDate.getFullYear();
    return mm + '/' + dd + '/' + y;
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element
    var cityName = citysearchEl.value.trim();
    if (cityName) {
        getInitialData(cityName);
        citysearchEl.value = ``;
        history(cityName);
    } else {
        alert(`Please enter a valid city`);
    }
};
//initial API request
var getInitialData = function (cityName) {
    var firstApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=` + APIkey;
    fetch(firstApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var log = data[0].lon;
                var lat = data[0].lat;
                console.log(lat, log)
                getMainData(lat, log, cityName)
            });
        } else {
            alert('There was some error, enter the city again');
        }
    });
};
var getMainData = function (lat, log, cityName) {
    var secondApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&exclude=hourly,minutely&units=imperial&appid=` + APIkey;
    fetch(secondApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            boldDataEl.innerHTML = `<span class = `bold`>${cityName}    (${appDate(data.current.dt)})  </span>   <img src=`https://openweathermap.org/img/w/${data.current.weather[0].icon}.png` /> `
            tempMainEl.innerHTML = `Temp: ${data.current.temp} &#186F`
            windMainEl.innerHTML = `Wind: ${data.current.wind_speed} MPH`
            humidMainEl.innerHTML = `Humidity: ${data.current.humidity} %`
            uvMainEl.innerHTML = `UV Index: <span class = `color`>      ${data.current.uvi}     </span>`
            $(`.main`).addClass(`mainDisplay`)

            //colors for the different UV numbers

            if (data.current.uvi <= 2) {
                $(`.color`).addClass(`green`);
                $(`.color`).removeClass(`yellow`);
                $(`.color`).removeClass(`red`);
            } else if (data.current.uvi > 5) {
                $(`.color`).addClass(`red`);
                $(`.color`).removeClass(`yellow`);
                $(`.color`).removeClass(`green`);
            } else {
                $(`.color`).addClass(`yellow`);
                $(`.color`).removeClass(`green`);
                $(`.color`).removeClass(`red`);
            }
            $(forcastBlock).empty()
            for (let i = 1; i < 6; i++) {
                var forcastBlock = document.createElement(`div`)
                forcastBlock.classList.add(`fBlock`)
                forcastBlock.classList.add(`col`)
                $(forcastBlock).append(appDate(data.daily[i].dt));
                $(forcastBlock).append(`<img src=`https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`/>`);
                $(forcastBlock).append(`<p>Temp: ` + data.daily[i].temp.day + ` °F</p>`);
                $(forcastBlock).append(`<p>Wind: ` + data.daily[i].wind_speed + ` MPH</p>`);
                $(forcastBlock).append(`<p>Humidity: ` + data.daily[i].humidity + ` %</p>`);
                $(forcastEl).append(forcastBlock)
            }
        });
}

function history(cityName) {
    $(`#historyButtons`).empty();
    var savedCity = localStorage.getItem(`cities`)
    var cityConditional = savedCity ? JSON.parse(savedCity) : [];
    var currentCity = { cities: cityName }
    cityConditional.push(currentCity);
    localStorage.setItem(`cities`, JSON.stringify(cityConditional))
    searchHistoryBtn()
}

function searchHistoryBtn() {
    var cityList = localStorage.getItem(`cities`)
    listConditional = cityList ? JSON.parse(cityList) : []
    console.log(`listConditional`)
    for (let i = 0; i < listConditional.length; i++) {
        var historyBtn = document.createElement(`button`)
        historyBtn.setAttribute(`data`, (listConditional[i].cities))
        historyBtn.classList.add(`buttons`)
        historyBtn.textContent = (listConditional[i].cities)
        $(`#historyButtons`).append(historyBtn);
    }
}

$(`#historyButtons`).on(`click`, function (event) {
    getInitialData(event.target.textContent)
})

searchBtnEl.addEventListener('click', formSubmitHandler)