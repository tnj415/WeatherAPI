var bgroundImg = document.querySelector("background-img")
var citySearchEl = document.querySelector(".city-search")
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
// var sh1LiEl = document.querySelector(".sh1-li")
// var sh2LiEl = document.querySelector(".sh2-li")
// var sh3LiEl = document.querySelector(".sh3-li")
// var sh4LiEl = document.querySelector(".sh4-li")
// var sh5LiEl = document.querySelector(".sh5-li")
// var fav1El = document.querySelector(".fav1")
// var fav2El = document.querySelector(".fav2")
// var fav3El = document.querySelector(".fav3")
// var fav4El = document.querySelector(".fav4")
// var fav5El = document.querySelector(".fav5")
// var addFavEl = document.querySelector(".add-fav")
// var addFavEl = document.querySelector(".sub-fav")
var sh1ClickEl = document.querySelector(".sh1-click")
var sh2ClickEl = document.querySelector(".sh2-click")
var sh3ClickEl = document.querySelector(".sh3-click")
var sh4ClickEl = document.querySelector(".sh4-click")
var sh5ClickEl = document.querySelector(".sh5-click")
// var addHistEl = document.querySelector(".add-hist")
// var subHistEl = document.querySelector(".sub-hist")
// var historySize = JSON.parse(localStorage.getItem("histSize")) || 5
var recentSearch = ""
var shArr = JSON.parse(localStorage.getItem("shArr")) || []

// var favArr = [
//     f1 = localStorage.getItem("f1"),
//     f2 = localStorage.getItem("f2"),
//     f3 = localStorage.getItem("f3"),
//     f4 = localStorage.getItem("f4"),
//     f5 = localStorage.getItem("f5"),
// ]

// addHistEl.addEventListener("click", function () {

//     ++historySize
//     localStorage.setItem("histSize", historySize)

// })

// subHistEl.addEventListener("click", function () {

//     --historySize
//     localStorage.setItem("histSize", historySize)

// })

sh1ClickEl.addEventListener("click", function () {

    getAPI1(sh1ClickEl.innerText)
})



sh2ClickEl.addEventListener("click", function () {

    getAPI1(sh2ClickEl.innerText)
})


sh3ClickEl.addEventListener("click", function () {

    getAPI1(sh3ClickEl.innerText)
})


sh4ClickEl.addEventListener("click", function () {

    getAPI1(sh4ClickEl.innerText)
})


sh5ClickEl.addEventListener("click", function () {

    getAPI1(sh5ClickEl.innerText)
})


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
            else {

                recentSearch = city
                searchHistory(recentSearch)
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
    tempEl.innerText = "Temperature: " + data.main.temp + " °F";
    humEl.innerText = "Humidity: " + data.main.humidity + " %";
    wsEl.innerText = "Wind Speed: " + data.wind.speed + " MPH"


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

    if (data.current.uvi <= 2) {
        uviEl.style.backgroundColor = "green"
        uviEl.style.color = "white"
    }
    else if (data.current.uvi > 2 && data.current.uvi <= 5) {
        uviEl.style.backgroundColor = "yellow"
        uviEl.style.color = "black"
    }
    else if (data.current.uvi > 5 && data.current.uvi <= 7) {
         uviEl.style.backgroundColor = "orange"
         uviEl.style.color = "black"
    }
    else if (data.current.uvi > 8 && data.current.uvi <= 10) {
        uviEl.style.backgroundColor = "red"
        uviEl.style.color = "white"
    }

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

function searchHistory(recentSearch) {

    var doubleSave = false
for (var i = 0; i < 5; i++) {
    if (localStorage.getItem("shArr") !== null && recentSearch === shArr[i]) 
    doubleSave = true
}

    if (localStorage.getItem("shArr") === null)
    shArr = [recentSearch]
    else if (doubleSave !== true) {
        shArr.unshift(recentSearch)
        shArr.splice(5,1)
    }

    
        // shArr[4] = shArr[3]
        // shArr[3] = shArr[2]
        // shArr[2] = shArr[1]
        // shArr[1] = shArr[0]
        // shArr[0] = recentSearch
    

    localStorage.setItem("shArr", JSON.stringify(shArr))

    displaySearchHistory()
}

function displaySearchHistory() {

    if (shArr[0] !== undefined) {
        console.log("shArr[0] = " + shArr[0])
        sh1ClickEl.innerText = shArr[0]
    }
    if (shArr[1] !== undefined) {
        console.log("shArr[1] = " + shArr[1])
        sh2ClickEl.innerText = shArr[1]
    }
    if (shArr[2] !== undefined) {
        console.log("shArr[2] = " + shArr[2])
        sh3ClickEl.innerText = shArr[2]
    }
    if (shArr[3] !== undefined) {
        console.log("shArr[3] = " + shArr[3])
        sh4ClickEl.innerText = shArr[3]
    }
    if (shArr[4] !== undefined) {
        console.log("shArr[4] = " + shArr[4])
        sh5ClickEl.innerText = shArr[4]
    }

    citySearchEl.value = ""

}

function init() {

    if (localStorage.getItem("shArr") !== null)
    displaySearchHistory();
    getAPI1("San Francisco");

}

init();
