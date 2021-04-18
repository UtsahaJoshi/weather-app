window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let location = document.querySelector('.location-timezone');
    let weatherImage = document.querySelector('.weather-icon');
    let cityNotFound = document.querySelector('.city-not-found');
    const searchClicked = () => {
        let city = document.getElementById("city-search").value
        getWeather(city);
    }
    const getWeather = (city=null, lat=null, long=null) => {
        let api='';
        if (city) {
            api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1522f6d88e19f3e404227fff64a171e`;
        } else {
            api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c1522f6d88e19f3e404227fff64a171e`;
        }
        fetch(api)
        .then(res =>{
            return res.json();
        })
        .then(data =>{
            if (data.cod == "404") {
                cityNotFound.textContent = "* City Not Found";
            } else {
                const temp = data.main.temp;
                const locationName = data.name;
                const weather = data.weather[0].description;
                const weatherIconImage = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                //Set DOM elements from the API
                cityNotFound.textContent = "";
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = weather;
                location.textContent = locationName;
                weatherImage.src = weatherIconImage;
            }
        })

    }
    document.getElementById("search-city-button").addEventListener("click", searchClicked);


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            getWeather(null, lat, long)
        })
    } else {
        h1.textContent = "Could not determine the location";
    }
})