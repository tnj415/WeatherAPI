var cityEl = document.querySelector(".city")
var dateEl = document.querySelector(".date")
var iconEl = document.querySelector(".w-icon")
var tempEl = document.querySelector(".temp")
var humEl = document.querySelector(".hum")
var wsEl = document.querySelector(".ws")
var uviEl = document.querySelector(".uvi")
var userInputEl = document.querySelector(".city-search")
var cityInput = "";
var searchBtn = document.querySelector(".search-btn")
var apiKey = "28ef248f0eebeeb867508af6072a7c3e"

searchBtn.addEventListener("click", searchCity);

function searchCity(e) {
    e.preventDefault();
    if (userInputEl.value != "") {
        getAPI1(userInputEl.value)
    }
}

function getAPI1(city) {

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
        })
}

function displayWeather1(data) {
    //data.weather[0].icon

    cityEl.innerText = data.name
    iconEl.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
    tempEl.innerText = "Temperature: " + data.main.temp + "°F";
    humEl.innerText = "Humidity: " + data.main.humidity + "%";
    wsEl.innerText = "Wind Speed: " + data.wind.speed + "MPH"
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

function setDate () {


}
