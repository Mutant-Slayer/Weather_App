// information regarding weather api

const weatherApi = {
    key: "3f621982c8564f5788055244221608",
    baseUrl: "https://api.weatherapi.com/v1/current.json",
    aqi: "yes",
};

const searchInputBox = document.getElementById("input-box");

// countries
const countryObject = [
    "Select Country",
    "INDIA",
    "AUSTRALIA",
    "NEW ZEALAND",
    "USA",
    "UAE",
    "MAURITIUS",
];

//states
var stateObject = new Array();
stateObject[0] = ["Select State"];
stateObject[1] = [
    "Select State",
    "GUJARAT",
    "ANDHRAPRADESH",
    "DELHI",
    "GOA",
    "MADHYAPRADESH",
    "W-BENGAL",
    "TAMILNADU",
    "KARNATAKA",
    "MAHARASHTRA",
];
stateObject[2] = ["Select State", "QUEENSLAND", "VICTORIA"];
stateObject[3] = ["Select State", "AUCKLAND"];
stateObject[4] = ["Select State", "NEWJERSEY", "ILLINOIS"];
stateObject[5] = ["Select State", "DUBAI"];
stateObject[6] = ["Select State", "MAURITIUS"];

// cities
var cityObject = new Array();
cityObject["QUEENSLAND"] = ["Select City", "BRISBANE"];
cityObject["VICTORIA"] = ["Select City", "MELBOURNE"];
cityObject["ANDHRAPRADESH"] = ["Select City", "HYDERABAD"];
cityObject["KARNATAKA"] = ["Select City", "BANGALORE"];
cityObject["TAMILNADU"] = ["Select City", "CHENNAI"];
cityObject["DELHI"] = ["Select City", "DELHI"];
cityObject["GOA"] = ["Select City", "GOA"];
cityObject["W-BENGAL"] = ["Select City", "KOLKATA"];
cityObject["GUJARAT"] = ["Select City", "AHMEDABAD", "RAJKOT", "SURAT"];
cityObject["MADHYAPRADESH"] = ["Select City", "INDORE"];
cityObject["MAHARASHTRA"] = ["Select City", "MUMBAI", "PUNE"];
cityObject["AUCKLAND"] = ["Select City", "AUCKLAND"];
cityObject["NEWJERSEY"] = ["Select City", "EDISON"];
cityObject["ILLINOIS"] = ["Select City", "CHICAGO"];
cityObject["MAURITIUS"] = ["Select City", "PORT LOUIS"];
cityObject["DUBAI"] = ["Select City", "DUBAI"];

window.onload = function getInputUsingDropdown() {
    // load country dropdown on window reload

    for (let index = 0; index < countryObject.length; index++) {
        var newCountry = document.createElement("option"); // create option element
        newCountry.value = countryObject[index]; // set value
        newCountry.text = countryObject[index]; // set text
        document.getElementById("country").appendChild(newCountry); // append into country tag as a child
    }
};

function getState(element) {
    var states = document.getElementById("state");

    while (states.options.length > 0) {
        // clear previously selected state option
        states.options.remove(0);
    }

    var text = element.options[element.selectedIndex].text; // fetch selected value from country dropdown
    var stateIndex = countryObject.findIndex((ele) => ele === text); // find country index
    var stateList = stateObject[stateIndex]; // make a state list on basis selected country

    for (let index = 0; index < stateList.length; index++) {
        // same as country
        var newState = document.createElement("option");
        newState.value = stateList[index];
        newState.text = stateList[index];
        document.getElementById("state").appendChild(newState);
    }
}

function getCity(element) {
    var cities = document.getElementById("cityName");

    while (cities.options.length > 0) {
        // clear previously selected city option
        cities.options.remove(0);
    }

    var text = element.options[element.selectedIndex].text; // fetch selected value from state dropdown
    var cityList = cityObject[text]; // make a city list

    for (let index = 0; index < cityList.length; index++) {
        // same as country
        var newCity = document.createElement("option");
        newCity.value = cityList[index];
        newCity.text = cityList[index];
        document.getElementById("cityName").appendChild(newCity);
    }
}

// invoke the getWeatherReport function on pressing Enter

searchInputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value); // call the getWeatherReport func with entered value as parameter
    }
});

function getCityName() {
    selectElement = document.querySelector("#cityName");
    searchInputBox.value = selectElement.value; // put city value of dropdown in searchBox
    getWeatherReport(searchInputBox.value); // call getWeatherReport func
}

function getWeatherReport(city) {
    let url = `${weatherApi.baseUrl}?key=${weatherApi.key}&q=${city}&aqi=${weatherApi.aqi}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            var count = Object.keys(data).length;
            if (count === 2) {
                showWeatherReport(data); // if city name is correct call showWeatherReport function
                document.querySelector(".output").style.display = "block"; // make the output display block visible
            } else {
                alert(`${data.error.message}`);
            }
        });
}

function showWeatherReport(response) {
    console.log(response);

    let city = document.getElementById("city");
    city.innerText = `${response.location.name},${response.location.country}`; // set city value

    let temp = document.getElementById("temp");
    temp.innerHTML = `${response.current.temp_c}&deg;C`; // we use innerHtml to set degree Celcius value

    let weatherDesc = document.getElementById("weather");
    weatherDesc.innerText = `${response.current.condition.text}`; // set weather desc

    let todayDate = new Date();
    let dateDesc = document.getElementById("date");
    dateDesc.innerText = manageDate(todayDate); // set todays date

    console.log(weatherDesc.textContent);

    if (
        weatherDesc.textContent === "Cloudy" ||
        weatherDesc.textContent === "Partly cloudy" ||
        weatherDesc.textContent === "Overcast"
    ) {
        document.body.style.backgroundImage = "url('static/cloud.jpg')";
    } else if (
        weatherDesc.textContent === "Light rain" ||
        weatherDesc.textContent === "Rain" ||
        weatherDesc.textContent === "Patchy rain possible" ||
        weatherDesc.textContent === "Light rain shower"
    ) {
        document.body.style.backgroundImage = "url('static/rain.jpg')";
    } else if (weatherDesc.textContent === "Clear") {
        document.body.style.backgroundImage = "url('static/clear.jpg')";
    } else if (weatherDesc.textContent === "Snow") {
        document.body.style.backgroundImage = "url('static/snow.jpg')";
    } else if (weatherDesc.textContent === "Sunny") {
        document.body.style.backgroundImage = "url('static/sunny.jpg')";
    } else if (weatherDesc.textContent === "Thunderstorm") {
        document.body.style.backgroundImage = "url('static/thunderstorm.jpg')";
    } else if (weatherDesc.textContent === "Mist") {
        document.body.style.backgroundImage = "url('static/mist.jpg')";
    }
}

function manageDate(todayDate) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let year = todayDate.getFullYear();
    let month = months[todayDate.getMonth()]; // todayDate.getMonth() returns integer value starting from 0
    let date = todayDate.getDate();
    let day = days[todayDate.getDay()]; // same as months value

    return `${date} ${month} (${day}) ${year}`;
}

function getDeviceLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError); // position function takes two param success and error as function
    } else {
        alert("Your browser doesn't support geolocation API");
    }
}

function onSuccess(position) {
    console.log(position);
    let url = `${weatherApi.baseUrl}?key=${weatherApi.key}&q=${position.coords.latitude}&q=${position.coords.longitude}&aqi=${weatherApi.aqi}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            showWeatherReport(data); // if city name is correct call showWeatherReport function
            document.querySelector(".output").style.display = "block"; // make the output display block visible
            console.log(data);
        });
}

function onError(error) {
    alert(error.message);
}
