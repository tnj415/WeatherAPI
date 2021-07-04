var cagEl = document.querySelector(".city-at-glance")
//var iconEl = document.querySelector("#w-icon")
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
        getAPI(userInputEl.value)
    }
}

function getAPI(city) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=imperial&appid="
        + apiKey)

        .then(function (response) {
            console.log(response.status);

            if (response.status !== 200) {
                response.text.textContent = response.status;
            }
        
        return response.json()
        })
        .then(function (data) {
        console.log(data)
    displayWeather(data)
        });
}

function displayWeather(data) {
    //data.weather[0].icon

    cagEl.innerText = data.name + " " + moment().format("MM/DD/YYYY")
    tempEl.innerText = "Temperature: " + data.main.temp + "°F";
    humEl.innerText = "Humidity: " + data.main.humidity + "%";
    wsEl.innerText = "Wind Speed: " + data.wind.speed + "MPH"
}









    // .then(function (response) {
    //     if (!response.ok) {
    //     throw response.json();
    //     }

    //     return response.json();
    // })
    // .then(function (data) {
    //     console.log(data);
    // })
    // .catch(function (error) {
    //     console.error(error)
    // })


