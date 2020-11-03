/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = async (city) => {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    //HINT: Use template literals to create a url with input and an API key
    //CODE GOES HERE
    const apiUrl = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
    let response = await fetch(apiUrl);
    let res = await response.json();
    if (response.ok) {
        return {
            success: true,
            city: res.name,
            weather: res.weather[0].main,
            temp: res.main.temp,
            temp_min: res.main.temp_min,
            temp_max: res.main.temp_max
        }
    };
    return { success: false, error: res.message };


}

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
searchCity = async() => {
    const city = document.getElementById('city-input').value;
    // CODE GOES HERE
    const response = await getWeatherData(city);
    response.success ? showWeatherData(response) : showError(response.error)
}

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
    //CODE GOES HERE
    document.getElementById('city-name').innerText = weatherData.city;
    document.getElementById('weather-type').innerText = weatherData.weather;
    document.getElementById('temp').innerText = weatherData.temp;
    document.getElementById('min-temp').innerText = weatherData.temp_min;
    document.getElementById('max-temp').innerText = weatherData.temp_max;
}

showError = (error) => {
    let el = `<div class='alert alert-danger' role='alert'>${error}</div>`;
    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = el;
}

clearResult = () => {
    if (document.getElementById("result").style.display !== "none"){
        console.log("Here")
        document.getElementById("result").style.display = "none";
    } 
}
