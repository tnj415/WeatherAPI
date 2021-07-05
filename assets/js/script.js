var bgroundImg = document.querySelector("background-img")
var cityEl = document.querySelector(".city")
var dateEl = document.querySelector(".date")
var iconEl = document.querySelector(".w-icon")
var tempEl = document.querySelector(".temp")
var humEl = document.querySelector(".hum")
var wsEl = document.querySelector(".ws")
var uviEl = document.querySelector(".uvi")

var userInputEl = document.querySelector(".city-search")
var searchBtnEl = document.querySelector(".search-btn")

var ss1DateEl = document.querySelector(".ss1-date")
var ss2DateEl = document.querySelector(".ss2-date")
var ss3DateEl = document.querySelector(".ss3-date")
var ss4DateEl = document.querySelector(".ss4-date")
var ss5DateEl = document.querySelector(".ss5-date")
var ss1ImgEl = document.querySelector(".ss1-img")
var ss2ImgEl = document.querySelector(".ss2-img")
var ss3ImgEl = document.querySelector(".ss3-img")
var ss4ImgEl = document.querySelector(".ss4-img")
var ss5ImgEl = document.querySelector(".ss5-img")
var ss1TempEl = document.querySelector(".ss1-temp")
var ss2TempEl = document.querySelector(".ss2-temp")
var ss3TempEl = document.querySelector(".ss3-temp")
var ss4TempEl = document.querySelector(".ss4-temp")
var ss5TempEl = document.querySelector(".ss5-temp")
var ss1HumEl = document.querySelector(".ss1-hum")
var ss2HumEl = document.querySelector(".ss2-hum")
var ss3HumEl = document.querySelector(".ss3-hum")
var ss4HumEl = document.querySelector(".ss4-hum")
var ss5HumEl = document.querySelector(".ss5-hum")


var apiKey = "28ef248f0eebeeb867508af6072a7c3e"

searchBtnEl.addEventListener("click", searchCity);

function searchCity(e) {
    e.preventDefault();
    if (userInputEl.value != "") {
        getAPI1(userInputEl.value)
    }
}

function getAPI1(city) {

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')"
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=imperial&appid="
        + apiKey)

        .then(function (response) {
            console.log("R1: " + response.status);

            if (response.status !== 200) {
                response.text.textContent = response.status;
            }

            return response.json()
        })
        .then(function (data) {
            console.log(data)
            displayWeather1(data)
            console.log("api1 lat = " + data.coord.lat)
            console.log("api1 lon = " + data.coord.lon)

            getAPI2(data.coord.lat, data.coord.lon)

        });
}




function getAPI2(lat, lon) {

    var lati = lat;
    var long = lon;

    console.log("lat = " + lati)
    console.log("lon = " + long)
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
        + lati
        + "&lon="
        + long
        + "&appid="
        + apiKey)
        .then(function (response) {
            console.log("R2: " + response.status);

            if (response.status !== 200) {
                response.text.TextContent = response.status;
            }

            return response.json()
        })
        .then(function (data) {
            displayWeather2(data)
            console.log(data)
            displayFiveDayForecast(data)
        })
}

function displayWeather1(data) {
    //data.weather[0].icon

    cityEl.innerText = data.name
    iconEl.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
    tempEl.innerText = "Temperature: " + data.main.temp + "°F";
    humEl.innerText = "Humidity: " + data.main.humidity + "%";
    wsEl.innerText = "Wind Speed: " + data.main.speed + "MPH"

    
}

function displayWeather2(data) {
    //data.weather[0].icon

    console.log("tz offset = " + data.timezone_offset)
    var hrDiff = (data.timezone_offset + 25200) / 3600
    console.log("hrDiff = " + hrDiff)

    //     if (parseInt(moment().format("HH"), 10) + hrDiff >=24) {
    //     dateEl.innerText = moment().calendar('[Tomorrow]', "MM/DD/YYYY")
    // }
    // else if (parseInt(moment().format("HH"), 10) + hrDiff < 24) {
    dateEl.innerText = moment().format("MM/DD/YYYY")
    // }
    // else console.log("ERROR IN DW2")

    uviEl.innerText = "UV Index: " + (data.current.uvi).toFixed(2)
}

// function setDate () {




function displayFiveDayForecast(data) {

    console.log("5df = ", data)

    //snapshot1
    ss1DateEl.innerText = moment().format("MM/DD/YYYY")

    ss1ImgEl.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png"

    ss1TempEl.innerText = "Temp: " + data.daily[0].temp.day + "°F"

    ss1HumEl.innerText = "Humidity: " + data.daily[0].humidity + "%"

    //snapshot2
    ss2DateEl.innerText = moment().format("MM/DD/YYYY")

    ss2ImgEl.src = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png"

    ss2TempEl.innerText = "Temp: " + data.daily[1].temp.day + "°F"

    ss2HumEl.innerText = "Humidity: " + data.daily[1].humidity + "%"

    //snapshot3
    ss3DateEl.innerText = moment().format("MM/DD/YYYY")

    ss3ImgEl.src = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png"

    ss3TempEl.innerText = "Temp: " + data.daily[2].temp.day + "°F"

    ss3HumEl.innerText = "Humidity: " + data.daily[2].humidity + "%"

    //snapshot4
    ss4DateEl.innerText = moment().format("MM/DD/YYYY")

    ss4ImgEl.src = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png"

    ss4TempEl.innerText = "Temp: " + data.daily[3].temp.day + "°F"

    ss4HumEl.innerText = "Humidity: " + data.daily[3].humidity + "%"

    //snapshot5
    ss5DateEl.innerText = moment().format("MM/DD/YYYY")

    ss5ImgEl.src = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png"

    ss5TempEl.innerText = "Temp: " + data.daily[4].temp.day + "°F"

    ss5HumEl.innerText = "Humidity: " + data.daily[4].humidity + "%"




}
